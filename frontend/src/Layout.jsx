import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, History, Info, Shield, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  {
    title: "Home",
    url: "/analyze",
    icon: Home,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Privacy",
    url: "/privacy",
    icon: Shield,
  },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30">
      <style>{`
        :root {
          --primary: 220 70% 50%;
          --primary-foreground: 0 0% 100%;
        }
        .dark {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
          --card: 222.2 84% 4.9%;
          --card-foreground: 210 40% 98%;
          --primary: 217 91% 60%;
          --primary-foreground: 222.2 47.4% 11.2%;
          --secondary: 217.2 32.6% 17.5%;
          --muted: 217.2 32.6% 17.5%;
          --border: 217.2 32.6% 17.5%;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Left Side */}
            <Link to="/analyze" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-105">
                  <rect width="48" height="48" rx="12" fill="url(#gradient1)"/>
                  <path d="M14 16C14 14.8954 14.8954 14 16 14H24C25.1046 14 26 14.8954 26 16V18H14V16Z" fill="white" fillOpacity="0.9"/>
                  <rect x="14" y="20" width="20" height="2" rx="1" fill="white" fillOpacity="0.7"/>
                  <rect x="14" y="24" width="16" height="2" rx="1" fill="white" fillOpacity="0.7"/>
                  <rect x="14" y="28" width="18" height="2" rx="1" fill="white" fillOpacity="0.7"/>
                  <circle cx="32" cy="32" r="8" fill="url(#gradient2)"/>
                  <path d="M32 28V32L35 34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="gradient1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B82F6"/>
                      <stop offset="1" stopColor="#1E40AF"/>
                    </linearGradient>
                    <linearGradient id="gradient2" x1="24" y1="24" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10B981"/>
                      <stop offset="1" stopColor="#059669"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                  NewsIQ Pro
                </span>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 leading-tight">
                  Analysis Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                      location.pathname === item.url
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side - Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 w-10 h-10"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </Button>

              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 w-10 h-10"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
            >
              <div className="px-4 py-3 space-y-1 max-w-7xl mx-auto">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      location.pathname === item.url
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link to="/analyze" className="flex items-center gap-3 mb-4">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="12" fill="url(#footerGradient1)"/>
                  <path d="M14 16C14 14.8954 14.8954 14 16 14H24C25.1046 14 26 14.8954 26 16V18H14V16Z" fill="white" fillOpacity="0.9"/>
                  <rect x="14" y="20" width="20" height="2" rx="1" fill="white" fillOpacity="0.7"/>
                  <rect x="14" y="24" width="16" height="2" rx="1" fill="white" fillOpacity="0.7"/>
                  <rect x="14" y="28" width="18" height="2" rx="1" fill="white" fillOpacity="0.7"/>
                  <circle cx="32" cy="32" r="8" fill="url(#footerGradient2)"/>
                  <path d="M32 28V32L35 34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="footerGradient1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B82F6"/>
                      <stop offset="1" stopColor="#1E40AF"/>
                    </linearGradient>
                    <linearGradient id="footerGradient2" x1="24" y1="24" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10B981"/>
                      <stop offset="1" stopColor="#059669"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">NewsIQ Pro</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Smart Analysis Platform</p>
                </div>
              </Link>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                A complete full-stack news analysis platform showcasing web scraping, NLP, and modern web development.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5">
                {navigationItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.url}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Features</h4>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  Web Scraping
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  Sentiment Analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  Text Summarization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  Language Detection
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">
                © 2024 NewsIQ Pro. College Project.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                <span>Built with</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">React + Node.js + Web Scraping</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}