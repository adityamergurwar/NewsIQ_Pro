//web scraping

const axios = require('axios');
const cheerio = require('cheerio');

exports.scrapeArticle = async (url) => {
  try {
    // Fetch HTML content
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 15000,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, nav, header, footer, iframe, noscript').remove();

    // Extract title
    let title = 
      $('h1').first().text().trim() ||
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text().trim() ||
      'Untitled Article';

    // Extract content - try multiple selectors
    let content = '';
    
    const contentSelectors = [
      'article',
      '[role="main"]',
      '.article-content',
      '.post-content',
      '.entry-content',
      '.content',
      'main',
      '#content',
    ];

    for (const selector of contentSelectors) {
      const text = $(selector).text().trim();
      if (text.length > content.length) {
        content = text;
      }
    }

    // Fallback: extract all paragraphs
    if (content.length < 200) {
      content = $('p')
        .map((i, el) => $(el).text().trim())
        .get()
        .filter(text => text.length > 50)
        .join('\n\n');
    }

    // Clean content
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    if (!content || content.length < 100) {
      throw new Error('Could not extract article content. The article may be behind a paywall or have unusual formatting.');
    }

    return {
      title: title,
      content: content,
      url: url
    };

  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      throw new Error('Unable to reach the URL. Please check your internet connection and the URL.');
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Request timed out. The website is taking too long to respond.');
    } else if (error.response && error.response.status === 404) {
      throw new Error('Article not found (404). Please check the URL.');
    } else if (error.response && error.response.status === 403) {
      throw new Error('Access forbidden (403). The website is blocking our scraper.');
    } else {
      throw new Error(error.message || 'Failed to scrape article');
    }
  }
};