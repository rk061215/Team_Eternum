import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import {
  TreeDeciduous,
  Camera,
  MapPin,
  AlertCircle,
  RefreshCcw,
  XCircle,
  Loader2
} from "lucide-react";

// 🔴 TERI API KEY (Hardcoded for testing)
const GEMINI_API_KEY = "AIzaSyCkaP1gWwGvMJo3onNoCR98faJMD0YXxKo"; 

const Trees = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [debugMsg, setDebugMsg] = useState<string>(""); // For debugging hidden errors
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  /* ================= GEMINI AI LOGIC (UPDATED & LENIENT) ================= */
  const analyzeImageWithGemini = async (base64Image: string) => {
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // 👇 IMPROVED PROMPT: Handling blurry/window shots
      const prompt = `
        Analyze this image. The user is trying to plant a tree.
        Does the image contain ANY of the following:
        1. A tree, sapling, plant, bush, flower, or leaves?
        2. Greenery or vegetation in the background?
        3. Plants seen through a window or glass?

        INSTRUCTIONS:
        - Be GENEROUS. If there is any trace of nature/plants, say 'YES'.
        - If the image is blurry but looks like outdoors/greenery, say 'YES'.
        - Only say 'NO' if it is clearly an indoor object (like a face, laptop, wall, bed) with ZERO plants.
        
        RESPONSE FORMAT:
        - If found: "YES"
        - If not found: "NO: [What do you see?]"
      `;

      const imagePart = {
        inlineData: {
          data: base64Image.split(",")[1], 
          mimeType: "image/png",
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = result.response;
      const text = response.text().trim();
      
      console.log("🤖 AI Debug Response:", text); // Console check
      setDebugMsg(text); // Store raw text for debug
      return text;
    } catch (error) {
      console.error("AI Error:", error);
      return "ERROR";
    }
  };

  /* ================= CAMERA START ================= */
  const startCamera = async () => {
    setAiResponse(null);
    setDebugMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Rear camera
      });
      setIsCameraOpen(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      }, 100);
    } catch (err) {
      alert("Camera access denied. Please allow permissions.");
    }
  };

  /* ================= CAMERA STOP ================= */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  /* ================= TAKE PHOTO & PROCESS ================= */
  const takePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    
    // Prevent blank capture
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      
      // Update UI immediately
      setImagePreview(dataUrl);
      stopCamera(); 
      
      // Start AI Analysis
      setIsAnalyzing(true);
      const result = await analyzeImageWithGemini(dataUrl);
      setIsAnalyzing(false);

      // Handle Result (Case Insensitive)
      const cleanResult = result.toUpperCase();

      if (cleanResult.includes("YES")) {
        setAiResponse("success");
        getGeolocation();
      } 
      else if (cleanResult.includes("NO:")) {
        const objectName = result.split(":")[1]?.trim() || "Unknown Object";
        setAiResponse(`error:${objectName}`);
        setCoords(null);
      } 
      else {
        // Fallback for unexpected AI replies
        setAiResponse(`error:Unclear Image`); 
        setCoords(null);
      }
    }
  };

  /* ================= GEOLOCATION ================= */
  const getGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords([pos.coords.latitude, pos.coords.longitude]),
      () => alert("Location is required for verification!"),
      { enableHighAccuracy: true }
    );
  };

  const handleRetake = () => {
    setImagePreview(null);
    setCoords(null);
    setAiResponse(null);
    startCamera();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-6">
          
          {/* ================= LEFT SIDE (CAMERA) ================= */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera /> AI Tree Verifier
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
                
                {/* 1. START BUTTON */}
                {!isCameraOpen && !imagePreview && (
                  <Button variant="eco" size="lg" onClick={startCamera} className="h-32 w-full flex flex-col gap-2 text-lg">
                    <Camera size={32} /> Tap to Verify & Plant
                  </Button>
                )}

                {/* 2. LIVE CAMERA */}
                {isCameraOpen && (
                  <div className="relative w-full rounded-xl overflow-hidden bg-black shadow-lg">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-96 object-cover" />
                    
                    {/* Overlay Frame */}
                    <div className="absolute inset-0 border-2 border-white/30 pointer-events-none flex items-center justify-center">
                      <div className="w-64 h-64 border-2 border-dashed border-green-400/70 rounded-lg"></div>
                    </div>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 z-10">
                       <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full shadow-lg" onClick={stopCamera}>
                         <XCircle />
                       </Button>
                       <Button variant="default" size="icon" className="h-20 w-20 rounded-full border-4 border-white bg-green-500 hover:bg-green-600 shadow-xl transition-transform active:scale-95" onClick={takePhoto}>
                         <div className="w-16 h-16 rounded-full border-2 border-white/50" />
                       </Button>
                    </div>
                  </div>
                )}

                {/* 3. PREVIEW & RESULTS */}
                {imagePreview && (
                  <div className="w-full space-y-4">
                    <div className="relative rounded-xl overflow-hidden border">
                      <img src={imagePreview} alt="Captured" className="w-full max-h-96 object-cover" />
                      
                      {/* LOADING OVERLAY */}
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white backdrop-blur-sm z-20">
                          <Loader2 className="animate-spin h-12 w-12 mb-3 text-green-400" />
                          <p className="font-semibold text-lg animate-pulse">Checking for nature...</p>
                        </div>
                      )}
                    </div>

                    {/* SUCCESS BOX */}
                    {!isAnalyzing && aiResponse === "success" && (
                      <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                         <div className="bg-green-100 p-2 rounded-full">
                           <TreeDeciduous className="h-6 w-6 text-green-700" />
                         </div>
                         <div>
                           <p className="font-bold text-lg">Verified Successfully! 🎉</p>
                           <p className="text-sm opacity-90">Nature detected. Location tagged.</p>
                         </div>
                      </div>
                    )}

                    {/* ERROR BOX */}
                    {!isAnalyzing && aiResponse?.startsWith("error") && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-300">
                         <div className="flex items-center gap-3">
                           <div className="bg-red-100 p-2 rounded-full">
                             <XCircle className="h-6 w-6 text-red-600" />
                           </div>
                           <p className="font-bold text-lg">Verification Failed</p>
                         </div>
                         <p className="text-sm pl-11">
                           {aiResponse.includes("Unclear") 
                             ? "The image is too blurry or unclear. Please try to focus on the plant." 
                             : `AI detected: ${aiResponse.split(":")[1] || "Not a tree"}.`}
                         </p>
                      </div>
                    )}

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-4 pt-2">
                      <Button variant="outline" size="lg" className="flex-1" onClick={handleRetake}>
                        <RefreshCcw className="mr-2 h-4 w-4" /> Retake
                      </Button>
                      
                      <Button 
                        variant="eco" 
                        size="lg"
                        className="flex-1 font-semibold" 
                        disabled={aiResponse !== "success" || !coords}
                        onClick={() => alert("Success! Points added to your database.")}
                      >
                        {aiResponse === "success" ? "Claim Points" : "Cannot Claim"}
                      </Button>
                    </div>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </CardContent>
            </Card>
          </div>

          {/* ================= RIGHT SIDE (STATS) ================= */}
          <div className="space-y-6">
            <StatCard 
              title="Current Status" 
              value={aiResponse === "success" ? "Verified" : "Waiting"} 
              subtitle={aiResponse === "success" ? "Ready to submit" : "Capture a photo"}
              icon={TreeDeciduous} 
              color={aiResponse === "success" ? "success" : "primary"} 
            />
            
            <Card variant="eco">
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <AlertCircle size={20}/> Tips for Success
                 </CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-muted-foreground space-y-2">
                 <p>🌿 <span className="font-medium text-foreground">Be Clear:</span> Keep camera steady.</p>
                 <p>☀️ <span className="font-medium text-foreground">Lighting:</span> Ensure good light.</p>
                 <p>📸 <span className="font-medium text-foreground">Window shots:</span> Accepted if plants are visible.</p>
               </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trees;