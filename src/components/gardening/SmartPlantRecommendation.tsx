import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Sprout, Clock, Star, Leaf, Home, Trees, Flower } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  mode: "beginner" | "pro";
}

interface PlantRecommendation {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  harvestTime: string;
  waterNeed: "Low" | "Medium" | "High";
  sunlight: string;
  tips: string;
  proTips?: string;
  seasons: string[];
}

const spaceTypes = [
  { id: "balcony", icon: Home, label: "Balcony" },
  { id: "terrace", icon: Trees, label: "Terrace" },
  { id: "backyard", icon: Trees, label: "Backyard" },
  { id: "indoor", icon: Flower, label: "Indoor" },
];

const purposes = [
  { id: "vegetables", label: "🥬 Vegetables" },
  { id: "herbs", label: "🌿 Herbs" },
  { id: "flowers", label: "🌸 Flowers" },
];

const plantDatabase: Record<string, PlantRecommendation[]> = {
  tropical_vegetables: [
    { name: "Tomato", difficulty: "Easy", harvestTime: "60-80 days", waterNeed: "Medium", sunlight: "Full sun", tips: "Start with cherry tomatoes for easy success!", proTips: "Prune suckers for larger fruit. Optimal NPK ratio: 5-10-10", seasons: ["summer", "monsoon"] },
    { name: "Chili Pepper", difficulty: "Easy", harvestTime: "60-90 days", waterNeed: "Medium", sunlight: "Full sun", tips: "Great for containers on balconies", proTips: "Pinch early flowers for bushier plants. Capsaicin levels vary by variety.", seasons: ["summer", "winter"] },
    { name: "Spinach", difficulty: "Easy", harvestTime: "40-50 days", waterNeed: "High", sunlight: "Partial shade", tips: "Perfect for beginners - grows fast!", proTips: "Sow every 2 weeks for continuous harvest. Bolts in heat.", seasons: ["winter", "monsoon"] },
    { name: "Okra (Bhindi)", difficulty: "Easy", harvestTime: "50-65 days", waterNeed: "Medium", sunlight: "Full sun", tips: "Loves hot weather - perfect for Indian summers", proTips: "Harvest young for tender pods. Seeds viable for 2 years.", seasons: ["summer"] },
  ],
  tropical_herbs: [
    { name: "Tulsi (Holy Basil)", difficulty: "Easy", harvestTime: "Ongoing", waterNeed: "Medium", sunlight: "Full sun", tips: "Sacred plant with medicinal benefits", proTips: "Pinch flowers to prolong leaf production.", seasons: ["all"] },
    { name: "Coriander", difficulty: "Easy", harvestTime: "30-40 days", waterNeed: "Medium", sunlight: "Partial shade", tips: "Grows quickly - harvest leaves often", proTips: "Sow seeds every 3 weeks for continuous supply.", seasons: ["winter", "monsoon"] },
    { name: "Mint", difficulty: "Easy", harvestTime: "Ongoing", waterNeed: "High", sunlight: "Partial shade", tips: "Spreads quickly - keep in containers!", proTips: "Root cuttings in water for quick propagation.", seasons: ["all"] },
    { name: "Curry Leaves", difficulty: "Medium", harvestTime: "1-2 years (tree)", waterNeed: "Low", sunlight: "Full sun", tips: "Essential for Indian cooking - grows into a small tree", proTips: "Prune regularly for bushier growth.", seasons: ["all"] },
  ],
  tropical_flowers: [
    { name: "Marigold", difficulty: "Easy", harvestTime: "45-60 days", waterNeed: "Medium", sunlight: "Full sun", tips: "Repels pests - great companion plant!", proTips: "Deadhead regularly for more blooms.", seasons: ["winter", "summer"] },
    { name: "Hibiscus", difficulty: "Easy", harvestTime: "Ongoing", waterNeed: "Medium", sunlight: "Full sun", tips: "Beautiful flowers, good for hair oil", proTips: "Feed with potash for more blooms.", seasons: ["all"] },
    { name: "Jasmine", difficulty: "Medium", harvestTime: "Ongoing", waterNeed: "Medium", sunlight: "Full sun", tips: "Fragrant flowers - perfect for garlands", proTips: "Prune after flowering for dense growth.", seasons: ["all"] },
  ],
  temperate_vegetables: [
    { name: "Lettuce", difficulty: "Easy", harvestTime: "30-45 days", waterNeed: "High", sunlight: "Partial shade", tips: "Perfect for cool weather growing", proTips: "Cut-and-come-again harvesting extends yield.", seasons: ["spring", "fall"] },
    { name: "Carrot", difficulty: "Medium", harvestTime: "70-80 days", waterNeed: "Medium", sunlight: "Full sun", tips: "Grow in deep containers with loose soil", proTips: "Thin seedlings to 3cm apart for proper sizing.", seasons: ["spring", "fall"] },
  ],
};

const SmartPlantRecommendation = ({ mode }: Props) => {
  const { location } = useLocation();
  const [spaceType, setSpaceType] = useState("balcony");
  const [purpose, setPurpose] = useState("vegetables");
  const [recommendations, setRecommendations] = useState<PlantRecommendation[]>([]);
  const [currentSeason, setCurrentSeason] = useState("");

  useEffect(() => {
    // Determine season based on location and month
    const month = new Date().getMonth();
    const isTropical = Math.abs(location.lat) < 23.5;
    
    let season = "";
    if (isTropical) {
      if (month >= 5 && month <= 9) season = "monsoon";
      else if (month >= 10 || month <= 1) season = "winter";
      else season = "summer";
    } else {
      if (month >= 2 && month <= 4) season = "spring";
      else if (month >= 5 && month <= 7) season = "summer";
      else if (month >= 8 && month <= 10) season = "fall";
      else season = "winter";
    }
    setCurrentSeason(season);

    // Get recommendations
    const isTropicalCountry = ["IN", "TH", "VN", "ID", "MY", "PH", "BD", "LK"].includes(location.countryCode);
    const category = isTropicalCountry ? `tropical_${purpose}` : `temperate_${purpose}`;
    const plants = plantDatabase[category] || plantDatabase[`tropical_${purpose}`] || [];
    
    // Filter by current season
    const filtered = plants.filter(p => 
      p.seasons.includes("all") || p.seasons.includes(season)
    );
    setRecommendations(filtered);
  }, [location, purpose]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-risk-low text-leaf";
      case "Medium": return "bg-risk-medium text-secondary";
      case "Hard": return "bg-risk-high text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sprout className="w-6 h-6 text-primary" />
          Smart Plant Recommendations
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location.loading ? "Detecting..." : `${location.city}, ${location.country}`}</span>
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
            {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Season
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Space Type Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Select Your Space</label>
          <div className="grid grid-cols-4 gap-2">
            {spaceTypes.map((space) => (
              <button
                key={space.id}
                onClick={() => setSpaceType(space.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  spaceType === space.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                <space.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{space.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Purpose Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">What do you want to grow?</label>
          <div className="flex gap-2 flex-wrap">
            {purposes.map((p) => (
              <button
                key={p.id}
                onClick={() => setPurpose(p.id)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  purpose === p.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-2 gap-4">
          {recommendations.map((plant, index) => (
            <motion.div
              key={plant.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-muted/30 border border-border/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground">{plant.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(plant.difficulty)}`}>
                  {plant.difficulty}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {plant.harvestTime}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Leaf className="w-3 h-3" />
                  Water: {plant.waterNeed}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-2">
                💡 {plant.tips}
              </p>

              {mode === "pro" && plant.proTips && (
                <p className="text-sm text-primary bg-primary/5 p-2 rounded-lg">
                  🔬 Pro tip: {plant.proTips}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartPlantRecommendation;
