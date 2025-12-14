import { motion } from "framer-motion";
import { Droplets, Recycle, Thermometer, Info, CheckCircle } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  mode: "beginner" | "pro";
}

const waterSavingTips = [
  {
    id: "drip",
    title: "Drip Irrigation",
    emoji: "💧",
    description: "Direct water to plant roots, reducing evaporation by 50%",
    howTo: [
      "Buy drip irrigation kit (₹200-500 for small garden)",
      "Connect to water source with timer",
      "Place emitters near each plant base",
      "Run for 15-30 min based on soil type",
    ],
    proTips: "Emitter flow rate of 2-4 LPH ideal for most containers. Use pressure compensating emitters for uneven terrain.",
    savings: "50-70%",
  },
  {
    id: "bottle",
    title: "Bottle Irrigation (DIY)",
    emoji: "🍾",
    description: "Free, simple method using plastic bottles",
    howTo: [
      "Take 1-2 liter plastic bottle",
      "Poke 2-3 small holes in cap",
      "Cut bottom, bury cap-down near plant",
      "Fill with water - slow release over days",
    ],
    proTips: "Add wicks from old cotton clothes for even better capillary action. Multiple bottles for larger plants.",
    savings: "40-50%",
  },
  {
    id: "mulching",
    title: "Mulching",
    emoji: "🍂",
    description: "Cover soil to prevent water evaporation",
    howTo: [
      "Collect dry leaves, straw, or grass clippings",
      "Spread 2-3 inch layer around plants",
      "Keep mulch away from plant stems",
      "Refresh every few months",
    ],
    proTips: "Coconut coir makes excellent mulch. Living mulch (clover) adds nitrogen while conserving moisture.",
    savings: "25-50%",
  },
  {
    id: "timing",
    title: "Smart Watering Time",
    emoji: "⏰",
    description: "Water when evaporation is lowest",
    howTo: [
      "Water early morning (6-8 AM) - best time",
      "Evening (5-7 PM) is second choice",
      "Never water in afternoon heat",
      "Overcast days = skip or reduce",
    ],
    proTips: "Morning watering reduces fungal disease risk. Leaves dry before night, preventing powdery mildew.",
    savings: "20-30%",
  },
  {
    id: "greywater",
    title: "Greywater Reuse",
    emoji: "♻️",
    description: "Reuse household water for plants",
    howTo: [
      "Collect kitchen rinse water",
      "Use AC condensate water (pure!)",
      "RO waste water is safe for most plants",
      "Avoid soapy/oily water",
    ],
    proTips: "AC water is distilled - add a tiny bit of fertilizer. RO waste has minerals that benefit plants.",
    savings: "30-40%",
  },
];

const WaterSavingMode = ({ mode }: Props) => {
  const { location } = useLocation();
  
  // Determine if location is water-stressed
  const dryRegions = ["Rajasthan", "Gujarat", "Maharashtra", "Karnataka", "Telangana", "Andhra Pradesh"];
  const isWaterStressed = dryRegions.some(r => location.state?.includes(r)) || location.countryCode !== "IN";

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="w-6 h-6 text-water" />
          Water Saving Mode
          {isWaterStressed && (
            <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full ml-2">
              Important for your region!
            </span>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Conserve water while keeping your garden healthy
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Water Stress Alert */}
        {isWaterStressed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-secondary/10 border border-secondary/20"
          >
            <div className="flex items-center gap-3">
              <Thermometer className="w-8 h-8 text-secondary" />
              <div>
                <h3 className="font-medium text-foreground">Water Conservation Priority</h3>
                <p className="text-sm text-muted-foreground">
                  {location.state || location.country} experiences water stress. These techniques are especially important for your region!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tips Grid */}
        <div className="space-y-4">
          {waterSavingTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{tip.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{tip.title}</h3>
                    <span className="text-xs bg-water/20 text-water px-2 py-1 rounded-full">
                      Save {tip.savings} water
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                  
                  {/* How To Steps */}
                  <div className="space-y-2">
                    {tip.howTo.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-leaf flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{step}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pro Tips */}
                  {mode === "pro" && (
                    <div className="mt-3 p-3 rounded-lg bg-primary/5 text-sm">
                      <span className="text-primary font-medium">🔬 Pro tip:</span>
                      <span className="text-muted-foreground ml-1">{tip.proTips}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-water/10 text-center">
            <div className="text-2xl font-bold text-water">50%</div>
            <div className="text-xs text-muted-foreground">Average water saved with drip</div>
          </div>
          <div className="p-4 rounded-xl bg-leaf/10 text-center">
            <div className="text-2xl font-bold text-leaf">₹0</div>
            <div className="text-xs text-muted-foreground">Cost of bottle irrigation</div>
          </div>
          <div className="p-4 rounded-xl bg-sun/10 text-center">
            <div className="text-2xl font-bold text-sun">6 AM</div>
            <div className="text-xs text-muted-foreground">Best time to water</div>
          </div>
        </div>

        {/* Final Note */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Remember:</span> Overwatering kills more plants than underwatering! 
              Always check soil moisture before watering - stick your finger 1 inch deep. If dry, water. If moist, wait.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterSavingMode;
