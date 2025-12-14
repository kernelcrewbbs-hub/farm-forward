import { motion } from "framer-motion";
import { Warehouse, MapPin, Phone, Clock, DollarSign, Navigation } from "lucide-react";

const coldStorageLocations = [
  {
    name: "Lineage Logistics",
    city: "Los Angeles",
    distance: "15 miles",
    cost: "$0.50 - $1.50 / quintal / day",
    capacity: "50,000 tons",
    contact: "+1 (310) 555-0123",
    hours: "24/7 Operations",
    rating: 4.8,
  },
  {
    name: "Americold Logistics",
    city: "Los Angeles",
    distance: "22 miles",
    cost: "$0.40 - $1.20 / quintal / day",
    capacity: "75,000 tons",
    contact: "+1 (310) 555-0456",
    hours: "24/7 Operations",
    rating: 4.6,
  },
  {
    name: "Americold Richmond",
    city: "Bay Area",
    distance: "370 miles",
    cost: "$0.35 - $1.00 / quintal / day",
    capacity: "100,000 tons",
    contact: "+1 (510) 555-0789",
    hours: "6 AM - 10 PM",
    rating: 4.7,
  },
  {
    name: "United States Cold Storage",
    city: "Fresno",
    distance: "210 miles",
    cost: "$0.30 - $0.90 / quintal / day",
    capacity: "80,000 tons",
    contact: "+1 (559) 555-0321",
    hours: "24/7 Operations",
    rating: 4.5,
  },
];

const ColdStorageMap = () => {
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
            <Warehouse className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Storage Network
            </span>
          </div>
          <h2 className="section-title mb-4">Nearby Cold Storage</h2>
          <p className="section-subtitle mx-auto">
            Find temperature-controlled storage facilities for your harvest
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {coldStorageLocations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group card-glass p-6 hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {location.name}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                    <MapPin className="w-4 h-4" />
                    {location.city}
                    <span className="text-border">•</span>
                    <Navigation className="w-3 h-3" />
                    {location.distance}
                  </div>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  ★ {location.rating}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Cost</div>
                    <div className="text-sm font-medium text-foreground">{location.cost}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-water/20 flex items-center justify-center">
                    <Warehouse className="w-5 h-5 text-water" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Capacity</div>
                    <div className="text-sm font-medium text-foreground">{location.capacity}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-leaf/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-leaf" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Contact</div>
                    <div className="text-sm font-medium text-foreground">{location.contact}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Hours</div>
                    <div className="text-sm font-medium text-foreground">{location.hours}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-primary/10 text-primary font-medium
                           hover:bg-primary hover:text-primary-foreground transition-all
                           flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColdStorageMap;
