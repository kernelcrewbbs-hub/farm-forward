import { motion } from "framer-motion";
import { Sun, Shovel, Droplets, Snowflake, Users, Building2 } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Region-specific farming tips
const getFarmingTipsForRegion = (countryCode: string, state: string) => {
  const tipsData: Record<string, any[]> = {
    "IN": [
      {
        id: "climate",
        icon: Sun,
        title: "Climate Utilization",
        color: "bg-sun",
        content: [
          "Warm early winters ideal for rabi crops like wheat, chickpea, and mustard",
          "Choose short-duration, drought-tolerant varieties for regions with less rainfall",
          "Monitor temperature fluctuations for pest outbreaks",
          "Utilize monsoon moisture for kharif season crops",
          "Plan sowing around monsoon withdrawal patterns",
        ],
      },
      {
        id: "soil-prep",
        icon: Shovel,
        title: "Soil Preparation",
        color: "bg-soil",
        content: [
          "Practice conservation tillage to retain soil moisture",
          "Add organic amendments like FYM and vermicompost",
          "Test soil pH and nutrient levels before sowing",
          "Deep summer plowing helps control soil-borne pests",
          "Create raised beds for better drainage in flood-prone areas",
        ],
      },
      {
        id: "irrigation",
        icon: Droplets,
        title: "Irrigation Efficiency",
        color: "bg-water",
        content: [
          "Drip irrigation saves 40-60% water compared to flood irrigation",
          "Irrigate during early morning or late evening to reduce evaporation",
          "Use mulching to conserve soil moisture",
          "Monitor soil moisture with simple tensiometers",
          "Consider rainwater harvesting for supplementary irrigation",
        ],
      },
      {
        id: "frost",
        icon: Snowflake,
        title: "Weather Protection",
        color: "bg-sky",
        content: [
          "Use row covers for frost protection in north India",
          "Install shade nets during extreme heat in summer",
          "Create windbreaks to protect crops from hot winds (loo)",
          "Monitor weather forecasts from IMD regularly",
          "Use sprinkler irrigation during frost conditions",
        ],
      },
      {
        id: "support",
        icon: Users,
        title: "Local Support Resources",
        color: "bg-primary",
        content: [
          "Contact Krishi Vigyan Kendra (KVK) for guidance",
          "Subscribe to mKisan SMS service for weather alerts",
          "Join Farmer Producer Organizations (FPOs) for better market access",
          "Access PM-KISAN and other government subsidy programs",
          "Attend agricultural melas and training programs",
        ],
      },
    ],
    "US": [
      {
        id: "climate",
        icon: Sun,
        title: "Climate Utilization",
        color: "bg-sun",
        content: [
          "Utilize extended growing seasons in southern states",
          "Plan for frost dates based on USDA hardiness zones",
          "Choose heat-tolerant varieties for warming climate",
          "Monitor ENSO patterns for seasonal planning",
          "Leverage cover crops for soil health and carbon sequestration",
        ],
      },
      {
        id: "soil-prep",
        icon: Shovel,
        title: "Soil Preparation",
        color: "bg-soil",
        content: [
          "Practice no-till or minimum tillage for soil conservation",
          "Implement crop rotation with legumes for nitrogen fixation",
          "Test soil through county extension services",
          "Use precision agriculture for variable-rate application",
          "Control erosion with contour farming on slopes",
        ],
      },
      {
        id: "irrigation",
        icon: Droplets,
        title: "Irrigation Efficiency",
        color: "bg-water",
        content: [
          "Install center pivot systems with GPS guidance",
          "Use soil moisture sensors for precision irrigation",
          "Implement deficit irrigation strategies for water conservation",
          "Consider subsurface drip for high-value crops",
          "Monitor evapotranspiration rates for scheduling",
        ],
      },
      {
        id: "frost",
        icon: Snowflake,
        title: "Weather Protection",
        color: "bg-sky",
        content: [
          "Use frost blankets for early spring plantings",
          "Install wind machines for orchard frost protection",
          "Monitor NWS frost advisories and alerts",
          "Use high tunnels for season extension",
          "Consider insurance options for weather risks",
        ],
      },
      {
        id: "support",
        icon: Users,
        title: "Local Support Resources",
        color: "bg-primary",
        content: [
          "Contact USDA-NRCS for conservation planning",
          "Access FSA programs for financial assistance",
          "Connect with county extension agents",
          "Join commodity associations for market information",
          "Explore USDA organic certification programs",
        ],
      },
    ],
    "CN": [
      {
        id: "climate",
        icon: Sun,
        title: "Climate Utilization",
        color: "bg-sun",
        content: [
          "Optimize double-cropping systems based on regional climate",
          "Monitor monsoon patterns for rice cultivation",
          "Choose cold-tolerant varieties for northern regions",
          "Utilize greenhouse technology for extended seasons",
          "Plan crop calendars around traditional solar terms",
        ],
      },
      {
        id: "soil-prep",
        icon: Shovel,
        title: "Soil Preparation",
        color: "bg-soil",
        content: [
          "Practice rice-wheat rotation in suitable regions",
          "Apply organic fertilizers to improve soil structure",
          "Test soil fertility through local agricultural stations",
          "Use green manure crops for soil improvement",
          "Control salinization in irrigated areas",
        ],
      },
      {
        id: "irrigation",
        icon: Droplets,
        title: "Irrigation Efficiency",
        color: "bg-water",
        content: [
          "Implement alternate wetting and drying for rice",
          "Use canal lining to reduce water losses",
          "Install drip systems for fruit and vegetable crops",
          "Practice water-saving irrigation techniques",
          "Harvest rainwater for supplementary irrigation",
        ],
      },
      {
        id: "frost",
        icon: Snowflake,
        title: "Weather Protection",
        color: "bg-sky",
        content: [
          "Use plastic film mulching for temperature control",
          "Install cold frames for early vegetable production",
          "Monitor weather forecasts from CMA",
          "Use sprinkler systems for frost protection",
          "Select frost-resistant crop varieties",
        ],
      },
      {
        id: "support",
        icon: Building2,
        title: "Local Support Resources",
        color: "bg-primary",
        content: [
          "Contact local agricultural technology extension centers",
          "Access government subsidy programs for farming",
          "Join agricultural cooperatives for better market access",
          "Participate in agricultural training programs",
          "Consult agricultural universities for technical support",
        ],
      },
    ],
  };

  // Default to India tips if country not found
  return tipsData[countryCode] || tipsData["IN"];
};

const FarmingTips = () => {
  const { location } = useLocation();
  
  const farmingTips = useMemo(() => {
    return getFarmingTipsForRegion(location.countryCode, location.state);
  }, [location.countryCode, location.state]);

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
          <h2 className="section-title mb-4">Farming Tips for {location.country}</h2>
          <p className="section-subtitle mx-auto">
            Tailored recommendations for {location.state || location.city}
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
                      {tip.content.map((item: string, i: number) => (
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
