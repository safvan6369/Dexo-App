import React, { useState, useEffect } from 'react';
import './Quote.css';
import { motivationalQuotes } from '../data/Quote.js'; // Import your local quotes

const Quote = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });

  // Function to get a random quote from the local array
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  // Set initial quote when component mounts
  useEffect(() => {
    setQuote(getRandomQuote());
  }, []); // Empty dependency array means this runs once on mount

  // Function to change the quote when the button is clicked
  const changeQuote = () => {
    setQuote(getRandomQuote());
  };

  return (
    <div className="quote-container">
      <h3>Quote of the Day</h3>
      <blockquote>
        <p>"{quote.content}"</p>
        <footer>— {quote.author}</footer>
      </blockquote>
      <button onClick={changeQuote}>New Quote</button>
    </div>
  );
};

export default Quote;