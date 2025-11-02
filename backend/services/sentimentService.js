const Sentiment = require('sentiment');
const sentiment = new Sentiment();

exports.analyzeSentiment = (text) => {
  try {
    // Analyze sentiment using the 'sentiment' library
    const result = sentiment.analyze(text);
    
    // Calculate sentiment
    let sentimentLabel = 'neutral';
    let normalizedScore = 0.5; // Default neutral

    if (result.score > 0) {
      sentimentLabel = 'positive';
      // Normalize score to 0-1 range
      normalizedScore = Math.min(0.5 + (result.score / 20), 1.0);
    } else if (result.score < 0) {
      sentimentLabel = 'negative';
      // Normalize score to 0-1 range
      normalizedScore = Math.max(0.5 + (result.score / 20), 0.0);
    } else {
      normalizedScore = 0.5;
    }

    return {
      sentiment: sentimentLabel,
      score: parseFloat(normalizedScore.toFixed(2)),
      rawScore: result.score,
      positive: result.positive,
      negative: result.negative
    };

  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return {
      sentiment: 'neutral',
      score: 0.5,
      rawScore: 0,
      positive: [],
      negative: []
    };
  }
};