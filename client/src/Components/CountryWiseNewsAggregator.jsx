import React, { useState, useEffect } from 'react';
import './CountryWiseNewsAggregator.css';

const API_BASE = import.meta.env.VITE_API_URL || "https://news-aggregator-backend-zwjl.onrender.com/api";

const CountryWiseNewsAggregator = () => {
    const [articles, setArticles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('All');
    const [loading, setLoading] = useState(true);

    const countries = [
        { name: 'All', code: '' },
        { name: 'India', code: 'in' },
        { name: 'United States', code: 'us' },
        { name: 'United Kingdom', code: 'gb' },
        { name: 'Australia', code: 'au' },
        { name: 'Canada', code: 'ca' },
        { name: 'Germany', code: 'de' },
        { name: 'France', code: 'fr' },
        { name: 'Japan', code: 'jp' },
        { name: 'China', code: 'cn' },
        { name: 'Russia', code: 'ru' },
        { name: 'Brazil', code: 'br' },
    ];

    const fetchNewsByCountry = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            let url;
            if (selectedCountry === 'All') {
                url = `${API_BASE}/news/`;
            } else {
                url = `${API_BASE}/news/search/?q=${selectedCountry}`;
            }

            console.log("Fetching:", url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log("Data received:", data);

            const articlesData = Array.isArray(data)? data : data.articles || [];

            if (articlesData.length > 0) {
                const filtered = articlesData.filter(a => a && a.urlToImage && a.url && a.title);
                setArticles(filtered.slice(0, 30));
                setErrorMessage('');
            } else {
                setArticles([]);
                setErrorMessage(`No articles found for ${selectedCountry}. Try All.`);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setErrorMessage("Error fetching news. Backend waking up... Wait 30 sec and refresh!");
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNewsByCountry();
    }, [selectedCountry]);

    const handleCountryChange = (e) => setSelectedCountry(e.target.value);

    if (loading) return <div className="loading" style={{padding: '50px', textAlign: 'center'}}>Loading news for {selectedCountry}...</div>;

    return (
        <div className="news-page1">
            <header className="header1">
                <h1 className="home-title1">Country Wise News</h1>
                <div className="search-bar1">
                    <select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className="search-input1"
                        style={{padding: '10px', fontSize: '16px'}}
                    >
                        {countries.map((country) => (
                            <option key={country.name} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            {errorMessage && <p className="error-message" style={{textAlign:'center', color:'red', margin:'20px'}}>{errorMessage}</p>}

            <div className="articles-container1">
                <div className="articles-grid1">
                    {articles.map((article, index) => (
                        <div className="article-card1" key={article.url || index}>
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="article-image1"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                            <div className="article-content1">
                                <h2 className="article-title1">{article.title || 'No Title'}</h2>
                                <p className="article-date1">
                                    {article.publishedAt? new Date(article.publishedAt).toLocaleDateString() : 'N/A'}
                                </p>
                                <p className="article-description1">
                                    {article.description? article.description.substring(0, 150) + '...' : 'No description'}
                                </p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more1">
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {articles.length === 0 &&!loading &&!errorMessage && (
                <p style={{textAlign:'center', marginTop:'50px'}}>No articles found. Select All or another country.</p>
            )}
        </div>
    );
};

export default CountryWiseNewsAggregator;