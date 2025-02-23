import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa"; 
import "./Footer.css";

const Footer = () => {
  const [readMore, setReadMore] = useState(false);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="about-section">
          <h1 className="footer-title">Recipe Finder</h1>
          <h2 className="title">About</h2>

          <p>
            Founded in 1996, years before Google and the term blogger existed,
            RecipeLand.com™ was created to answer an elusive question faced by
            home cooks everywhere.
          </p>
          <div className="read-more">
            <img
              src="https://mpd-biblio-authors.imgix.net/563132.jpg?fit=crop&crop=faces&w=290&h=290"
              alt="Chefs"
              className="chef-img"
            />
            <p className="highlight-text">
              What recipes can I make with these ingredients?
            </p>
          </div>
          <button
            className="read-btn read-more-btn"
            onClick={toggleReadMore}
          >
            {readMore ? "Read less" : "Read more"}
          </button>
          {readMore && (
            <div className="extra-content">
              <p>
                At RecipeLand, we believe every ingredient has a story. Discover
                hidden secrets behind your favorite dishes and explore creative
                twists to classic recipes. Our community of passionate cooks is
                here to inspire your next culinary adventure.
                At RecipeLand, we believe every ingredient has a story. Discover
                hidden secrets behind your favorite dishes and explore creative
                twists to classic recipes. Our community of passionate cooks is
                here to inspire your next culinary adventure.
              </p>
            </div>
          )}
        </div>

        {/* Send Feedback Section */}
        <div className="feedback-section">
          <div className="footer-icons">
            <a href="/" className="icon-link">
              <FaHome className="footer-icon" /> Home
            </a>
            <a href="#" className="icon-link">
              <FaInfoCircle className="footer-icon" /> About
            </a>
            <a href="#" className="icon-link">
              <FaEnvelope className="footer-icon" /> Contact
            </a>
          </div>
          <h2 className="title">Send feedback</h2>
          <p>
            Tell us what you like, what you would like to see, bug reports, and
            support questions are all welcome!
          </p>
          <form className="feedback-form">
            <input
              type="email"
              placeholder="Your email"
              className="input-field"
            />
            <textarea
              placeholder="Your message"
              className="textarea-field"
            ></textarea>
            <button type="submit" className="send-btn">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>©2025 Infinite Food Recipes. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Ad Services</a>
          <a href="#">Privacy Policy</a>
          <a href="#">AdChoices</a>
          <a href="#">Legal</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
