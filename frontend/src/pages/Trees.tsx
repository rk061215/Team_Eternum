import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import { toast } from "@/components/ui/use-toast";
import { 
  TreeDeciduous, Camera, MapPin, Clock, CheckCircle2,
  AlertCircle, Globe, Leaf, Loader2
} from "lucide-react";

// Firebase imports
import { db, storage } from "../firebase"; // Path check kar lena
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

interface Tree {
  id: string; // Firebase ID string hoti hai
  location: string;
  date: any;
  status: "permanent" | "pending";
  points: number;
  daysLeft?: number;
  image: string;
  lat: number;
  lng: number;
}

const Trees = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [loading, setLoading] = useState(false);
  const [myTrees, setMyTrees] = useState<Tree[]>([]); // Real data yahan aayega
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Firebase se Real-time Data fetch karo
  useEffect(() => {
    const q = query(collection(db, "trees"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const treesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Tree[];
      setMyTrees(treesData);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Map Helper
  const getMapPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { left: `${x}%`, top: `${y}%` };
  };

  // Stats Calculation
  const totalTrees = myTrees.length;
  const totalPoints = myTrees.reduce((acc, tree) => acc + (tree.points || 0), 0);
  const verifiedTrees = myTrees.filter(t => t.status === "permanent").length;

  const startCamera = async () => {
    setShowCamera(true);
    setImgSrc(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      toast({ title: "Error", description: "Camera access denied", variant: "destructive" });
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const image = canvasRef.current.toDataURL('image/jpeg');
        setImgSrc(image);
        stopCamera(); // Photo lene ke baad camera band
        getLocation(); // Location fetch shuru
      }
    }
  };

  const getLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });
          setLocationName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLocationName("Unknown Location");
          setCoords({ lat: 0, lng: 0 });
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  };

  // 2. Firebase pe Upload karo
  const handleUpload = async () => {
    if (!imgSrc || !coords) return;
    setLoading(true);

    try {
      // A. Photo Upload (Storage)
      const storageRef = ref(storage, `trees/${Date.now()}.jpg`);
      await uploadString(storageRef, imgSrc, 'data_url');
      const imageUrl = await getDownloadURL(storageRef);

      // B. Data Save (Firestore)
      await addDoc(collection(db, "trees"), {
        userId: "demoUser123", // Baad mein auth.currentUser.uid use karna
        location: locationName,
        lat: coords.lat,
        lng: coords.lng,
        image: imageUrl,
        status: "pending",
        points: 50,
        daysLeft: 30,
        createdAt: serverTimestamp(),
        date: new Date().toISOString()
      });

      toast({ title: "Success! 🌱", description: "Tree planted and visible on global map!" });
      
      // Reset State
      setImgSrc(null);
      setCoords(null);
      setLocationName(null);
      setShowCamera(false);

    } catch (error) {
      console.error("Error adding tree: ", error);
      toast({ title: "Failed", description: "Could not upload tree.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TreeDeciduous className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Tree Plantation</h1>
            </div>
            <p className="text-muted-foreground">Plant trees, earn points, save the planet.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Camera Card */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Plant a Tree
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {showCamera ? (
                    <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex flex-col items-center justify-center">
                       <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                       <div className="absolute bottom-4 flex gap-4">
                          <Button variant="destructive" onClick={stopCamera}>Cancel</Button>
                          <Button variant="eco" onClick={capturePhoto}>Capture</Button>
                       </div>
                    </div>
                  ) : (
                    !imgSrc ? (
                      <div 
                        className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/60 transition-colors cursor-pointer"
                        onClick={startCamera}
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-semibold">Take a Photo</h3>
                        <p className="text-sm text-muted-foreground mb-4">Must be taken live at location</p>
                        <Button variant="eco">Open Camera</Button>
                      </div>
                    ) : (
                      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
                        <img src={imgSrc} alt="Captured" className="w-full h-full object-contain" />
                        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                           {loading ? <span className="flex gap-2"><Loader2 className="animate-spin w-4 h-4"/> Fetching Location...</span> : <span className="flex gap-2"><MapPin className="w-4 h-4"/> {locationName}</span>}
                        </div>
                        <div className="absolute bottom-4 right-4 flex gap-2">
                           <Button variant="outline" onClick={() => setImgSrc(null)}>Retake</Button>
                           <Button variant="eco" onClick={handleUpload} disabled={loading || !coords}>
                             {loading ? "Uploading..." : "Confirm Upload"}
                           </Button>
                        </div>
                      </div>
                    )
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </CardContent>
              </Card>

              {/* List of Trees */}
              <Card variant="eco">
                <CardHeader><CardTitle>Global Plantations</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {myTrees.length === 0 ? <p className="text-center text-muted-foreground">No trees planted yet. Be the first!</p> : 
                      myTrees.map((tree) => (
                      <div key={tree.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                        <img src={tree.image} alt="Tree" className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                        <div className="flex-1">
                          <p className="font-medium truncate">{tree.location}</p>
                          <p className="text-xs text-muted-foreground">{new Date(tree.date).toLocaleDateString()}</p>
                        </div>
                        {tree.status === 'permanent' ? 
                          <CheckCircle2 className="text-eco-lime w-5 h-5" /> : 
                          <Clock className="text-eco-orange w-5 h-5" />
                        }
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* World Map */}
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Live Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[2/1] rounded-xl bg-slate-900 relative overflow-hidden border border-white/10 shadow-inner">
                    {/* World Map Background Image */}
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-20"></div>
                    
                    {/* Dots on Map */}
                    {myTrees.map((tree) => {
                      const pos = getMapPosition(tree.lat, tree.lng);
                      return (
                        <div
                          key={tree.id}
                          className="absolute w-3 h-3 rounded-full bg-eco-lime shadow-[0_0_8px_#4ade80] hover:scale-150 transition-transform cursor-pointer z-10"
                          style={{ left: pos.left, top: pos.top }}
                          title={`Tree at ${tree.location}`}
                        />
                      );
                    })}
                    
                    <div className="absolute bottom-4 left-4 text-white/50 text-xs">
                      Live Updates: {totalTrees} trees
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <StatCard title="Total Trees" value={totalTrees.toString()} subtitle="Global impact" icon={TreeDeciduous} color="primary" />
              <StatCard title="Total Points" value={totalPoints.toString()} subtitle="Community earned" icon={Leaf} color="lime" />
              <StatCard title="CO₂ Offset" value={`${(totalTrees * 20).toFixed(0)} kg`} subtitle="Estimated reduction" icon={Globe} color="sky" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trees;
