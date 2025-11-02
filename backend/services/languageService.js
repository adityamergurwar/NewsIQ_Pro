const natural = require('natural');

exports.detectLanguage = (text) => {
  try {
    // Simple language detection based on character patterns
    
    // Check for common Hindi/Devanagari characters
    if (/[\u0900-\u097F]/.test(text)) {
      return 'Hindi';
    }
    
    // Check for Telugu characters
    if (/[\u0C00-\u0C7F]/.test(text)) {
      return 'Telugu';
    }
    
    // Check for Tamil characters
    if (/[\u0B80-\u0BFF]/.test(text)) {
      return 'Tamil';
    }
    
    // Check for Arabic characters
    if (/[\u0600-\u06FF]/.test(text)) {
      return 'Arabic';
    }
    
    // Check for Chinese characters
    if (/[\u4E00-\u9FFF]/.test(text)) {
      return 'Chinese';
    }
    
    // Check for Spanish common words
    const spanishWords = ['el', 'la', 'de', 'que', 'en', 'los', 'se', 'del', 'las', 'por'];
    const words = text.toLowerCase().split(/\s+/).slice(0, 100);
    const spanishCount = words.filter(word => spanishWords.includes(word)).length;
    if (spanishCount > 5) {
      return 'Spanish';
    }
    
    // Default to English
    return 'English';
    
  } catch (error) {
    return 'English';
  }
};