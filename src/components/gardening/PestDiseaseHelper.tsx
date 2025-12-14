import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Leaf, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  mode: "beginner" | "pro";
}

const problems = [
  {
    id: "yellow-leaves",
    symptom: "🍂 Leaves turning yellow",
    causes: ["Overwatering", "Nitrogen deficiency", "Root rot"],
    pest: "None (nutrient issue)",
    organic: [
      "Reduce watering frequency",
      "Add compost or neem cake for nitrogen",
      "Ensure proper drainage",
      "Use diluted buttermilk spray (1:10)",
    ],
    chemical: "NPK 20-20-20 fertilizer (last resort)",
    severity: "medium",
  },
  {
    id: "holes",
    symptom: "🕳️ Holes in leaves",
    causes: ["Caterpillars", "Beetles", "Snails"],
    pest: "Caterpillar / Beetle",
    organic: [
      "Handpick insects in morning",
      "Neem oil spray (5ml per liter)",
      "Garlic-chili spray",
      "Introduce beneficial insects (ladybugs)",
    ],
    chemical: "Carbaryl (Sevin) - avoid if possible",
    severity: "high",
  },
  {
    id: "white-powder",
    symptom: "🌫️ White powder on leaves",
    causes: ["Powdery mildew fungus"],
    pest: "Powdery Mildew",
    organic: [
      "Remove affected leaves",
      "Baking soda spray (1 tsp per liter)",
      "Milk spray (1:9 with water)",
      "Improve air circulation",
    ],
    chemical: "Sulfur-based fungicide",
    severity: "medium",
  },
  {
    id: "slow-growth",
    symptom: "🐢 Slow/stunted growth",
    causes: ["Poor soil", "Root bound", "Nutrient deficiency"],
    pest: "None (care issue)",
    organic: [
      "Repot to larger container",
      "Add compost and vermicompost",
      "Seaweed extract foliar spray",
      "Check for root health",
    ],
    chemical: "Balanced liquid fertilizer",
    severity: "low",
  },
  {
    id: "curling",
    symptom: "🌀 Curling leaves",
    causes: ["Aphids", "Heat stress", "Virus"],
    pest: "Aphids / Mites",
    organic: [
      "Strong water spray to dislodge",
      "Neem oil application",
      "Soap spray (5ml liquid soap per liter)",
      "Move from direct afternoon sun",
    ],
    chemical: "Imidacloprid (systemic)",
    severity: "high",
  },
  {
    id: "wilting",
    symptom: "😔 Wilting despite watering",
    causes: ["Root rot", "Bacterial wilt", "Heat stress"],
    pest: "Soil-borne pathogen",
    organic: [
      "Check roots - brown = rot",
      "Reduce watering if rot present",
      "Add Trichoderma to soil",
      "Ensure drainage holes clear",
    ],
    chemical: "Copper fungicide (for bacterial wilt)",
    severity: "high",
  },
];

const PestDiseaseHelper = ({ mode }: Props) => {
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [showChemical, setShowChemical] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-risk-low text-leaf";
      case "medium": return "bg-risk-medium text-secondary";
      case "high": return "bg-risk-high text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="w-6 h-6 text-secondary" />
          Pest & Disease Helper
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Diagnose plant problems and get eco-friendly solutions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Problem Selection */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            What problem are you facing?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {problems.map((problem) => (
              <motion.button
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border transition-all text-left ${
                  selectedProblem.id === problem.id
                    ? "border-primary bg-primary/10"
                    : "border-border/50 hover:border-primary/50"
                }`}
              >
                <div className="text-lg mb-1">{problem.symptom}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${getSeverityColor(problem.severity)}`}>
                  {problem.severity} severity
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Diagnosis */}
        <motion.div
          key={selectedProblem.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-muted/30 space-y-4"
        >
          <div>
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-secondary" />
              Probable Cause
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedProblem.causes.map((cause) => (
                <span key={cause} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                  {cause}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Pest/Disease: {selectedProblem.pest}
            </h3>
          </div>
        </motion.div>

        {/* Solutions */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Organic Solutions */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-xl bg-leaf/10 border border-leaf/20"
          >
            <h3 className="font-semibold text-leaf mb-3 flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              🌿 Organic Solutions (Recommended)
            </h3>
            <ul className="space-y-2">
              {selectedProblem.organic.map((solution, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-leaf flex-shrink-0 mt-0.5" />
                  {solution}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Chemical Solution */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-xl bg-destructive/10 border border-destructive/20"
          >
            <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              ⚠️ Chemical Option (Last Resort)
            </h3>
            
            {!showChemical ? (
              <button
                onClick={() => setShowChemical(true)}
                className="text-sm text-destructive/70 underline"
              >
                Show chemical option
              </button>
            ) : (
              <div className="text-sm text-foreground">
                <p>{selectedProblem.chemical}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  ⚠️ Always use as last resort. Follow safety guidelines and wear protective gear.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Pro Tips */}
        {mode === "pro" && (
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <h4 className="font-medium text-foreground mb-2">🔬 Pro Prevention Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Maintain healthy soil with beneficial microbes (Trichoderma, Pseudomonas)</li>
              <li>• Practice crop rotation even in containers</li>
              <li>• Use companion planting - basil near tomatoes repels pests</li>
              <li>• Inspect plants weekly - early detection is key</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PestDiseaseHelper;
