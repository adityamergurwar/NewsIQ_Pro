const scraperService = require('../services/scraperService');
const sentimentService = require('../services/sentimentService');
const summaryService = require('../services/summaryService');
const languageService = require('../services/languageService');
const storageService = require('../services/storageService');

// Analyze Article
exports.analyzeArticle = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required'
      });
    }

    console.log(`\n Analyzing article: ${url}`);

    // Step 1: Scrape article content
    console.log(' Step 1: Scraping content...');
    const scrapedData = await scraperService.scrapeArticle(url);

    // Step 2: Detect language
    console.log(' Step 2: Detecting language...');
    const language = languageService.detectLanguage(scrapedData.content);

    // Step 3: Generate summary
    console.log(' Step 3: Generating summary...');
    const summary = summaryService.generateSummary(scrapedData.content);

    // Step 4: Analyze sentiment
    console.log(' Step 4: Analyzing sentiment...');
    const sentimentResult = sentimentService.analyzeSentiment(scrapedData.content);

    // Create article object
    const article = {
      id: Date.now().toString(),
      url: url,
      title: scrapedData.title,
      original_language: language,
      summary: summary,
      sentiment: sentimentResult.sentiment,
      sentiment_score: sentimentResult.score,
      original_text: scrapedData.content.substring(0, 2000), // First 2000 chars
      translated_text: language !== 'English' ? 'Translation not available in offline mode' : null,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
      created_by: 'user@newsiq.com'
    };

    // Save to storage
    console.log(' Step 5: Saving to database...');
    storageService.saveArticle(article);

    console.log(' Analysis complete!\n');

    res.status(200).json({
      success: true,
      message: 'Article analyzed successfully',
      data: article
    });

  } catch (error) {
    console.error(' Error analyzing article:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to analyze article'
    });
  }
};

// Get All Articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = storageService.getAllArticles();
    
    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Article by ID
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = storageService.getArticleById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = storageService.deleteArticle(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
