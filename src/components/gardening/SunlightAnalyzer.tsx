import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Compass, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface Props {
  mode: "beginner" | "pro";
}

const directions = [
  { id: "north", label: "North", icon: "⬆️", sunHours: 2, description: "Low light - best for shade plants" },
  { id: "south", label: "South", icon: "⬇️", sunHours: 6, description: "Full sun - ideal for most vegetables" },
  { id: "east", label: "East", icon: "➡️", sunHours: 4, description: "Morning sun - good for herbs" },
  { id: "west", label: "West", icon: "⬅️", sunHours: 4, description: "Afternoon sun - can be intense" },
];

const plantsByLight = {
  fullSun: [
    { name: "Tomato", emoji: "🍅", hours: "6-8 hours" },
    { name: "Chili", emoji: "🌶️", hours: "6-8 hours" },
    { name: "Okra", emoji: "🥒", hours: "6+ hours" },
    { name: "Marigold", emoji: "🏵️", hours: "6+ hours" },
    { name: "Curry Leaves", emoji: "🌿", hours: "6+ hours" },
  ],
  partialShade: [
    { name: "Mint", emoji: "🌱", hours: "4-6 hours" },
    { name: "Coriander", emoji: "🌿", hours: "4-6 hours" },
    { name: "Spinach", emoji: "🥬", hours: "3-4 hours" },
    { name: "Lettuce", emoji: "🥗", hours: "3-4 hours" },
    { name: "Ginger", emoji: "🫚", hours: "4-5 hours" },
  ],
  lowLight: [
    { name: "Money Plant", emoji: "🪴", hours: "2-3 hours" },
    { name: "Snake Plant", emoji: "🌵", hours: "2-4 hours" },
    { name: "Pothos", emoji: "🌿", hours: "2-3 hours" },
    { name: "Peace Lily", emoji: "🌸", hours: "2-4 hours" },
    { name: "Fern", emoji: "🌿", hours: "1-2 hours" },
  ],
};

const SunlightAnalyzer = ({ mode }: Props) => {
  const [selectedDirection, setSelectedDirection] = useState(directions[1]);
  const [sunHours, setSunHours] = useState([6]);
  const [hasObstructions, setHasObstructions] = useState(false);

  const getEffectiveSunHours = () => {
    let hours = selectedDirection.sunHours;
    if (hasObstructions) hours -= 2;
    return Math.max(hours, 1);
  };

  const getRecommendedPlants = () => {
    const hours = mode === "pro" ? sunHours[0] : getEffectiveSunHours();
    if (hours >= 6) return { category: "Full Sun Plants", plants: plantsByLight.fullSun };
    if (hours >= 4) return { category: "Partial Shade Plants", plants: plantsByLight.partialShade };
    return { category: "Low Light Plants", plants: plantsByLight.lowLight };
  };

  const { category, plants } = getRecommendedPlants();

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="w-6 h-6 text-sun" />
          Sunlight Analyzer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Find the right plants based on your space's sunlight conditions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Direction Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            <Compass className="w-4 h-4 inline mr-1" />
            Which direction does your garden/balcony face?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {directions.map((dir) => (
              <motion.button
                key={dir.id}
                onClick={() => setSelectedDirection(dir)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border transition-all text-center ${
                  selectedDirection.id === dir.id
                    ? "border-sun bg-sun/10"
                    : "border-border/50 hover:border-sun/50"
                }`}
              >
                <div className="text-2xl mb-1">{dir.icon}</div>
                <div className="font-medium text-foreground">{dir.label}</div>
                <div className="text-xs text-muted-foreground">{dir.sunHours}+ hrs sun</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Obstructions Toggle */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasObstructions}
              onChange={(e) => setHasObstructions(e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm text-foreground">
              There are buildings/trees blocking sunlight
            </span>
          </label>
        </div>

        {/* Pro Mode: Manual Hours Slider */}
        {mode === "pro" && (
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Estimated daily sunlight hours: {sunHours[0]}
            </label>
            <Slider
              value={sunHours}
              onValueChange={setSunHours}
              min={1}
              max={10}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1 hr (Low)</span>
              <span>10 hrs (Full sun)</span>
            </div>
          </div>
        )}

        {/* Sunlight Meter */}
        <div className="p-4 rounded-xl bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Sunlight Level</span>
            <span className="text-sm text-sun font-medium">
              {mode === "pro" ? sunHours[0] : getEffectiveSunHours()} hours/day
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((mode === "pro" ? sunHours[0] : getEffectiveSunHours()) / 10) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-sun/60 to-sun rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1"><Moon className="w-3 h-3" /> Low</span>
            <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> Full Sun</span>
          </div>
        </div>

        {/* Plant Recommendations */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-leaf" />
            {category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {plants.map((plant, index) => (
              <motion.div
                key={plant.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-xl bg-card border border-border/30 text-center hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-1">{plant.emoji}</div>
                <div className="text-sm font-medium text-foreground">{plant.name}</div>
                {mode === "pro" && (
                  <div className="text-xs text-muted-foreground">{plant.hours}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-xl bg-sun/5 border border-sun/20 text-center">
          <p className="text-sm text-muted-foreground">
            {selectedDirection.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SunlightAnalyzer;
