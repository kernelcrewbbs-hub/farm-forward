import { motion } from "framer-motion";
import { ArrowLeft, Code, Presentation, Star, Heart, Leaf, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";
import lavanyaProfile from "@/assets/lavanya-profile.jpg";
import hasanProfile from "@/assets/hasan-profile.jpg";

const teamMembers = [
  {
    name: "Lavanya N Gajbhiye",
    role: "Website Designer & Full Stack Developer",
    class: "Class 8K",
    image: lavanyaProfile,
    icon: Code,
    description: "Passionate about creating beautiful, functional websites that make a difference. Skilled in React, TypeScript, and modern web technologies.",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Hasan Rouf",
    role: "Main Presenter",
    class: "Class 8L",
    image: hasanProfile,
    icon: Presentation,
    description: "Expert communicator and presenter, bringing AgriSmart's vision to life through engaging presentations and demonstrations.",
    color: "from-cyan-500 to-blue-600",
  },
];

const projectHighlights = [
  { icon: Globe, label: "Global Coverage", value: "40+ Countries" },
  { icon: Leaf, label: "Crops Supported", value: "200+ Varieties" },
  { icon: Users, label: "Target Users", value: "Farmers Worldwide" },
  { icon: Star, label: "Features", value: "15+ Tools" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-playfair font-bold text-xl">AgriSmart</span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Made with Love
            </span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-primary">AgriSmart</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A student-led initiative to revolutionize farming with smart technology, 
              bringing data-driven insights to farmers around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Highlights */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {projectHighlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center border border-border/50"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The brilliant minds behind AgriSmart, working together to create a sustainable future for agriculture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r ${member.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-card rounded-3xl p-8 border border-border/50 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10">
                    {/* Profile Image */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-r ${member.color} rounded-2xl rotate-6 opacity-50`} />
                      <img
                        src={member.image}
                        alt={member.name}
                        className="relative w-full h-full object-cover rounded-2xl shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-card rounded-xl shadow-lg flex items-center justify-center border border-border">
                        <member.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-3">
                        {member.class}
                      </div>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-8">
              Our Mission
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                At AgriSmart, we believe that every farmer deserves access to cutting-edge technology 
                and data-driven insights. Our platform bridges the gap between traditional farming 
                wisdom and modern agricultural science.
              </p>
              <p>
                By leveraging real-time weather data, market prices, and AI-powered recommendations, 
                we help farmers make informed decisions that increase yields, reduce costs, and 
                promote sustainable practices.
              </p>
              <p>
                This project was created with a vision to empower farmers worldwide, from small 
                home gardeners to large-scale agricultural operations, with tools that were once 
                only available to industrial farming enterprises.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by Class 8K & 8L Students
          </p>
          <p className="text-sm mt-2">© 2024 AgriSmart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
