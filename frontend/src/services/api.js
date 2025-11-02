import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articleAPI = {
  // Analyze article
  analyzeArticle: async (url) => {
    const response = await api.post('/articles/analyze', { url });
    return response.data;
  },

  // Get all articles
  getAllArticles: async () => {
    const response = await api.get('/articles');
    return response.data;
  },

  // Get single article
  getArticleById: async (id) => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  // Delete article
  deleteArticle: async (id) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },
};

export default api;