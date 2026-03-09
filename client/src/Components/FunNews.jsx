// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './FunNews.css';

// const TeslaNews = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const apiKey = '0bc9d2df52d941e1b435a34c631cb970'; // Replace with your actual API key
//   const query = 'tesla';
//   const baseUrl = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`;

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await axios.get(baseUrl);
//         if (response.data.articles && response.data.articles.length > 0) {
//           // Filter articles to only include those with images
//           const articlesWithImages = response.data.articles.filter(
//             (article) => article.urlToImage
//           );
//           setArticles(articlesWithImages);
//         } else {
//           setError('No articles available.');
//         }
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch Tesla news articles. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, [baseUrl]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="tesla-news-page4">
//       <h1>Tesla News</h1>
//       <div className="articles-container4">
//         {articles.map((article) => (
//           <div key={article.url} className="article-card4">
//             <img src={article.urlToImage} alt={article.title} className="article-image4" />
//             <h2 className="article-title4">{article.title}</h2>
//             <p className="article-date4">Published: {new Date(article.publishedAt).toDateString()}</p>
//             <p className="article-description4">{article.description}</p>
//             <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more4">Read more</a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeslaNews;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TamilNews.css'; // Reuse TamilNews styles or create a new CSS file if needed

const SportsNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('tesla');

  const apiKey = '0bc9d2df52d941e1b435a34c631cb970'; // Replace with your API key
  const baseUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');
      setArticles([]); // Clear articles to avoid showing old ones

      try {
        const response = await axios.get(baseUrl);
        if (response.data.articles && response.data.articles.length > 0) {
          // Filter to only include articles that have an image
          const filteredArticles = response.data.articles.filter(article => article.urlToImage);
          if (filteredArticles.length > 0) {
            setArticles(filteredArticles);
          } else {
            setError('No articles with images available.');
          }
        } else {
          setError('No articles available.');
        }
      } catch (err) {
        setError('Failed to fetch sports news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value;
    if (searchQuery) {
      setQuery(searchQuery);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="news-page1">
      <header className="header1">
        <h1 className="home-title1">Tesla News</h1>

        <form className="search-bar1" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search for sports news..."
            className="search-input1"
          />
        </form>
      </header>

      <div className="articles-container3">
        <div className="articles-grid3">
          {articles.map((article) => (
            <div key={article.url} className="article-card3">
              <img src={article.urlToImage} alt={article.title} className="article-image3" />
              <div className="article-content3">
                <h2 className="article-title3">{article.title}</h2>
                <p className="article-date3">Published: {new Date(article.publishedAt).toDateString()}</p>
                <p className="article-description3">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more3">Read more</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsNews;
