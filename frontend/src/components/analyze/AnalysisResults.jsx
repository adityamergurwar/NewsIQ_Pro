import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Globe, BookOpen, Sparkles, ExternalLink, Download } from "lucide-react";
import { motion } from "framer-motion";
import SentimentBadge from "./SentimentBadge";

export default function AnalysisResults({ result }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${result.title}\n\n${result.summary}\n\nSentiment: ${result.sentiment}\nLanguage: ${result.original_language}\n\nSource: ${result.url}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const content = `
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
                line-height: 1.6;
                color: #1e293b;
              }
              .header {
                text-align: center;
                margin-bottom: 40px;
                padding-bottom: 20px;
                border-bottom: 3px solid #3b82f6;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: #3b82f6;
                margin-bottom: 10px;
              }
              .title {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #0f172a;
              }
              .meta {
                display: flex;
                gap: 20px;
                margin-bottom: 30px;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
              }
              .meta-item {
                flex: 1;
              }
              .meta-label {
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
                margin-bottom: 5px;
              }
              .meta-value {
                font-weight: bold;
                color: #0f172a;
              }
              .sentiment-positive { color: #10b981; }
              .sentiment-negative { color: #ef4444; }
              .sentiment-neutral { color: #64748b; }
              .summary {
                margin-top: 30px;
                padding: 20px;
                background: #f8fafc;
                border-left: 4px solid #3b82f6;
                border-radius: 4px;
              }
              .summary-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 15px;
                color: #0f172a;
              }
              .summary-text {
                font-size: 14px;
                line-height: 1.8;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 2px solid #e2e8f0;
                text-align: center;
                font-size: 12px;
                color: #64748b;
              }
              .url {
                color: #3b82f6;
                word-break: break-all;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">📰 NewsIQ Pro</div>
              <div>News Summarizer & Sentiment Analyzer</div>
            </div>
            
            <div class="title">${result.title}</div>
            
            <div class="meta">
              <div class="meta-item">
                <div class="meta-label">Sentiment</div>
                <div class="meta-value sentiment-${result.sentiment}">
                  ${result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                  ${result.sentiment_score ? ` (${Math.round(result.sentiment_score * 100)}%)` : ''}
                </div>
              </div>
              <div class="meta-item">
                <div class="meta-label">Language</div>
                <div class="meta-value">${result.original_language}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">Date</div>
                <div class="meta-value">${new Date().toLocaleDateString()}</div>
              </div>
            </div>
            
            <div class="summary">
              <div class="summary-title">📋 Summary</div>
              <div class="summary-text">${result.summary}</div>
            </div>
            
            ${result.translated_text ? `
              <div class="summary" style="border-left-color: #8b5cf6; margin-top: 20px;">
                <div class="summary-title">🌐 Translation Note</div>
                <div class="summary-text">
                  This article was originally in ${result.original_language} and has been automatically translated to English for analysis.
                </div>
              </div>
            ` : ''}
            
            <div class="footer">
              <div style="margin-bottom: 10px;"><strong>Source URL:</strong></div>
              <div class="url">${result.url}</div>
              <div style="margin-top: 20px;">Generated by NewsIQ Pro • ${new Date().toLocaleString()}</div>
            </div>
          </body>
        </html>
      `;

      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `news-summary-${Date.now()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading:", error);
    }
    setDownloading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Analysis Complete
            </h3>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        <CardContent className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              {result.title}
            </h2>
            <div className="flex flex-wrap gap-3 items-center">
              <SentimentBadge sentiment={result.sentiment} score={result.sentiment_score} />
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-semibold">{result.original_language}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Summary</h3>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {result.summary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="h-12 font-semibold border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2 text-emerald-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Summary
                </>
              )}
            </Button>
            <Button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="h-12 font-semibold bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
            >
              {downloading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result.translated_text && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                    🌐 Translation Applied
                  </h4>
                  <p className="text-blue-800 dark:text-blue-400 text-sm leading-relaxed">
                    This article was originally in <strong>{result.original_language}</strong> and has been automatically translated to English for comprehensive analysis and summarization.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}