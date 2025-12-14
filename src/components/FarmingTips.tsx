import { motion } from "framer-motion";
import { Sun, Shovel, Droplets, Snowflake, Users, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const farmingTips = [
  {
    id: "climate",
    icon: Sun,
    title: "Climate Utilization",
    color: "bg-sun",
    content: [
      "Warm early winters ideal for legumes & oilseeds",
      "Choose short-duration, drought-tolerant varieties",
      "Monitor temperature fluctuations daily",
      "Utilize mild winter for extended growing season",
      "Plan sowing calendar around monsoon withdrawal",
    ],
  },
  {
    id: "soil-prep",
    icon: Shovel,
    title: "Soil Preparation",
    color: "bg-soil",
    content: [
      "Practice conservation tillage to retain moisture",
      "Add organic amendments for red soils",
      "Test soil pH before planting season",
      "Deep plowing in summer for pest control",
      "Create raised beds for better drainage",
    ],
  },
  {
    id: "irrigation",
    icon: Droplets,
    title: "Irrigation Efficiency",
    color: "bg-water",
    content: [
      "Drip & sprinkler systems recommended",
      "Avoid flood irrigation to prevent waterlogging",
      "Irrigate during early morning or late evening",
      "Monitor soil moisture with sensors",
      "Mulching reduces water requirements by 30%",
    ],
  },
  {
    id: "frost",
    icon: Snowflake,
    title: "Frost Protection",
    color: "bg-sky",
    content: [
      "Use row covers for sensitive crops",
      "South-facing slopes provide natural warmth",
      "Monitor weather forecasts for frost alerts",
      "Sprinkler irrigation can prevent frost damage",
      "Choose frost-resistant crop varieties",
    ],
  },
  {
    id: "support",
    icon: Users,
    title: "Local Support Resources",
    color: "bg-primary",
    content: [
      "Contact UC Cooperative Extension for guidance",
      "Subscribe to local pest alert systems",
      "Join farmer cooperatives for bulk purchasing",
      "Access government subsidy programs",
      "Attend regional agricultural workshops",
    ],
  },
];

const FarmingTips = () => {
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
            <Sun className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Expert Advice
            </span>
          </div>
          <h2 className="section-title mb-4">Location-Specific Farming Tips</h2>
          <p className="section-subtitle mx-auto">
            Tailored recommendations for optimal crop production in your region
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {farmingTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={tip.id}
                  className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${tip.color} flex items-center justify-center shadow-md`}>
                        <tip.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tip.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="space-y-3 ml-16">
                      {tip.content.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <div className={`w-2 h-2 rounded-full ${tip.color} mt-2 flex-shrink-0`} />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FarmingTips;
