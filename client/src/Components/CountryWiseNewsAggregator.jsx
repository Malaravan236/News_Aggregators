import React, { useState, useEffect } from 'react';
import './CountryWiseNewsAggregator.css';

const API_BASE = "https://news-aggregator-backend-zwjl.onrender.com/api";

const StateWiseNewsAggregator = () => {
    const [articles, setArticles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('All');

    const countries = [
        { name: 'All', code: '' },
        { name: 'India', code: 'in' },
        { name: 'United States', code: 'us' },
        //... matha countries same da
    ];

    const fetchNewsByCountry = async () => {
        try {
            // Backend ah use pannu da - API key safe ah irukkum da!
            let url;
            if (selectedCountry === 'All') {
                url = `${API_BASE}/news/`;
            } else {
                // Backend la search endpoint use pannu da
                url = `${API_BASE}/news/search/?q=${selectedCountry}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            // Backend array return pannum la?
            const articlesData = Array.isArray(data)? data : data.articles || [];

            if (articlesData.length > 0) {
                const filtered = articlesData.filter(a => a.urlToImage && a.url);
                setArticles(filtered);
                setErrorMessage('');
            } else {
                setArticles([]);
                setErrorMessage(`No articles for ${selectedCountry}`);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error fetching news");
        }
    };

    useEffect(() => { fetchNewsByCountry(); }, [selectedCountry]);

    const handleCountryChange = (e) => setSelectedCountry(e.target.value);

    //... rest same da
}
export default StateWiseNewsAggregator;