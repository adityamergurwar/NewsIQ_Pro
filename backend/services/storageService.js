//json file storage

const fs = require('fs');
const path = require('path');

const articlesFile = path.join(__dirname, '../data/articles.json');

// Read articles from file
const readArticles = () => {
  try {
    const data = fs.readFileSync(articlesFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write articles to file
const writeArticles = (articles) => {
  try {
    fs.writeFileSync(articlesFile, JSON.stringify(articles, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to file:', error);
    return false;
  }
};

// Save new article
exports.saveArticle = (article) => {
  const articles = readArticles();
  articles.unshift(article); // Add to beginning
  writeArticles(articles);
  return article;
};

// Get all articles
exports.getAllArticles = () => {
  return readArticles();
};

// Get article by ID
exports.getArticleById = (id) => {
  const articles = readArticles();
  return articles.find(article => article.id === id);
};

// Delete article
exports.deleteArticle = (id) => {
  let articles = readArticles();
  const initialLength = articles.length;
  articles = articles.filter(article => article.id !== id);
  
  if (articles.length < initialLength) {
    writeArticles(articles);
    return true;
  }
  return false;
};