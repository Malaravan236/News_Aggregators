import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { FaHome, FaSignInAlt, FaUserPlus, FaNewspaper } from 'react-icons/fa'; // Importing the icons
import './Home.css';

const HomePage = () => {
  const [email, setEmail] = useState("");

  // Function to handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/send-email", { email });
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  // Card data
  const cards = [
    { 
        title: 'Latest Tamil News', 
        copy: 'Stay updated with the latest headlines and breaking news from around the world.', 
        button: 'Read More',
        link: '/tamilnews' 
    },
    { 
        title: 'Sports', 
        copy: 'Catch up on the latest sports events, scores, and news from your favorite teams.', 
        button: 'Explore Sports',
        link: '/sports' 
    },
    { 
        title: 'Fun News', 
        copy: 'Enjoy quirky, lighthearted stories and trending entertainment news to brighten your day.', 
        button: 'Discover Fun News',
        link: '/fun'
    },
    { 
        title: 'Scientific News', 
        copy: 'Dive into the latest discoveries, innovations, and fascinating facts from the world of science.', 
        button: 'Learn More',
        link: '/science' 
    }
  ];

  // Card component
  const Card = ({ title, copy, button, link }) => (
    <div className="card">
      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="copy">{copy}</p>
        <Link to={link} className="btn">{button}</Link> 
      </div>
    </div>
  );

  return (
    <div>
      <div className="home-page">
        

        <div className="video-container">
  {/* Show video OR image, not both inside <video> */}
  
  {/* If you want to show an image instead of a video: */}
  <img className="background-video" src="/videos/news.jpg" alt="News" />

  {/* If you want to show a video: */}
  {/* <video className="background-video" autoPlay muted loop>
    <source src="/videos/news_video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video> */}
</div>


        {/* Cards Section */}
        <main className="page-content">
          {cards.map((card, index) => (
            <Card key={index} title={card.title} copy={card.copy} button={card.button} link={card.link} />
          ))}
        </main>
      </div>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-cta">
          <div className="single-cta">
            <i className="fas fa-phone-alt"></i>
            <div className="cta-text">
              <h4>Contact Us</h4>
              <span>+91 9994345123</span>
            </div>
          </div>
        </div>
        <div className="footer-content">
          <div className="footer-logo">
            <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-newspaper-icon-for-your-design-websites-and-projects-png-image_5206562.jpg" alt="Logo" />
          </div>
          
          <div className="footer-social-icon">
            <span>Follow us</span>
            <a href="https://www.facebook.com/" className="facebook-bg"><i className="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com/" className="twitter-bg"><i className="fab fa-twitter"></i></a>
            <a href="https://www.google.com/" className="google-bg"><i className="fab fa-google"></i></a>
          </div>
          
          <div className="subscribe-form">
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Enter the email to share the website Link"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit"><i className="fas fa-paper-plane"></i></button>
            </form>
          </div><br />
        </div>
        <div className="copyright-area">
          <div className="copyright-text">
            <p>&copy; 2024 <a href="#">Your Company</a>. All Rights Reserved.</p>
          </div>
          <ul className="footer-menu">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
