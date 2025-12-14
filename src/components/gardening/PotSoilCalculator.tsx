import { useState } from "react";
import { motion } from "framer-motion";
import { Flower2, Info, Recycle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface Props {
  mode: "beginner" | "pro";
}

const plants = [
  { id: "tomato", name: "Tomato", potSize: "12-15 inch", depth: "Deep", soilMix: { soil: 40, compost: 30, cocopeat: 20, sand: 10 } },
  { id: "tulsi", name: "Tulsi", potSize: "8-10 inch", depth: "Medium", soilMix: { soil: 50, compost: 30, cocopeat: 15, sand: 5 } },
  { id: "mint", name: "Mint", potSize: "6-8 inch", depth: "Shallow", soilMix: { soil: 40, compost: 35, cocopeat: 20, sand: 5 } },
  { id: "chili", name: "Chili", potSize: "10-12 inch", depth: "Medium", soilMix: { soil: 45, compost: 30, cocopeat: 15, sand: 10 } },
  { id: "spinach", name: "Spinach", potSize: "6-8 inch", depth: "Shallow", soilMix: { soil: 40, compost: 40, cocopeat: 15, sand: 5 } },
  { id: "curry", name: "Curry Leaves", potSize: "14-18 inch", depth: "Deep", soilMix: { soil: 50, compost: 25, cocopeat: 15, sand: 10 } },
];

const potTypes = [
  { id: "growbag", name: "Grow Bag", emoji: "🛍️", drainage: "Excellent", durability: "1-2 years" },
  { id: "clay", name: "Clay Pot", emoji: "🏺", drainage: "Good", durability: "5+ years" },
  { id: "plastic", name: "Plastic", emoji: "🪴", drainage: "Moderate", durability: "3-5 years" },
  { id: "ceramic", name: "Ceramic", emoji: "🫖", drainage: "Good", durability: "5+ years" },
];

const PotSoilCalculator = ({ mode }: Props) => {
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);
  const [selectedPot, setSelectedPot] = useState(potTypes[0]);
  const [potDiameter, setPotDiameter] = useState([12]);

  const calculateSoilAmount = () => {
    const radius = potDiameter[0] / 2;
    const depth = selectedPlant.depth === "Deep" ? 12 : selectedPlant.depth === "Medium" ? 8 : 6;
    const volume = Math.PI * radius * radius * depth; // cubic inches
    const liters = (volume * 0.0163871).toFixed(1); // convert to liters
    return liters;
  };

  const SoilMixBar = ({ label, percent, color }: { label: string; percent: number; color: string }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{percent}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flower2 className="w-6 h-6 text-primary" />
          Pot & Soil Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Get the perfect pot size and soil mix for your plants
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plant Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Select Plant</label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {plants.map((plant) => (
              <button
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className={`p-3 rounded-xl border transition-all text-sm ${
                  selectedPlant.id === plant.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                {plant.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pot Type Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Pot Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {potTypes.map((pot) => (
              <motion.button
                key={pot.id}
                onClick={() => setSelectedPot(pot)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border transition-all ${
                  selectedPot.id === pot.id
                    ? "border-primary bg-primary/10"
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-2">{pot.emoji}</div>
                <div className="font-medium text-foreground text-sm">{pot.name}</div>
                <div className="text-xs text-muted-foreground">{pot.drainage} drainage</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pot Size Recommendation */}
          <div className="p-4 rounded-xl bg-leaf/10 border border-leaf/20">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-leaf" />
              Recommended Pot Size
            </h3>
            <div className="text-3xl font-bold text-leaf mb-2">{selectedPlant.potSize}</div>
            <div className="text-sm text-muted-foreground">
              Pot depth: {selectedPlant.depth}
            </div>
            
            {mode === "pro" && (
              <div className="mt-4">
                <label className="text-sm text-foreground block mb-2">
                  Adjust diameter: {potDiameter}″
                </label>
                <Slider
                  value={potDiameter}
                  onValueChange={setPotDiameter}
                  min={6}
                  max={24}
                  step={1}
                  className="mb-2"
                />
                <div className="text-sm text-muted-foreground">
                  Estimated soil needed: <span className="font-medium">{calculateSoilAmount()} liters</span>
                </div>
              </div>
            )}
          </div>

          {/* Soil Mix */}
          <div className="p-4 rounded-xl bg-soil/10 border border-soil/20">
            <h3 className="font-semibold text-foreground mb-4">Ideal Soil Mix Ratio</h3>
            <div className="space-y-3">
              <SoilMixBar label="Garden Soil" percent={selectedPlant.soilMix.soil} color="bg-soil" />
              <SoilMixBar label="Compost/FYM" percent={selectedPlant.soilMix.compost} color="bg-leaf" />
              <SoilMixBar label="Cocopeat" percent={selectedPlant.soilMix.cocopeat} color="bg-secondary" />
              <SoilMixBar label="Sand/Perlite" percent={selectedPlant.soilMix.sand} color="bg-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Kitchen Waste Tip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-primary/5 border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Recycle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">♻️ Reuse Kitchen Waste!</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Banana peels, eggshells, tea leaves, and coffee grounds make excellent compost.
                Mix with dry leaves and let decompose for 2-3 weeks before adding to soil.
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PotSoilCalculator;
