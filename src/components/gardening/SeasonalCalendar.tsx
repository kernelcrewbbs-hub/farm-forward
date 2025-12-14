import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Sun, CloudRain, Snowflake, MapPin } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  mode: "beginner" | "pro";
}

interface SeasonalPlant {
  name: string;
  emoji: string;
  tips: string;
  proTips?: string;
}

const tropicalSeasons = {
  summer: {
    icon: Sun,
    color: "text-sun",
    bgColor: "bg-sun/10",
    months: "March - June",
    plants: [
      { name: "Okra", emoji: "🥒", tips: "Start seeds indoors", proTips: "Pre-soak seeds for faster germination" },
      { name: "Tomato", emoji: "🍅", tips: "Morning watering essential", proTips: "Mulch heavily to retain moisture" },
      { name: "Chili", emoji: "🌶️", tips: "Loves the heat!", proTips: "Pinch first flowers for stronger plant" },
      { name: "Brinjal", emoji: "🍆", tips: "Full sun location", proTips: "Support plants as fruits develop" },
      { name: "Cucumber", emoji: "🥒", tips: "Needs trellis support", proTips: "Harvest frequently for more yield" },
    ],
  },
  monsoon: {
    icon: CloudRain,
    color: "text-water",
    bgColor: "bg-water/10",
    months: "July - September",
    plants: [
      { name: "Turmeric", emoji: "🫚", tips: "Plant rhizomes now", proTips: "Excellent drainage required" },
      { name: "Ginger", emoji: "🫚", tips: "Partial shade works best", proTips: "Mulch to prevent waterlogging" },
      { name: "Spinach", emoji: "🥬", tips: "Quick harvest crop", proTips: "Sow every 2 weeks" },
      { name: "Coriander", emoji: "🌿", tips: "Cool weather crop", proTips: "Bolts in heat, provide shade" },
      { name: "Mint", emoji: "🌱", tips: "Thrives in moisture", proTips: "Grow in containers to control spread" },
    ],
  },
  winter: {
    icon: Snowflake,
    color: "text-sky",
    bgColor: "bg-sky/10",
    months: "October - February",
    plants: [
      { name: "Peas", emoji: "🫛", tips: "Best time to sow!", proTips: "Inoculate seeds with nitrogen fixers" },
      { name: "Carrot", emoji: "🥕", tips: "Loose soil essential", proTips: "Thin seedlings to 3cm apart" },
      { name: "Cauliflower", emoji: "🥦", tips: "Cool weather favorite", proTips: "Tie leaves to blanch heads" },
      { name: "Onion", emoji: "🧅", tips: "Plant sets or seeds", proTips: "Day length affects bulbing" },
      { name: "Garlic", emoji: "🧄", tips: "Plant cloves pointed up", proTips: "Green garlic in 45 days" },
    ],
  },
};

const temperateSeasons = {
  spring: {
    icon: Sun,
    color: "text-leaf",
    bgColor: "bg-leaf/10",
    months: "March - May",
    plants: [
      { name: "Lettuce", emoji: "🥗", tips: "Direct sow outdoors", proTips: "Succession plant every 2 weeks" },
      { name: "Peas", emoji: "🫛", tips: "Early spring sowing", proTips: "Provide climbing support" },
      { name: "Radish", emoji: "🥕", tips: "Fast 30-day harvest", proTips: "Best salad addition" },
    ],
  },
  summer: {
    icon: Sun,
    color: "text-sun",
    bgColor: "bg-sun/10",
    months: "June - August",
    plants: [
      { name: "Tomato", emoji: "🍅", tips: "Transplant after frost", proTips: "Prune suckers for larger fruit" },
      { name: "Peppers", emoji: "🫑", tips: "Warm soil required", proTips: "Harvest green or wait for color" },
      { name: "Zucchini", emoji: "🥒", tips: "Prolific producer", proTips: "Harvest small for best flavor" },
    ],
  },
  fall: {
    icon: CloudRain,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    months: "September - November",
    plants: [
      { name: "Kale", emoji: "🥬", tips: "Frost improves flavor", proTips: "Cut-and-come-again harvest" },
      { name: "Broccoli", emoji: "🥦", tips: "Cool weather crop", proTips: "Harvest before flowers open" },
      { name: "Garlic", emoji: "🧄", tips: "Plant for next year", proTips: "Mulch before winter" },
    ],
  },
  winter: {
    icon: Snowflake,
    color: "text-sky",
    bgColor: "bg-sky/10",
    months: "December - February",
    plants: [
      { name: "Microgreens", emoji: "🌱", tips: "Indoor growing", proTips: "7-14 day harvest cycle" },
      { name: "Sprouts", emoji: "🌿", tips: "Jar method works", proTips: "Rinse twice daily" },
      { name: "Herbs", emoji: "🪴", tips: "Windowsill garden", proTips: "Grow lights help" },
    ],
  },
};

const SeasonalCalendar = ({ mode }: Props) => {
  const { location } = useLocation();
  const [currentSeason, setCurrentSeason] = useState("");
  const [seasons, setSeasons] = useState<typeof tropicalSeasons | typeof temperateSeasons>(tropicalSeasons);

  useEffect(() => {
    const isTropical = ["IN", "TH", "VN", "ID", "MY", "PH", "BD", "LK"].includes(location.countryCode);
    const month = new Date().getMonth();

    if (isTropical) {
      setSeasons(tropicalSeasons);
      if (month >= 2 && month <= 5) setCurrentSeason("summer");
      else if (month >= 6 && month <= 8) setCurrentSeason("monsoon");
      else setCurrentSeason("winter");
    } else {
      setSeasons(temperateSeasons);
      if (month >= 2 && month <= 4) setCurrentSeason("spring");
      else if (month >= 5 && month <= 7) setCurrentSeason("summer");
      else if (month >= 8 && month <= 10) setCurrentSeason("fall");
      else setCurrentSeason("winter");
    }
  }, [location]);

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Seasonal Plant Calendar
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location.loading ? "Detecting..." : `${location.city}, ${location.country}`}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Season Tabs */}
        <div className="flex gap-2 flex-wrap">
          {Object.entries(seasons).map(([key, season]) => {
            const SeasonIcon = season.icon;
            return (
              <button
                key={key}
                onClick={() => setCurrentSeason(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  currentSeason === key
                    ? `${season.bgColor} border-current ${season.color}`
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                <SeasonIcon className="w-4 h-4" />
                <span className="capitalize">{key}</span>
              </button>
            );
          })}
        </div>

        {/* Current Season Content */}
        {Object.entries(seasons).map(([key, season]) => {
          if (key !== currentSeason) return null;
          const SeasonIcon = season.icon;
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className={`p-4 rounded-xl ${season.bgColor} border border-current/20`}>
                <div className="flex items-center gap-3">
                  <SeasonIcon className={`w-8 h-8 ${season.color}`} />
                  <div>
                    <h3 className={`font-semibold capitalize ${season.color}`}>{key} Season</h3>
                    <p className="text-sm text-muted-foreground">{season.months}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {season.plants.map((plant, index) => (
                  <motion.div
                    key={plant.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-card border border-border/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{plant.emoji}</span>
                      <h4 className="font-medium text-foreground">{plant.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">💡 {plant.tips}</p>
                    {mode === "pro" && plant.proTips && (
                      <p className="text-sm text-primary mt-2 p-2 bg-primary/5 rounded-lg">
                        🔬 {plant.proTips}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SeasonalCalendar;
