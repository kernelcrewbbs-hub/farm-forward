import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, MessageCircle, Clock, User, ChevronDown } from "lucide-react";
import { useState } from "react";

const forumPosts = [
  {
    id: 1,
    author: "RameshKumar",
    avatar: "RK",
    title: "Best time to sow chickpea in red soil?",
    content: "I have red laterite soil in my farm. When is the optimal time to sow chickpea for maximum yield? Also, what varieties work best?",
    category: "Crop Advice",
    likes: 24,
    replies: 8,
    timeAgo: "2 hours ago",
    isAnswered: true,
  },
  {
    id: 2,
    author: "PriyaSingh",
    avatar: "PS",
    title: "Drip irrigation cost for 2 acre farm",
    content: "Planning to set up drip irrigation for my 2-acre vegetable farm. What's the typical cost and which brand is reliable?",
    category: "Irrigation",
    likes: 18,
    replies: 12,
    timeAgo: "5 hours ago",
    isAnswered: true,
  },
  {
    id: 3,
    author: "SureshPatel",
    avatar: "SP",
    title: "Aphid infestation on mustard crop",
    content: "My mustard crop is heavily infested with aphids. What organic methods can I use to control them without affecting honey bees?",
    category: "Pest Control",
    likes: 31,
    replies: 15,
    timeAgo: "1 day ago",
    isAnswered: false,
  },
  {
    id: 4,
    author: "MeenaDevi",
    avatar: "MD",
    title: "Government subsidy for solar pumps 2024",
    content: "Has anyone applied for the PM-KUSUM solar pump scheme? What documents are required and how long is the process?",
    category: "Subsidies",
    likes: 45,
    replies: 23,
    timeAgo: "2 days ago",
    isAnswered: true,
  },
];

const categories = ["All Topics", "Crop Advice", "Irrigation", "Pest Control", "Market", "Subsidies"];

const CommunityForum = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const filteredPosts = selectedCategory === "All Topics" 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  return (
    <section id="forum" className="section-padding bg-muted/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium uppercase tracking-wide text-sm">
              Community
            </span>
          </div>
          <h2 className="section-title mb-4">Farmer Q&A Forum</h2>
          <p className="section-subtitle mx-auto">
            Connect with fellow farmers, share knowledge, and get expert advice
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Forum Posts */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card-glass overflow-hidden"
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
                    {post.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-foreground">{post.author}</span>
                      <span className="text-muted-foreground text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.timeAgo}
                      </span>
                      <span className="px-2 py-0.5 bg-secondary/20 text-secondary text-xs rounded-full">
                        {post.category}
                      </span>
                      {post.isAnswered && (
                        <span className="px-2 py-0.5 bg-leaf/20 text-leaf text-xs rounded-full">
                          ✓ Answered
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    
                    <p className={`text-muted-foreground text-sm ${
                      expandedPost === post.id ? "" : "line-clamp-2"
                    }`}>
                      {post.content}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary text-sm transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary text-sm transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {post.replies} replies
                      </button>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground ml-auto transition-transform ${
                        expandedPost === post.id ? "rotate-180" : ""
                      }`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Reply Section */}
              {expandedPost === post.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="border-t border-border bg-muted/30 p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      className="flex-1 px-4 py-2 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                      Reply
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Ask Question Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
          >
            <MessageSquare className="w-5 h-5" />
            Ask the Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityForum;
