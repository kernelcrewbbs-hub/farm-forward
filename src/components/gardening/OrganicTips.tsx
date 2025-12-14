import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Leaf, Recycle, Droplets, Bug, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  mode: "beginner" | "pro";
}

const tipCategories = [
  {
    id: "neem",
    icon: Bug,
    title: "Neem Oil Spray",
    color: "bg-leaf",
    tips: [
      { beginner: "Mix 5ml neem oil + 1 liter water + few drops dish soap", pro: "Add 2ml aloe vera gel for better adhesion. Works as systemic insecticide." },
      { beginner: "Spray in evening to avoid leaf burn", pro: "Repeat every 7-10 days for 3 cycles for complete pest control" },
      { beginner: "Effective against aphids, mealybugs, whiteflies", pro: "Contains Azadirachtin - disrupts pest hormone systems" },
    ],
  },
  {
    id: "compost",
    icon: Recycle,
    title: "DIY Composting",
    color: "bg-soil",
    tips: [
      { beginner: "Layer green (wet) + brown (dry) materials 1:2 ratio", pro: "Maintain C:N ratio of 25-30:1 for optimal decomposition" },
      { beginner: "Kitchen scraps + dry leaves = perfect mix", pro: "Temperature should reach 55-65°C for pathogen elimination" },
      { beginner: "Turn pile every 2 weeks for faster decomposition", pro: "Add garden soil or old compost as microbial activator" },
      { beginner: "Ready in 2-3 months when dark and crumbly", pro: "Vermicompost adds beneficial microbes and growth hormones" },
    ],
  },
  {
    id: "kitchen",
    icon: Recycle,
    title: "Kitchen Waste Reuse",
    color: "bg-secondary",
    tips: [
      { beginner: "Banana peels → potassium-rich fertilizer (dry & powder)", pro: "Ferment banana peels in water for 7 days for liquid potash" },
      { beginner: "Eggshells → calcium for tomatoes & peppers", pro: "Vinegar-soaked shells = immediately available calcium" },
      { beginner: "Tea/coffee grounds → nitrogen boost for leafy greens", pro: "Coffee grounds acidify soil - great for acid-loving plants" },
      { beginner: "Rice water → mild fertilizer for all plants", pro: "Fermented rice water contains LAB - beneficial bacteria" },
    ],
  },
  {
    id: "mulching",
    icon: Leaf,
    title: "Mulching Benefits",
    color: "bg-water",
    tips: [
      { beginner: "Cover soil with 2-3 inches of dry leaves or straw", pro: "Living mulch (clover) adds nitrogen while covering soil" },
      { beginner: "Reduces watering needs by 50%", pro: "Creates habitat for beneficial soil organisms" },
      { beginner: "Prevents weeds and soil erosion", pro: "Gradually decomposes to improve soil structure" },
      { beginner: "Keeps roots cool in summer, warm in winter", pro: "Cardboard under mulch = excellent weed barrier" },
    ],
  },
  {
    id: "fertilizer",
    icon: Droplets,
    title: "Natural Fertilizers",
    color: "bg-primary",
    tips: [
      { beginner: "Buttermilk spray → calcium + probiotics for plants", pro: "Contains Lactobacillus - fights fungal diseases" },
      { beginner: "Wood ash → potassium for flowering (small amounts)", pro: "Raises pH - avoid for acid-loving plants" },
      { beginner: "Fish tank water → nitrogen-rich irrigation", pro: "Contains ammonia that beneficial bacteria convert to nitrates" },
      { beginner: "Seaweed solution → trace minerals + growth hormones", pro: "Contains cytokinins and auxins for root development" },
    ],
  },
  {
    id: "companion",
    icon: RefreshCw,
    title: "Companion Planting",
    color: "bg-sun",
    tips: [
      { beginner: "Basil + Tomato = pest protection + better flavor", pro: "Basil repels thrips, aphids, and tomato hornworms" },
      { beginner: "Marigold around vegetables = natural pest control", pro: "Root secretions kill nematodes for 3+ years" },
      { beginner: "Mint near cabbage = repels cabbage moths", pro: "Plant in containers - mint is invasive!" },
      { beginner: "Beans + corn = nitrogen sharing + support", pro: "Three Sisters method: beans, corn, squash = complete system" },
    ],
  },
];

const OrganicTips = ({ mode }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(tipCategories[0]);

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-sun" />
          Organic Gardening Tips
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Eco-friendly practices for a healthy, chemical-free garden
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {tipCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-xl border transition-all ${
                selectedCategory.id === category.id
                  ? `${category.color}/20 border-current`
                  : "border-border/50 hover:border-primary/50"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-2`}>
                <category.icon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-xs font-medium text-foreground text-center">{category.title}</div>
            </motion.button>
          ))}
        </div>

        {/* Tips Content */}
        <motion.div
          key={selectedCategory.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl ${selectedCategory.color}/10 border border-current/20`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-lg ${selectedCategory.color} flex items-center justify-center`}>
              <selectedCategory.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">{selectedCategory.title}</h3>
          </div>

          <div className="space-y-4">
            {selectedCategory.tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-card border border-border/30"
              >
                <p className="text-foreground flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  {tip.beginner}
                </p>
                {mode === "pro" && tip.pro && (
                  <p className="text-sm text-primary mt-2 p-2 bg-primary/5 rounded-lg flex items-start gap-2">
                    <span className="text-sm">🔬</span>
                    {tip.pro}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Tip */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-leaf/10 to-primary/10 border border-leaf/20">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-sun" />
            <span className="font-medium text-foreground">Tip of the Day</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {mode === "beginner" 
              ? "Start small! A single tomato or herb plant is enough to begin your organic journey. Success breeds confidence! 🌱"
              : "Microbial diversity is key to soil health. Avoid tilling, add organic matter regularly, and let nature build your soil ecosystem. 🔬"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganicTips;
