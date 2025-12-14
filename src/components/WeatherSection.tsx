import { motion } from "framer-motion";
import { Cloud, CloudRain, Thermometer, Wind, Droplets, Sun, AlertTriangle, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather: string;
  icon: string;
  city: string;
  country: string;
}

const OPENWEATHER_API_KEY = "799e5b28e2ba918cc248829a2e6ddade";

const WeatherSection = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 34.0522, lon: -118.2437 }); // Default: Los Angeles

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          // Use default location if permission denied
          console.log("Using default location");
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          wind_speed: Math.round(data.wind.speed * 3.6), // Convert to km/h
          weather: data.weather[0].main,
          icon: data.weather[0].icon,
          city: data.name,
          country: data.sys.country,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const getWeatherIcon = () => {
    if (!weather) return <Sun className="w-16 h-16" />;
    
    const iconMap: Record<string, JSX.Element> = {
      Clear: <Sun className="w-16 h-16 text-sun" />,
      Clouds: <Cloud className="w-16 h-16 text-sky" />,
      Rain: <CloudRain className="w-16 h-16 text-water" />,
      Drizzle: <CloudRain className="w-16 h-16 text-water" />,
      Thunderstorm: <CloudRain className="w-16 h-16 text-destructive" />,
    };
    
    return iconMap[weather.weather] || <Cloud className="w-16 h-16 text-sky" />;
  };

  const weatherCards = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: weather ? `${weather.temp}°C` : "--",
      subtext: weather ? `Feels like ${weather.feels_like}°C` : "",
      color: "bg-accent",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: weather ? `${weather.humidity}%` : "--",
      subtext: weather?.humidity && weather.humidity > 70 ? "High moisture" : "Normal levels",
      color: "bg-water",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: weather ? `${weather.wind_speed} km/h` : "--",
      subtext: weather?.wind_speed && weather.wind_speed > 20 ? "Moderate wind" : "Calm conditions",
      color: "bg-sky",
    },
  ];

  const riskIndicators = [
    { label: "Drought Risk", level: "Medium", percent: 45, color: "bg-risk-medium" },
    { label: "Flood Risk", level: "Low", percent: 20, color: "bg-risk-low" },
    { label: "Frost Risk", level: "Low", percent: 15, color: "bg-risk-low" },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cloud className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Real-Time Weather
            </span>
          </div>
          <h2 className="section-title mb-4">Weather & Climate Insights</h2>
          <p className="section-subtitle mx-auto">
            Live weather data and climate risk assessments for your region
          </p>
        </motion.div>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">
              {loading ? "Detecting location..." : `${weather?.city}, ${weather?.country}`}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Weather Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="card-glass h-full flex flex-col items-center justify-center text-center p-8">
              {loading ? (
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-muted rounded-full mb-4" />
                  <div className="h-12 w-24 bg-muted rounded mb-2" />
                  <div className="h-4 w-20 bg-muted rounded" />
                </div>
              ) : (
                <>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {getWeatherIcon()}
                  </motion.div>
                  <div className="text-6xl font-bold text-foreground mt-4">
                    {weather?.temp}°
                  </div>
                  <div className="text-xl text-muted-foreground capitalize">
                    {weather?.weather}
                  </div>
                  <div className="mt-4 px-4 py-2 bg-leaf/10 text-leaf rounded-full text-sm font-medium">
                    Good for planting
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Weather Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Weather Cards Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              {weatherCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="info-card"
                >
                  <div className={`info-card-icon ${card.color}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{card.label}</div>
                    <div className="text-2xl font-bold text-foreground">{card.value}</div>
                    <div className="text-xs text-muted-foreground">{card.subtext}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Risk Indicators */}
            <div className="card-glass p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-foreground">Climate Risk Assessment</h3>
              </div>
              <div className="space-y-4">
                {riskIndicators.map((risk, index) => (
                  <motion.div
                    key={risk.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-foreground">{risk.label}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        risk.level === "Low" ? "bg-risk-low/20 text-leaf" :
                        risk.level === "Medium" ? "bg-risk-medium/20 text-secondary" :
                        "bg-risk-high/20 text-destructive"
                      }`}>
                        {risk.level}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${risk.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                        className={`h-full ${risk.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
