import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";
import {
  Footprints,
  Play,
  Square,
  MapPin,
  Clock,
  Zap,
  TrendingUp,
  Target,
  Leaf
} from "lucide-react";

const Walk = () => {
  const [isWalking, setIsWalking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [steps, setSteps] = useState(0);
  const [coords, setCoords] = useState<[number, number] | null>(null);

  const watchId = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const lastPoint = useRef<{ lat: number; lng: number; time: number } | null>(null);

  // Haversine (km)
  const haversine = (lat1:number, lon1:number, lat2:number, lon2:number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  };

  const handleStart = () => {
    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }

    setIsWalking(true);

    timerRef.current = window.setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const now = Date.now();

        // ignore poor GPS accuracy
        if (accuracy > 25) return;

        setCoords([latitude, longitude]);

        if (lastPoint.current) {
          const prev = lastPoint.current;
          const dist = haversine(prev.lat, prev.lng, latitude, longitude);
          const timeDiff = (now - prev.time) / 3600000; // hours
          const speed = dist / timeDiff;

          // ✅ VALID WALK CHECK
          if (
            dist >= 0.005 &&        // at least 5 meters
            speed >= 1 &&           // min human movement
            speed <= 7              // max walking speed
          ) {
            setDistance(d => d + dist);
            setSteps(s => s + Math.floor(dist * 1300));
          }
        }

        lastPoint.current = {
          lat: latitude,
          lng: longitude,
          time: now
        };
      },
      console.error,
      { enableHighAccuracy: true }
    );
  };

  const handleStop = () => {
    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    if (timerRef.current) clearInterval(timerRef.current);

    setIsWalking(false);
    lastPoint.current = null;
  };

  const speed = time > 0 ? (distance / (time / 3600)).toFixed(1) : "0.0";
  const points = Math.floor(distance * 10);

  const mapUrl = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${
        coords[1] - 0.002
      }%2C${coords[0] - 0.002}%2C${coords[1] + 0.002}%2C${
        coords[0] + 0.002
      }&marker=${coords[0]}%2C${coords[1]}`
    : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-5xl font-bold">{distance.toFixed(2)} km</p>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div><Clock /> {time}s</div>
                  <div><Zap /> {speed} km/h</div>
                  <div><Leaf /> +{points}</div>
                </div>

                {!isWalking ? (
                  <Button onClick={handleStart} className="mt-6">
                    <Play className="mr-2" /> Start Walk
                  </Button>
                ) : (
                  <Button onClick={handleStop} className="mt-6">
                    <Square className="mr-2" /> Stop
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle><MapPin /> Live Location</CardTitle>
              </CardHeader>
              <CardContent>
                {coords ? (
                  <iframe src={mapUrl} className="w-full h-64 rounded-xl" />
                ) : (
                  <p className="text-center opacity-60">Start walking to view map</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <StatCard title="Steps" value={steps.toString()} icon={Footprints} />
            <StatCard title="Speed" value={`${speed} km/h`} icon={TrendingUp} />
            <StatCard title="Weekly Goal" value="62%" icon={Target} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Walk;

