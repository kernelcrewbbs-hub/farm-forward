import { motion } from "framer-motion";
import { Bug, AlertTriangle, ThermometerSun, Droplets, Wind, Shield, Leaf, TrendingUp } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import { useEffect, useState } from "react";
import pestControlImage from "@/assets/pest-control.jpg";

interface PestRisk {
  name: string;
  risk: "low" | "medium" | "high";
  percent: number;
  affectedCrops: string[];
  tip: string;
}

interface WeatherConditions {
  temp: number;
  humidity: number;
  rainfall: number;
}

const OPENWEATHER_API_KEY = "799e5b28e2ba918cc248829a2e6ddade";

const calculatePestRisks = (weather: WeatherConditions): PestRisk[] => {
  const { temp, humidity, rainfall } = weather;
  
  const risks: PestRisk[] = [
    {
      name: "Aphids",
      risk: temp > 15 && temp < 28 && humidity > 60 ? "high" : temp > 10 ? "medium" : "low",
      percent: temp > 15 && temp < 28 && humidity > 60 ? 75 : temp > 10 ? 45 : 20,
      affectedCrops: ["Wheat", "Tomatoes", "Peppers", "Cabbage"],
      tip: "Use neem oil spray early morning or release ladybugs as natural predators.",
    },
    {
      name: "Whiteflies",
      risk: temp > 25 && humidity < 70 ? "high" : temp > 20 ? "medium" : "low",
      percent: temp > 25 && humidity < 70 ? 70 : temp > 20 ? 40 : 15,
      affectedCrops: ["Tomatoes", "Cotton", "Beans", "Squash"],
      tip: "Install yellow sticky traps and maintain good air circulation.",
    },
    {
      name: "Fungal Diseases",
      risk: humidity > 80 && rainfall > 10 ? "high" : humidity > 65 ? "medium" : "low",
      percent: humidity > 80 && rainfall > 10 ? 85 : humidity > 65 ? 50 : 25,
      affectedCrops: ["Rice", "Potatoes", "Grapes", "Tomatoes"],
      tip: "Improve drainage, avoid overhead irrigation, apply copper-based fungicides.",
    },
    {
      name: "Root Rot",
      risk: rainfall > 20 && humidity > 75 ? "high" : rainfall > 10 ? "medium" : "low",
      percent: rainfall > 20 && humidity > 75 ? 80 : rainfall > 10 ? 45 : 20,
      affectedCrops: ["Beans", "Peas", "Carrots", "Onions"],
      tip: "Ensure proper soil drainage and avoid overwatering.",
    },
    {
      name: "Caterpillars",
      risk: temp > 20 && temp < 30 ? "medium" : temp > 15 ? "low" : "low",
      percent: temp > 20 && temp < 30 ? 55 : temp > 15 ? 30 : 15,
      affectedCrops: ["Cabbage", "Broccoli", "Cauliflower", "Lettuce"],
      tip: "Use Bt (Bacillus thuringiensis) spray or hand-pick caterpillars.",
    },
    {
      name: "Spider Mites",
      risk: temp > 27 && humidity < 50 ? "high" : temp > 22 ? "medium" : "low",
      percent: temp > 27 && humidity < 50 ? 72 : temp > 22 ? 42 : 18,
      affectedCrops: ["Cucumbers", "Melons", "Strawberries", "Roses"],
      tip: "Increase humidity around plants and spray with water regularly.",
    },
  ];

  return risks.sort((a, b) => b.percent - a.percent);
};

const PestForecast = () => {
  const { location } = useLocation();
  const [weather, setWeather] = useState<WeatherConditions>({ temp: 25, humidity: 60, rainfall: 5 });
  const [pestRisks, setPestRisks] = useState<PestRisk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        
        const conditions: WeatherConditions = {
          temp: data.main.temp,
          humidity: data.main.humidity,
          rainfall: data.rain?.["1h"] || 0,
        };
        
        setWeather(conditions);
        setPestRisks(calculatePestRisks(conditions));
      } catch (error) {
        console.error("Error fetching weather for pest forecast:", error);
        setPestRisks(calculatePestRisks(weather));
      } finally {
        setLoading(false);
      }
    };

    if (!location.loading) {
      fetchWeather();
    }
  }, [location]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-risk-high text-white";
      case "medium": return "bg-risk-medium text-white";
      default: return "bg-risk-low text-white";
    }
  };

  const getRiskBarColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-risk-high";
      case "medium": return "bg-risk-medium";
      default: return "bg-risk-low";
    }
  };

  const highRiskCount = pestRisks.filter(p => p.risk === "high").length;
  const mediumRiskCount = pestRisks.filter(p => p.risk === "medium").length;

  return (
    <section className="section-padding bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bug className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              AI-Powered Forecasting
            </span>
          </div>
          <h2 className="section-title mb-4">Pest & Disease Forecast</h2>
          <p className="section-subtitle mx-auto">
            Weather-based pest risk predictions for {location.city}, {location.country}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Heatmap Overview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="card-glass overflow-hidden">
              <img
                src={pestControlImage}
                alt="Pest control in agriculture"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Current Risk Summary
                </h3>
                
                {/* Weather Conditions */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <ThermometerSun className="w-4 h-4 text-accent" />
                      <span className="text-sm">Temperature</span>
                    </div>
                    <span className="font-medium">{Math.round(weather.temp)}°C</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-water" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <span className="font-medium">{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-sky" />
                      <span className="text-sm">Recent Rainfall</span>
                    </div>
                    <span className="font-medium">{weather.rainfall} mm</span>
                  </div>
                </div>

                {/* Risk Count */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-risk-high/10 rounded-lg">
                    <div className="text-2xl font-bold text-risk-high">{highRiskCount}</div>
                    <div className="text-xs text-muted-foreground">High Risk</div>
                  </div>
                  <div className="text-center p-3 bg-risk-medium/10 rounded-lg">
                    <div className="text-2xl font-bold text-risk-medium">{mediumRiskCount}</div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                  </div>
                  <div className="text-center p-3 bg-risk-low/10 rounded-lg">
                    <div className="text-2xl font-bold text-leaf">{pestRisks.length - highRiskCount - mediumRiskCount}</div>
                    <div className="text-xs text-muted-foreground">Low</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pest Risk Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="card-glass p-5 animate-pulse">
                    <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-4 bg-muted rounded w-1/2 mb-4" />
                    <div className="h-2 bg-muted rounded w-full" />
                  </div>
                ))
              ) : (
                pestRisks.map((pest, index) => (
                  <motion.div
                    key={pest.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card-glass p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Bug className={`w-5 h-5 ${pest.risk === 'high' ? 'text-destructive' : pest.risk === 'medium' ? 'text-secondary' : 'text-leaf'}`} />
                        <h4 className="font-semibold text-foreground">{pest.name}</h4>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getRiskColor(pest.risk)}`}>
                        {pest.risk.toUpperCase()}
                      </span>
                    </div>

                    {/* Risk Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Risk Level</span>
                        <span>{pest.percent}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pest.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className={`h-full ${getRiskBarColor(pest.risk)} rounded-full`}
                        />
                      </div>
                    </div>

                    {/* Affected Crops */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {pest.affectedCrops.slice(0, 3).map((crop) => (
                        <span key={crop} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                          {crop}
                        </span>
                      ))}
                      {pest.affectedCrops.length > 3 && (
                        <span className="text-xs px-2 py-1 text-muted-foreground">
                          +{pest.affectedCrops.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Tip */}
                    <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg">
                      <Leaf className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">{pest.tip}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-4 bg-muted/50 rounded-xl flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Pest forecasts are based on current weather conditions and historical patterns. 
            Always consult with local agricultural experts for specific treatment recommendations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PestForecast;
