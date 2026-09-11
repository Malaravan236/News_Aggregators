import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || ''
  );
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get('http://127.0.0.1:8000/api/news/');
      setArticles(response.data || []);
    } catch (err) {
      setError('Failed to fetch news articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Sorry, your browser does not support voice search. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      fetchArticlesBySearch(transcript);
    };

    recognition.onerror = (event) => {
      alert(`Speech recognition error: ${event.error}`);
    };

    recognition.start();
  };

  const fetchArticlesBySearch = async (query) => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(
        `http://127.0.0.1:8000/api/news/search/?q=${query}`
      );
      setArticles(response.data || []);
    } catch (err) {
      setError('Failed to fetch news articles for this search query.');
    } finally {
      setLoading(false);
    }
  };




  const handleSearchButtonClick = async () => {
    if (!searchQuery.trim()) {
      fetchArticles();
      return;
    }
    fetchArticlesBySearch(searchQuery);
  };

  const handleShare = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch (error) {
        setError('Failed to share the article.');
      }
    } else {
      alert('Sorry, your browser does not support sharing. Please use a compatible browser.');
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article?.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      article.urlToImage &&
      article.url
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="news-page1">
      <header className="header1">
        <h1 className="welcome-user">Welcome, {userName} 👋</h1>

        <h1 className="home-title1"> Latest News </h1>


        <div className="search-bar1">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input1"
          />
          <button onClick={handleSearchButtonClick} className="search-button1">
            Search
          </button>
          <button onClick={handleVoiceSearch} className="voice-search-button1">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjk2otzVUKiNvwaTLPW0ZvfjFWRHjHbd0oXt7_iORxha_2RFIfLZc87Z1eoKHpky1xfeA&usqp=CAU"
              alt="Voice Search"
            />
          </button>
        </div>
      </header>

      <div className="articles-container1">
        <div className="articles-grid1">
          {filteredArticles.map((article) => (
            <div className="article-card1" key={article.url}>
              <img
                src={article.urlToImage}
                alt={article.title}
                className="article-image1"
              />
              <div className="article-content1">
                <h2 className="article-title1">{article.title || 'No Title Available'}</h2>
                <p className="article-date1">
                  Published:{' '}
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'N/A'}{' '}
                  {article.publishedAt
                    ? `at ${new Date(article.publishedAt).toLocaleTimeString()}`
                    : ''}
                </p>
                <p className="article-description1">
                  {article.description || 'No description available.'}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more1"
                >
                  Read More
                </a>
                <br />
                <a
                  href="/#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShare(article);
                  }}
                  className="share-button1"
                >
                  Share Article
                </a>

                <a
  href="/#"
  onClick={(e) => {
    e.preventDefault();
    handleShare(article);
  }}
  className="share-button1"
>
  Share Article
</a>

<br />


              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;