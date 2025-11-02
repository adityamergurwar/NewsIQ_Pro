import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Link2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function UrlInputForm({ onAnalyze, isLoading }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    onAnalyze(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg shadow-blue-500/30">
              <Link2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Paste Article URL
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Enter any news article URL to get instant AI-powered insights
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Input
              type="text"
              placeholder="https://example.com/article..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              className="h-14 text-base border-slate-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg bg-white dark:bg-slate-800"
              disabled={isLoading}
            />
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-medium bg-rose-50 dark:bg-rose-950/30 px-4 py-2 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                />
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-3" />
                Analyze Article Now
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Supports all languages including Telugu, Hindi, English, and more
          </p>
        </div>
      </Card>
    </motion.div>
  );
}