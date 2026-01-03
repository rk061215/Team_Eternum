import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import {
  TreeDeciduous,
  Camera,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Globe,
  Leaf,
} from "lucide-react";

type TreeData = {
  photo: string;
  lat: number;
  lng: number;
  date: number;
  status: "pending" | "verified";
  points: number;
};

const Trees = () => {
  const [tree, setTree] = useState<TreeData | null>(null);
  const [loading, setLoading] = useState(false);

  /* Load saved tree from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("ecoTree");
    if (saved) setTree(JSON.parse(saved));
  }, []);

  /* Simulated 30-day verification */
  useEffect(() => {
    if (!tree) return;

    const daysPassed =
      (Date.now() - tree.date) / (1000 * 60 * 60 * 24);

    if (daysPassed >= 30 && tree.status === "pending") {
      const verified = { ...tree, status: "verified", points: 100 };
      localStorage.setItem("ecoTree", JSON.stringify(verified));
      setTree(verified);
    }
  }, [tree]);

  /* Camera + GPS */
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newTree: TreeData = {
          photo: URL.createObjectURL(e.target.files![0]),
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          date: Date.now(),
          status: "pending",
          points: 50,
        };

        setTimeout(() => {
          localStorage.setItem("ecoTree", JSON.stringify(newTree));
          setTree(newTree);
          setLoading(false);
          alert("🌱 AI detected a tree. Verification pending.");
        }, 1200);
      },
      () => {
        alert("Please allow location access");
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
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Tree */}
            <Card variant="eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Upload New Tree
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  id="cameraInput"
                  className="hidden"
                  onChange={handlePhoto}
                />

                <Button
                  variant="eco"
                  disabled={loading}
                  onClick={() =>
                    document.getElementById("cameraInput")?.click()
                  }
                >
                  📸 {loading ? "Detecting Tree..." : "Open Camera"}
                </Button>

                <p className="text-sm text-muted-foreground mt-3">
                  Camera only • GPS locked • AI detection simulated
                </p>
              </CardContent>
            </Card>

            {/* Map */}
            {tree && (
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Tree Location (OpenStreetMap)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <iframe
                    title="tree-map"
                    width="100%"
                    height="300"
                    className="rounded-xl border"
                    loading="lazy"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${tree.lng - 0.002}%2C${tree.lat - 0.002}%2C${tree.lng + 0.002}%2C${tree.lat + 0.002}&layer=mapnik&marker=${tree.lat}%2C${tree.lng}`}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">
            <StatCard
              title="Trees Planted"
              value={tree ? "1" : "0"}
              subtitle={tree?.status === "verified" ? "Verified" : "Pending"}
              icon={TreeDeciduous}
              color="primary"
            />

            <StatCard
              title="Points Earned"
              value={tree ? tree.points.toString() : "0"}
              subtitle="From tree plantation"
              icon={Leaf}
              color="lime"
            />

            <StatCard
              title="CO₂ Offset"
              value={tree ? "48 kg" : "0 kg"}
              subtitle="Estimated yearly"
              icon={Globe}
              color="sky"
            />

            <Card variant="eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-eco-orange" />
                  Verification Logic
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>📸 Camera-only uploads</p>
                <p>📍 GPS captured at upload</p>
                <p>🤖 AI tree detection (MVP)</p>
                <p>⏱ Auto-verify after 30 days</p>
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
