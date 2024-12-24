import React, { useState } from 'react';
// import axios from 'axios';

const SentimentAnalysis = () => {
  // State to hold user input and API response
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Your Perspective API key
  const API_KEY = 'AIzaSyDWHZ9t_Mc7efOrXtvpC7qhmUSvH7yMRjA';

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults(null); // Reset results on new submission
    setError(''); // Clear any previous errors

    // Check if text is empty
    if (!text.trim()) {
      setError('Please enter some text.');
      return;
    }

    try {
      const response = await axios.post(
        'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze',
        {
          comment: { text },
          languages: ['en'],
          requestedAttributes: {
            TOXICITY: {},
            SEVERE_TOXICITY: {},
            INSULT: {},
            PROFANITY: {},
            THREAT: {},
            POSITIVE: {},
          },
        },
        { params: { key: API_KEY } }
      );

      const attributeScores = response.data.attributeScores;
      const scores = Object.keys(attributeScores).reduce((acc, key) => {
        acc[key] = attributeScores[key].summaryScore.value;
        return acc;
      }, {});
      
      setResults(scores);
    } catch (err) {
      setError('Error analyzing text. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Sentiment Analysis Tool</h1>
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze..."
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Analyze Sentiment
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500 font-semibold">
          {error}
        </div>
      )}

      {results && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-2">Sentiment Analysis Results:</h2>
          <ul className="list-disc pl-6">
            {Object.entries(results).map(([attribute, score]) => (
              <li key={attribute}>
                <strong>{attribute}:</strong> {score.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;
