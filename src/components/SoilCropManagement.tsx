import { motion } from "framer-motion";
import { 
  Leaf, Droplets, Bug, RefreshCw, Calendar, Sprout,
  CheckCircle2, ArrowRight
} from "lucide-react";
import { useState } from "react";
import healthySoil from "@/assets/healthy-soil.jpg";
import cropRotation from "@/assets/crop-rotation.jpg";

interface ManagementCard {
  id: string;
  icon: typeof Leaf;
  title: string;
  color: string;
  frontContent: string;
  backContent: string[];
  image?: string;
}

const managementCards: ManagementCard[] = [
  {
    id: "soil",
    icon: Sprout,
    title: "Soil Management",
    color: "bg-soil",
    frontContent: "Red soils require special attention for optimal crop yield",
    backContent: [
      "Well-drained soil characteristics",
      "Low nitrogen & organic carbon",
      "Add FYM / compost regularly",
      "Mulching for moisture retention",
    ],
    image: healthySoil,
  },
  {
    id: "water",
    icon: Droplets,
    title: "Water Conservation",
    color: "bg-water",
    frontContent: "Efficient irrigation strategies for sustainable farming",
    backContent: [
      "Implement mulching techniques",
      "Use raised beds for drainage",
      "Moisture retention for winter crops",
      "Drip irrigation recommended",
    ],
  },
  {
    id: "pest",
    icon: Bug,
    title: "Integrated Pest Management",
    color: "bg-accent",
    frontContent: "Sustainable pest control with minimal environmental impact",
    backContent: [
      "Monitor aphids & flea beetles",
      "Watch for root rot symptoms",
      "Prefer biopesticides",
      "Chemicals only when necessary",
    ],
  },
  {
    id: "rotation",
    icon: RefreshCw,
    title: "Crop Rotation",
    color: "bg-leaf",
    frontContent: "Strategic rotation for soil health and higher yields",
    backContent: [
      "Pulses → Cereals → Oilseeds",
      "Improves soil fertility",
      "Reduces pest pressure",
      "Breaks disease cycles",
    ],
    image: cropRotation,
  },
  {
    id: "sowing",
    icon: Calendar,
    title: "Timely Sowing",
    color: "bg-secondary",
    frontContent: "Optimal sowing windows for maximum crop potential",
    backContent: [
      "Sow just after monsoon withdrawal",
      "Better moisture utilization",
      "Strong crop establishment",
      "Check local weather forecasts",
    ],
  },
  {
    id: "companion",
    icon: Leaf,
    title: "Companion Planting",
    color: "bg-primary",
    frontContent: "Strategic plant pairings for mutual benefits",
    backContent: [
      "Maize with beans fixes nitrogen",
      "Basil repels pests from tomatoes",
      "Sunflowers attract pollinators",
      "Improve biodiversity",
    ],
  },
];

const FlipCard = ({ card }: { card: ManagementCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-72 perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {card.image ? (
            <div className="relative h-full">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                  <card.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-sm opacity-90">{card.frontContent}</p>
              </div>
            </div>
          ) : (
            <div className={`h-full p-6 bg-gradient-to-br from-card to-muted/50 border border-border/50`}>
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                <card.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground">{card.frontContent}</p>
              <div className="mt-4 flex items-center text-primary text-sm font-medium">
                Hover for tips <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Back Face */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl p-6 ${card.color}`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="text-xl font-bold text-primary-foreground mb-4 flex items-center gap-2">
            <card.icon className="w-5 h-5" />
            {card.title}
          </h3>
          <ul className="space-y-3">
            {card.backContent.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-2 text-primary-foreground"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SoilCropManagement = () => {
  return (
    <section className="section-padding bg-muted/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Best Practices
            </span>
          </div>
          <h2 className="section-title mb-4">Soil & Crop Management</h2>
          <p className="section-subtitle mx-auto">
            Interactive guides for sustainable farming practices. Hover over cards to reveal expert tips.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managementCards.map((card) => (
            <FlipCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoilCropManagement;
