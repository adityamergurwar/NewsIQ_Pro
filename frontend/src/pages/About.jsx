import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Zap, Globe, Shield, TrendingUp, Users, Code, Database, Brain } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Code,
    title: "Web Scraping Technology",
    description: "Advanced web scraping using Cheerio and Axios to extract article content from any news website with intelligent fallback mechanisms.",
    gradient: "from-blue-500 to-sky-600"
  },
  {
    icon: Brain,
    title: "Smart Summarization",
    description: "Natural language processing algorithms analyze and condense articles into concise 3-5 sentence summaries using compromise and natural libraries.",
    gradient: "from-sky-500 to-cyan-600"
  },
  {
    icon: TrendingUp,
    title: "Sentiment Analysis",
    description: "Accurate sentiment detection using advanced algorithms that calculate positive, negative, or neutral tone with confidence scores.",
    gradient: "from-teal-500 to-emerald-600"
  },
  {
    icon: Globe,
    title: "Language Detection",
    description: "Automatically identifies article language including English, Telugu, Hindi, Tamil, Arabic, Chinese, Spanish and many more.",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    icon: Database,
    title: "Local Storage",
    description: "All analyzed articles are stored locally in JSON format with full CRUD operations - no external database required.",
    gradient: "from-green-500 to-lime-600"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized scraping and analysis pipeline delivers comprehensive results in 5-10 seconds with minimal resource usage.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Everything runs locally on your machine. No data is sent to external APIs or third-party services.",
    gradient: "from-rose-500 to-red-600"
  },
  {
    icon: Users,
    title: "History Tracking",
    description: "Access all past analyses with powerful search functionality, statistics dashboard, and export capabilities.",
    gradient: "from-slate-500 to-gray-600"
  }
];

const techStack = [
  {
    category: "Frontend",
    technologies: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "React Router",
      "Shadcn/ui Components"
    ]
  },
  {
    category: "Backend",
    technologies: [
      "Node.js",
      "Express.js",
      "RESTful API",
      "JSON File Storage",
      "CORS Middleware"
    ]
  },
  {
    category: "Web Scraping",
    technologies: [
      "Axios (HTTP Client)",
      "Cheerio (HTML Parser)",
      "Multiple CSS Selectors",
      "Error Handling"
    ]
  },
  {
    category: "NLP & Analysis",
    technologies: [
      "Sentiment Library",
      "Compromise.js",
      "Natural Library",
      "Text Tokenization"
    ]
  }
];

export default function About() {
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30">
      <div className="max-w-6xl mx-auto space-y-12 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            About NewsIQ Pro
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            A complete full-stack news analysis platform built with modern web technologies and manual web scraping
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-950/20 border-slate-200 dark:border-slate-800 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  NewsIQ Pro is a college project demonstrating full-stack development capabilities. 
                  Built entirely from scratch without external AI APIs, this platform showcases web scraping, 
                  natural language processing, sentiment analysis, and modern web development practices. 
                  Every line of code is written manually to understand the complete software development lifecycle 
                  from frontend UI to backend data processing.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8"
          >
            Powerful Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((stack, index) => (
              <Card key={stack.category} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                How It Works
              </h2>
              <div className="space-y-4">
                {[
                  { step: "1", text: "User submits news article URL through React frontend" },
                  { step: "2", text: "Backend receives request via Express.js REST API" },
                  { step: "3", text: "Axios fetches HTML content from the URL" },
                  { step: "4", text: "Cheerio parses HTML and extracts article content" },
                  { step: "5", text: "Language detection identifies source language" },
                  { step: "6", text: "NLP algorithms generate concise summary" },
                  { step: "7", text: "Sentiment analysis determines article tone" },
                  { step: "8", text: "Results stored in JSON file database" },
                  { step: "9", text: "Frontend displays results with animations" }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 pt-2">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 border-0 shadow-2xl">
            <CardContent className="p-8 md:p-12 text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                College Project Showcase
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                This project demonstrates complete full-stack development skills including 
                web scraping, API design, natural language processing, and modern UI/UX implementation. 
                Built without external AI APIs to showcase pure coding abilities.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}