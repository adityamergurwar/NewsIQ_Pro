const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// POST - Analyze new article
router.post('/analyze', articleController.analyzeArticle);

// GET - Get all articles
router.get('/', articleController.getAllArticles);

// GET - Get single article by ID
router.get('/:id', articleController.getArticleById);

// DELETE - Delete article
router.delete('/:id', articleController.deleteArticle);

module.exports = router;