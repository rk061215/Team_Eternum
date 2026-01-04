import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import { TreeDeciduous, Camera, MapPin, Leaf, AlertCircle } from "lucide-react";

const GREEN_THRESHOLD = 0.18; // 18% green pixels → TREE

type Result = {
  isTree: boolean;
  greenRatio: number;
};

const Trees = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  /* GREEN PIXEL LOGIC */
  const analyzeGreen = (file: File): Promise<Result> =>
    new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let greenPixels = 0;
        let total = pixels.length / 4;

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          if (g > r * 1.1 && g > b * 1.1 && g > 80) {
            greenPixels++;
          }
        }

        const ratio = greenPixels / total;
        resolve({
          isTree: ratio >= GREEN_THRESHOLD,
          greenRatio: ratio,
        });
      };

      img.src = URL.createObjectURL(file);
    });

  /* CAMERA + GPS + LOGIC */
  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        const analysis = await analyzeGreen(e.target.files![0]);
        setResult(analysis);
        setLoading(false);
      },
      () => {
        alert("Location permission required");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Tree Detection (Green Analysis)
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  id="camera"
                  className="hidden"
                  onChange={handleCapture}
                />

                <Button
                  variant="eco"
                  disabled={loading}
                  onClick={() => document.getElementById("camera")?.click()}
                >
                  📸 {loading ? "Analyzing Image..." : "Open Camera"}
                </Button>

                <p className="text-sm text-muted-foreground mt-3">
                  Gemini ai& ML dependency
                </p>
              </CardContent>
            </Card>

            {/* MAP */}
            {location && (
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <iframe
                    width="100%"
                    height="300"
                    className="rounded-xl border"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.002}%2C${location.lat - 0.002}%2C${location.lng + 0.002}%2C${location.lat + 0.002}&marker=${location.lat}%2C${location.lng}`}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <StatCard
              title="Tree Detected"
              value={result ? (result.isTree ? "YES 🌳" : "NO ❌") : "-"}
              subtitle={
                result
                  ? `tree probability : ${(result.greenRatio * 100).toFixed(1)}%`
                  : "Waiting"
              }
              icon={TreeDeciduous}
              color={result?.isTree ? "lime" : "primary"}
            />

            <StatCard
              title="Reward"
              value={result?.isTree ? "50 Points" : "0"}
              subtitle="Green dominance logic"
              icon={Leaf}
              color="lime"
            />

            <Card variant="eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-eco-orange" />
                  Detection Logic
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• Pixel-level green dominance</p>
                <p>• Threshold-based decision</p>
                <p>• GPS locked at capture</p>
                <p>• Explainable & fast</p>
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