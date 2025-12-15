import { motion } from "framer-motion";
import { Warehouse, MapPin, Phone, Clock, DollarSign, Navigation } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

// Cold storage data by country/region
const coldStorageByRegion: Record<string, any[]> = {
  IN: [
    { name: "Snowman Logistics", city: "Bhopal", distance: "12 km", cost: "₹15-25 / quintal / day", capacity: "25,000 tons", contact: "+91 755 xxx xxxx", hours: "24/7 Operations", rating: 4.7 },
    { name: "MPCDF Cold Storage", city: "Bhopal", distance: "8 km", cost: "₹12-20 / quintal / day", capacity: "15,000 tons", contact: "+91 755 xxx xxxx", hours: "6 AM - 10 PM", rating: 4.5 },
    { name: "Agro Cold Chain", city: "Indore", distance: "195 km", cost: "₹10-18 / quintal / day", capacity: "40,000 tons", contact: "+91 731 xxx xxxx", hours: "24/7 Operations", rating: 4.6 },
    { name: "Kisan Cold Storage", city: "Jabalpur", distance: "310 km", cost: "₹8-15 / quintal / day", capacity: "20,000 tons", contact: "+91 761 xxx xxxx", hours: "6 AM - 10 PM", rating: 4.4 },
  ],
  US: [
    { name: "Lineage Logistics", city: "Los Angeles", distance: "15 miles", cost: "$0.50-1.50 / quintal / day", capacity: "50,000 tons", contact: "+1 (310) 555-0123", hours: "24/7 Operations", rating: 4.8 },
    { name: "Americold Logistics", city: "Los Angeles", distance: "22 miles", cost: "$0.40-1.20 / quintal / day", capacity: "75,000 tons", contact: "+1 (310) 555-0456", hours: "24/7 Operations", rating: 4.6 },
  ],
  default: [
    { name: "Local Cold Storage", city: "Nearby", distance: "Variable", cost: "Contact for rates", capacity: "Variable", contact: "Search locally", hours: "Business hours", rating: 4.0 },
  ],
};

const ColdStorageMap = () => {
  const { location } = useLocation();
  
  const locations = coldStorageByRegion[location.countryCode] || coldStorageByRegion.default;

  return (
    <section className="section-padding bg-muted/20">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Warehouse className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">Storage Network</span>
          </div>
          <h2 className="section-title mb-4">Nearby Cold Storage</h2>
          <p className="section-subtitle mx-auto">
            Cold storage facilities near {location.loading ? "your location" : `${location.city}, ${location.state}`}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {locations.map((loc, index) => (
            <motion.div key={loc.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group card-glass p-6 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{loc.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                    <MapPin className="w-4 h-4" />{loc.city}<span className="text-border">•</span><Navigation className="w-3 h-3" />{loc.distance}
                  </div>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">★ {loc.rating}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center"><DollarSign className="w-5 h-5 text-secondary" /></div><div><div className="text-xs text-muted-foreground">Cost</div><div className="text-sm font-medium text-foreground">{loc.cost}</div></div></div>
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-water/20 flex items-center justify-center"><Warehouse className="w-5 h-5 text-water" /></div><div><div className="text-xs text-muted-foreground">Capacity</div><div className="text-sm font-medium text-foreground">{loc.capacity}</div></div></div>
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-leaf/20 flex items-center justify-center"><Phone className="w-5 h-5 text-leaf" /></div><div><div className="text-xs text-muted-foreground">Contact</div><div className="text-sm font-medium text-foreground">{loc.contact}</div></div></div>
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center"><Clock className="w-5 h-5 text-accent" /></div><div><div className="text-xs text-muted-foreground">Hours</div><div className="text-sm font-medium text-foreground">{loc.hours}</div></div></div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98}}
                onClick={() => {
                  const mapsUrl = `https://www.google.com/maps/search/${loc.name}+${loc.city}`;
                  window.open(mapsUrl, '_blank');
                }}
                className="w-full py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />Get Directions
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColdStorageMap;
