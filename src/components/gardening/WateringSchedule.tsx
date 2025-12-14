import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, Cloud, Sun, CloudRain, AlertTriangle, Calendar } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  mode: "beginner" | "pro";
}

interface WeatherForecast {
  date: string;
  temp: number;
  humidity: number;
  precipitation: number;
  description: string;
}

const OPENWEATHER_API_KEY = "799e5b28e2ba918cc248829a2e6ddade";

const WateringSchedule = ({ mode }: Props) => {
  const { location } = useLocation();
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState("tomato");

  const plants = [
    { id: "tomato", name: "Tomato", waterNeed: "medium", frequency: "daily" },
    { id: "tulsi", name: "Tulsi", waterNeed: "medium", frequency: "daily" },
    { id: "mint", name: "Mint", waterNeed: "high", frequency: "daily" },
    { id: "cactus", name: "Cactus", waterNeed: "low", frequency: "weekly" },
    { id: "spinach", name: "Spinach", waterNeed: "high", frequency: "daily" },
    { id: "curry", name: "Curry Leaves", waterNeed: "low", frequency: "alternate" },
  ];

  useEffect(() => {
    const fetchForecast = async () => {
      if (location.loading) return;
      
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${OPENWEATHER_API_KEY}&units=metric&cnt=16`
        );
        const data = await response.json();
        
        // Process forecast - get one per day
        const dailyForecast: WeatherForecast[] = [];
        const seenDates = new Set();
        
        data.list.forEach((item: any) => {
          const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
          if (!seenDates.has(date) && dailyForecast.length < 5) {
            seenDates.add(date);
            dailyForecast.push({
              date,
              temp: Math.round(item.main.temp),
              humidity: item.main.humidity,
              precipitation: (item.pop || 0) * 100,
              description: item.weather[0].main,
            });
          }
        });
        
        setForecast(dailyForecast);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [location]);

  const getWateringRecommendation = (day: WeatherForecast) => {
    const plant = plants.find(p => p.id === selectedPlant);
    if (!plant) return { action: "water", amount: "Medium" };

    // Rain expected - skip watering
    if (day.precipitation > 60) {
      return { action: "skip", amount: "None", reason: "🌧️ Rain expected - skip watering!" };
    }

    // High temperature - increase watering
    if (day.temp > 35) {
      return { action: "water", amount: "High", reason: "🌡️ Hot day - water early morning" };
    }

    // Low humidity - increase watering
    if (day.humidity < 40) {
      return { action: "water", amount: "High", reason: "💨 Low humidity - plants need more water" };
    }

    // Normal conditions
    return { action: "water", amount: plant.waterNeed === "high" ? "High" : plant.waterNeed === "low" ? "Low" : "Medium", reason: "✅ Normal conditions" };
  };

  const getAmountColor = (amount: string) => {
    switch (amount) {
      case "High": return "text-water bg-water/10";
      case "Medium": return "text-primary bg-primary/10";
      case "Low": return "text-leaf bg-leaf/10";
      case "None": return "text-muted-foreground bg-muted";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="w-6 h-6 text-water" />
          Smart Watering Schedule
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Weather-based watering recommendations for {location.city}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plant Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Select Plant</label>
          <div className="flex gap-2 flex-wrap">
            {plants.map((plant) => (
              <button
                key={plant.id}
                onClick={() => setSelectedPlant(plant.id)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedPlant === plant.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                {plant.name}
              </button>
            ))}
          </div>
        </div>

        {/* Forecast Grid */}
        {loading ? (
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse p-4 rounded-xl bg-muted/50 h-40" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => {
              const rec = getWateringRecommendation(day);
              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border/30 text-center"
                >
                  <div className="text-sm font-medium text-foreground mb-2">{day.date}</div>
                  
                  {/* Weather Icon */}
                  <div className="flex justify-center mb-2">
                    {day.precipitation > 50 ? (
                      <CloudRain className="w-8 h-8 text-water" />
                    ) : day.temp > 30 ? (
                      <Sun className="w-8 h-8 text-sun" />
                    ) : (
                      <Cloud className="w-8 h-8 text-sky" />
                    )}
                  </div>

                  <div className="text-lg font-bold text-foreground">{day.temp}°C</div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {day.humidity}% humidity
                  </div>

                  {/* Watering Recommendation */}
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAmountColor(rec.amount)}`}>
                    {rec.action === "skip" ? "Skip" : rec.amount}
                  </div>

                  {mode === "pro" && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {day.precipitation}% rain chance
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Quick Tips */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">Watering Tips</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Water early morning (6-8 AM) or evening (5-7 PM)</li>
            <li>• Check soil moisture before watering - insert finger 1 inch deep</li>
            <li>• Overwatering causes root rot - most common beginner mistake!</li>
            {mode === "pro" && (
              <>
                <li>• Use self-watering containers for consistent moisture</li>
                <li>• Mulch surface to reduce evaporation by 50%</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WateringSchedule;
