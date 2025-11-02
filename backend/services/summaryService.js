const compromise = require('compromise');
const natural = require('natural');
const tokenizer = new natural.SentenceTokenizer();

exports.generateSummary = (text) => {
  try {
    if (!text || text.length < 100) {
      return 'Content too short to summarize.';
    }

    // Split into sentences
    const sentences = tokenizer.tokenize(text);
    
    if (!sentences || sentences.length === 0) {
      return text.substring(0, 500) + '...';
    }

    // Score sentences based on:
    // 1. Length (prefer medium length)
    // 2. Position (prefer first few sentences)
    // 3. Keywords importance

    const doc = compromise(text);
    const keywords = doc.topics().out('array');
    
    const scoredSentences = sentences.map((sentence, index) => {
      let score = 0;
      
      // Position score (first sentences are important)
      if (index === 0) score += 3;
      else if (index === 1) score += 2;
      else if (index < 5) score += 1;
      
      // Length score (prefer medium length sentences)
      const wordCount = sentence.split(' ').length;
      if (wordCount >= 10 && wordCount <= 30) score += 2;
      else if (wordCount >= 5 && wordCount <= 50) score += 1;
      
      // Keyword score
      keywords.forEach(keyword => {
        if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
          score += 1;
        }
      });
      
      return { sentence, score, index };
    });

    // Sort by score and take top 3-5 sentences
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .sort((a, b) => a.index - b.index) // Restore original order
      .map(item => item.sentence);

    let summary = topSentences.join(' ');
    
    // Ensure summary is not too long
    if (summary.length > 600) {
      summary = summary.substring(0, 597) + '...';
    }
    
    return summary || 'Unable to generate summary.';

  } catch (error) {
    console.error('Summary generation error:', error);
    // Fallback: return first 500 characters
    return text.substring(0, 500) + '...';
  }
};