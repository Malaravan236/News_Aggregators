import React, { useState, useEffect } from 'react';
import './CountryWiseNewsAggregator.css';

const StateWiseNewsAggregator = () => {
    const [articles, setArticles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('All');
    const countries = [
        { name: 'All', code: '' },
        { name: 'Argentina', code: 'ar' },
        { name: 'Australia', code: 'au' },
        { name: 'Austria', code: 'at' },
        { name: 'Belgium', code: 'be' },
        { name: 'Brazil', code: 'br' },
        { name: 'Bulgaria', code: 'bg' },
        { name: 'Canada', code: 'ca' },
        { name: 'China', code: 'cn' },
        { name: 'Colombia', code: 'co' },
        { name: 'Cuba', code: 'cu' },
        { name: 'Czech Republic', code: 'cz' },
        { name: 'Egypt', code: 'eg' },
        { name: 'France', code: 'fr' },
        { name: 'Germany', code: 'de' },
        { name: 'Greece', code: 'gr' },
        { name: 'Hong Kong', code: 'hk' },
        { name: 'Hungary', code: 'hu' },
        { name: 'India', code: 'in' },
        { name: 'Indonesia', code: 'id' },
        { name: 'Ireland', code: 'ie' },
        { name: 'Israel', code: 'il' },
        { name: 'Italy', code: 'it' },
        { name: 'Japan', code: 'jp' },
        { name: 'Latvia', code: 'lv' },
        { name: 'Lithuania', code: 'lt' },
        { name: 'Malaysia', code: 'my' },
        { name: 'Mexico', code: 'mx' },
        { name: 'Morocco', code: 'ma' },
        { name: 'Netherlands', code: 'nl' },
        { name: 'New Zealand', code: 'nz' },
        { name: 'Nigeria', code: 'ng' },
        { name: 'Norway', code: 'no' },
        { name: 'Philippines', code: 'ph' },
        { name: 'Poland', code: 'pl' },
        { name: 'Portugal', code: 'pt' },
        { name: 'Romania', code: 'ro' },
        { name: 'Russia', code: 'ru' },
        { name: 'Saudi Arabia', code: 'sa' },
        { name: 'Serbia', code: 'rs' },
        { name: 'Singapore', code: 'sg' },
        { name: 'Slovakia', code: 'sk' },
        { name: 'Slovenia', code: 'si' },
        { name: 'South Africa', code: 'za' },
        { name: 'South Korea', code: 'kr' },
        { name: 'Sweden', code: 'se' },
        { name: 'Switzerland', code: 'ch' },
        { name: 'Taiwan', code: 'tw' },
        { name: 'Thailand', code: 'th' },
        { name: 'Turkey', code: 'tr' },
        { name: 'UAE', code: 'ae' },
        { name: 'Ukraine', code: 'ua' },
        { name: 'United Kingdom', code: 'gb' },
        { name: 'United States', code: 'us' },
        { name: 'Venezuela', code: 've' }
    ];
    


    const fetchNewsByCountry = async () => {
        const accessKey = 'fa6ffa113a93371e4cff166555c5dd0d'; // Replace with your MediaStack API key
        const countryCode = countries.find(country => country.name === selectedCountry).code;
        const url = `https://newsapi.org/v2/everything?q=${selectedCountry}&apiKey=3ab53a4e5310424dbe67f46551b27c21`; // Updated to 'everything' endpoint

        try {
            const response = await fetch(url);
            const data = await response.json();

            // if (data.articles && data.articles.length > 0) {
            //     setArticles(data.articles); // Corrected to access 'data.articles'
            //     setErrorMessage('');
            // } else {
            //     setArticles([]);
            //     setErrorMessage(`No articles available for ${selectedCountry}.`);
            // }

            if (data.articles && data.articles.length > 0) {
                const filteredArticles = data.articles.filter(
                    (article) => article.urlToImage && article.url
                );
                setArticles(filteredArticles);
                setErrorMessage('');
            } else {
                setArticles([]);
                setErrorMessage(`No articles available for ${selectedCountry}.`);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setErrorMessage("An error occurred while fetching news. Please try again later.");
        }
    };

    useEffect(() => {
        fetchNewsByCountry();
    }, [selectedCountry]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleShare = (url) => {
        if (navigator.share) {
            navigator.share({
                title: 'Check out this article',
                url: url
            }).catch(err => console.error("Error sharing:", err));
        } else {
            alert("Share feature is not supported in your browser.");
        }
    };

    return (
        <div className="news-page1">
            <header className="header1">
                <h1 className="home-title1">News by Country</h1>
                <div className="search-bar1">
                    <label htmlFor="country-select" className="country-label">Select Country:</label>
                    <select id="country-select" value={selectedCountry} onChange={handleCountryChange} className="search-input1">
                        {countries.map((country, index) => (
                            <option key={index} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="articles-container1">
                <div className="articles-grid1">
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <div key={index} className="article-card1">
                                {article.urlToImage && (
                                    <img src={article.urlToImage} alt="Article" className="article-image1" />
                                )}
                                <div className="article-content1">
                                    <h3 className="article-title1">{article.title}</h3>
                                    <p className="article-date1">
                                        <strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}
                                    </p>
                                    <p className="article-description1">{article.description}</p>
                                    <a className="read-more1" href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                                    <button className="voice-search-button1" onClick={() => handleShare(article.url)}>Share</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        !errorMessage && <p>No articles found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StateWiseNewsAggregator;
