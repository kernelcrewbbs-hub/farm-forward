import { motion } from "framer-motion";
import { Leaf, Menu, X, Home, Cloud, Wheat, DollarSign, Warehouse, MessageSquare, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "@/contexts/LocationContext";
import LocationSelector from "./LocationSelector";

const navLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#weather", label: "Weather", icon: Cloud },
  { href: "#crops", label: "Crops", icon: Wheat },
  { href: "#market", label: "Market", icon: DollarSign },
  { href: "#storage", label: "Storage", icon: Warehouse },
  { href: "/about", label: "About Us", icon: Users, isRoute: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const { location } = useLocation();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-playfair text-xl font-bold text-foreground hidden sm:block">
                AgriSmart
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-4 py-2 text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-all flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-all flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                )
              ))}
            </div>

            {/* Location & CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setShowLocationSelector(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span className="max-w-[120px] truncate">
                  {location.loading ? "Detecting..." : `${location.city}`}
                </span>
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLocationSelector(true)}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden bg-background border-t border-border/50"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {/* Location Button Mobile */}
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLocationSelector(true);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/5 rounded-xl transition-colors bg-muted/50"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span>{location.loading ? "Detecting location..." : `${location.city}, ${location.country}`}</span>
            </button>
            
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/5 rounded-xl transition-colors"
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/5 rounded-xl transition-colors"
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  {link.label}
                </a>
              )
            ))}
            <button 
              onClick={() => {
                setIsOpen(false);
                setShowLocationSelector(true);
              }}
              className="w-full mt-4 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </motion.nav>

      <LocationSelector 
        isOpen={showLocationSelector} 
        onClose={() => setShowLocationSelector(false)} 
      />
    </>
  );
};

export default Navbar;
