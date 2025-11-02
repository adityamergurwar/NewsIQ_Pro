import React, { useState } from "react";
import { articleAPI } from "../services/api";
import UrlInputForm from "../components/analyze/UrlInputForm";
import AnalysisResults from "../components/analyze/AnalysisResults";
import SentimentBadge from "../components/analyze/SentimentBadge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Analyze() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeArticle = async (url) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Analyzing:', url);
      const response = await articleAPI.analyzeArticle(url);
      
      if (response.success) {
        setResult(response.data);
        console.log('Analysis complete:', response.data);
      } else {
        setError(response.message || 'Failed to analyze article');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to analyze article. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
              News Summarizer & Sentiment Analyzer
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Get instant AI-powered summaries and sentiment analysis from any news article
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800">
                ✨ Web Scraping
              </div>
              <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold border border-emerald-200 dark:border-emerald-800">
                🎯 Sentiment Analysis
              </div>
              <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold border border-purple-200 dark:border-purple-800">
                🌐 Language Detection
              </div>
            </div>
          </motion.div>

          <UrlInputForm onAnalyze={analyzeArticle} isLoading={isLoading} />

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Alert variant="destructive" className="border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="text-rose-800 dark:text-rose-300 font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {result && <AnalysisResults result={result} />}
          </AnimatePresence>

          {!result && !error && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-16 space-y-6"
            >
              <div className="relative inline-block">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center shadow-lg">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl"
                  >
                    📰
                  </motion.div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Paste any news article URL above to get started
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}