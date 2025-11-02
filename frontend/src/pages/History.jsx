// import React, { useState, useEffect } from "react";
// import { articleAPI } from "../services/api";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Clock, Search, ExternalLink, TrendingUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { format } from "date-fns";
// import SentimentBadge from "../components/analyze/SentimentBadge";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function History() {
//   const [articles, setArticles] = useState([]);
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadArticles();
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       const filtered = articles.filter(article =>
//         article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         article.summary.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredArticles(filtered);
//     } else {
//       setFilteredArticles(articles);
//     }
//   }, [searchQuery, articles]);

//   const loadArticles = async () => {
//     setIsLoading(true);
//     try {
//       const response = await articleAPI.getAllArticles();
//       if (response.success) {
//         setArticles(response.data);
//         setFilteredArticles(response.data);
//       }
//     } catch (error) {
//       console.error('Error loading articles:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getSentimentStats = () => {
//     const stats = {
//       positive: articles.filter(a => a.sentiment === "positive").length,
//       negative: articles.filter(a => a.sentiment === "negative").length,
//       neutral: articles.filter(a => a.sentiment === "neutral").length
//     };
//     return stats;
//   };

//   const stats = getSentimentStats();

//   return (
//     <div className="min-h-screen p-6 md:p-10">
//       <div className="max-w-6xl mx-auto space-y-8 py-8">
//         {/* ... rest of the History component code stays the same ... */}
//         {/* Copy from your existing History.jsx file */}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { articleAPI } from "../services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Search, ExternalLink, TrendingUp, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import SentimentBadge from "../components/analyze/SentimentBadge";
import { Skeleton } from "@/components/ui/skeleton";

export default function History() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchQuery, articles]);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const response = await articleAPI.getAllArticles();
      if (response.success) {
        // Sort by created_date (newest first)
        const sortedArticles = response.data.sort((a, b) => 
          new Date(b.created_date) - new Date(a.created_date)
        );
        setArticles(sortedArticles);
        setFilteredArticles(sortedArticles);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await articleAPI.deleteArticle(id);
      if (response.success) {
        // Remove from state
        setArticles(articles.filter(article => article.id !== id));
        setFilteredArticles(filteredArticles.filter(article => article.id !== id));
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article');
    } finally {
      setDeletingId(null);
    }
  };

  const getSentimentStats = () => {
    const stats = {
      positive: articles.filter(a => a.sentiment === "positive").length,
      negative: articles.filter(a => a.sentiment === "negative").length,
      neutral: articles.filter(a => a.sentiment === "neutral").length
    };
    return stats;
  };

  const stats = getSentimentStats();

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30">
      <div className="max-w-6xl mx-auto space-y-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Analysis History
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Review all your analyzed articles and insights
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Articles</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{articles.length}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Positive</p>
                    <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">{stats.positive}</p>
                  </div>
                  <span className="text-3xl">😊</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 border-red-200 dark:border-red-800/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Negative</p>
                    <p className="text-3xl font-bold text-red-700 dark:text-red-400 mt-1">{stats.negative}</p>
                  </div>
                  <span className="text-3xl">😞</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30 border-slate-200 dark:border-slate-800/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Neutral</p>
                    <p className="text-3xl font-bold text-slate-700 dark:text-slate-400 mt-1">{stats.neutral}</p>
                  </div>
                  <span className="text-3xl">😐</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-slate-800/60 backdrop-blur-sm dark:text-white"
            />
          </div>
        </motion.div>

        {/* Articles List */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {isLoading ? (
              // Loading Skeletons
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="bg-white dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4 bg-slate-200 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-full mb-2 bg-slate-200 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700" />
                  </CardContent>
                </Card>
              ))
            ) : filteredArticles.length === 0 ? (
              // Empty State
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-700/30 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {searchQuery ? "No matching articles found" : "No articles yet"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {searchQuery ? "Try a different search term" : "Start analyzing articles to see them here"}
                </p>
              </motion.div>
            ) : (
              // Articles
              filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight flex-1">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <a
                                href__={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex-shrink-0"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(article.id)}
                                disabled={deletingId === article.id}
                                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30"
                              >
                                {deletingId === article.id ? (
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-red-600/30 border-t-red-600 rounded-full"
                                  />
                                ) : (
                                  <Trash2 className="w-5 h-5" />
                                )}
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                            {article.summary}
                          </p>

                          <div className="flex flex-wrap gap-2 items-center">
                            <SentimentBadge 
                              sentiment={article.sentiment} 
                              score={article.sentiment_score} 
                            />
                            <Badge variant="outline" className="bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
                              {article.original_language}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                              <Clock className="w-4 h-4" />
                              {format(new Date(article.created_date), "MMM d, yyyy 'at' h:mm a")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}