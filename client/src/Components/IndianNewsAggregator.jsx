import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IndianNewsAggregator.css';

const IndianNewsAggregator = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchIndianNews = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/news/search/?q=india'
      );

      if (response.data && response.data.length > 0) {
        setArticles(response.data);
        setFilteredArticles(response.data);
        setErrorMessage('');
      } else {
        setArticles([]);
        setFilteredArticles([]);
        setErrorMessage('No articles available for India.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching news. Please try again later.');
    }
  };

  useEffect(() => {
    fetchIndianNews();
  }, []);

  const formatPublishedDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-IN', options);
  };

  const handleEmailShare = (title, url) => {
    const subject = encodeURIComponent(`Check out this article: ${title}`);
    const body = encodeURIComponent(`I found this article interesting:\n\n${title}\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = articles.filter(
      (article) =>
        article.title?.toLowerCase().includes(value.toLowerCase()) ||
        article.description?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredArticles(filtered);
  };

  return (
    <div className="body-div">
      <h1>Indian News Aggregator</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input2"
        />
      </div>

      {errorMessage && <p className="error-message2">{errorMessage}</p>}

      <div>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={index} className="article2">
              <h3>{article.title}</h3>
              {article.urlToImage && <img src={article.urlToImage} alt="Article" />}
              <p>{article.description}</p>
              <p className="published-date2">
                <strong>Published At:</strong> {formatPublishedDate(article.publishedAt)}
              </p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more2">
                Read more
              </a>
              <button
                onClick={() => handleEmailShare(article.title, article.url)}
                className="share-button2"
              >
                Share via Email
              </button>
            </div>
          ))
        ) : (
          !errorMessage && <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default IndianNewsAggregator;