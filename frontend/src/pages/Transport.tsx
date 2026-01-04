import { useState } from "react";
import QRCode from "qrcode";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatCard from "@/components/stats/StatCard";

import {
  Bus,
  MapPin,
  Navigation,
  QrCode,
  Ticket,
  ArrowRight,
  Leaf,
} from "lucide-react";

/* ---------------- TYPES ---------------- */
type Place = {
  display_name: string;
  lat: string;
  lon: string;
};

export default function Transport() {
  const [boarding, setBoarding] = useState("");
  const [destination, setDestination] = useState("");

  const [fromPlace, setFromPlace] = useState<Place | null>(null);
  const [toPlace, setToPlace] = useState<Place | null>(null);

  const [fromOptions, setFromOptions] = useState<Place[]>([]);
  const [toOptions, setToOptions] = useState<Place[]>([]);

  const [ticketData, setTicketData] = useState<any>(null);
  const [qrImage, setQrImage] = useState("");

  /* ---------------- SEARCH ---------------- */
  const searchLocation = async (q: string, setter: any) => {
    if (q.length < 3) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${q}`
    );
    const data = await res.json();
    setter(data.slice(0, 5));
  };

  /* ---------------- GENERATE TICKET ---------------- */
  const handleGenerateTicket = async () => {
    if (!fromPlace || !toPlace) return;

    const url = `https://router.project-osrm.org/route/v1/driving/${fromPlace.lon},${fromPlace.lat};${toPlace.lon},${toPlace.lat}?overview=false`;
    const res = await fetch(url);
    const data = await res.json();

    const distanceKm = data.routes[0].distance / 1000;
    const fare = Math.round(distanceKm * 6); // ₹6/km
    const points = Math.round(distanceKm * 5);

    const payload = {
      from: boarding,
      to: destination,
      distance: distanceKm.toFixed(2) + " km",
      fare: "₹" + fare,
      ecoPoints: points,
      time: new Date().toLocaleString(),
    };

    const qr = await QRCode.toDataURL(JSON.stringify(payload));

    setTicketData({
      boarding,
      destination,
      distance: distanceKm.toFixed(2),
      fare,
      points,
    });
    setQrImage(qr);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-6">

          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            {!ticketData ? (
              <Card variant="eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-eco-sky" />
                    Generate Transport Ticket
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* FROM */}
                  <div className="space-y-2">
                    <Label>Boarding Point</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        value={boarding}
                        onChange={(e) => {
                          setBoarding(e.target.value);
                          searchLocation(e.target.value, setFromOptions);
                        }}
                        placeholder="Enter boarding location"
                      />
                    </div>
                    {fromOptions.map((p) => (
                      <div
                        key={p.display_name}
                        onClick={() => {
                          setBoarding(p.display_name);
                          setFromPlace(p);
                          setFromOptions([]);
                        }}
                        className="p-2 text-sm cursor-pointer hover:bg-muted rounded"
                      >
                        {p.display_name}
                      </div>
                    ))}
                  </div>

                  <ArrowRight className="mx-auto text-muted-foreground" />

                  {/* TO */}
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        value={destination}
                        onChange={(e) => {
                          setDestination(e.target.value);
                          searchLocation(e.target.value, setToOptions);
                        }}
                        placeholder="Enter destination"
                      />
                    </div>
                    {toOptions.map((p) => (
                      <div
                        key={p.display_name}
                        onClick={() => {
                          setDestination(p.display_name);
                          setToPlace(p);
                          setToOptions([]);
                        }}
                        className="p-2 text-sm cursor-pointer hover:bg-muted rounded"
                      >
                        {p.display_name}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="eco"
                    size="lg"
                    className="w-full"
                    onClick={handleGenerateTicket}
                    disabled={!fromPlace || !toPlace}
                  >
                    <QrCode className="w-5 h-5 mr-2" />
                    Generate QR Ticket
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card variant="eco">
                <CardHeader>
                  <CardTitle>🎫 Ticket Generated</CardTitle>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                  <img src={qrImage} className="mx-auto w-48" />

                  <p><b>From:</b> {ticketData.boarding}</p>
                  <p><b>To:</b> {ticketData.destination}</p>
                  <p><b>Distance:</b> {ticketData.distance} km</p>
                  <p><b>Fare:</b> ₹{ticketData.fare}</p>

                  <p className="text-eco-lime font-semibold flex justify-center gap-2">
                    <Leaf /> +{ticketData.points} Eco Points
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setTicketData(null);
                      setQrImage("");
                      setBoarding("");
                      setDestination("");
                    }}
                  >
                    Generate New Ticket
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          

          {/* SIDEBAR */}
          <div className="space-y-6">
            <StatCard
              title="Eco Reward Rate"
              value="5 pts / km"
              subtitle="Public transport"
              icon={Leaf}
              color="lime"
            />
            <StatCard
              title="Fare Rate"
              value="₹6 / km"
              subtitle="Eco pricing"
              icon={Bus}
              color="sky"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}