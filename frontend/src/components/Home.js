
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import northIndianFood from "../data/northfood";
import { FaHeart, FaStar } from "react-icons/fa";
import "./Home.css"; 

const styles = {

  header: { marginBottom: "30px" },
  headerTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#333",
    background: "linear-gradient(45deg, #333, #ff8c00, #008080)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  headerSubtitle: { fontSize: "1.2rem", color: "#555" },

};


const Home = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const handleSaveFavorite = (food) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === food.id)
        ? prevFavorites.filter((fav) => fav.id !== food.id)
        : [...prevFavorites, food]
    );
  };

  const [displayedFood] = useState(northIndianFood.slice(0, 8));

  const headings = [
    "Welcome to Recipe Finder",
    "Discover Amazing Recipes",
    "Cook with Passion",
    "Your Culinary Journey Begins",
    "Taste the Tradition",
  ];

  const [headingIndex, setHeadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingIndex((prevIndex) => (prevIndex + 1) % headings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [headings.length]);

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="header-titles">{headings[headingIndex]}</h1>
        <p className="header-subtitle">Discover the best flavors of Food</p>
      </header>

      <div className="food-list">
        {displayedFood.map((food, index) => (
          <div key={index} className="food-item">
            {/* Save (Heart) Button */}
            <div className="save-button" onClick={() => handleSaveFavorite(food)}>
              <FaHeart size={20} color={favorites.some((fav) => fav.id === food.id) ? "red" : "green"} />
            </div>

            {/* Food Details */}
            <Link to="/recipeinfo" state={{ food }} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={food.image} alt={food.name} className="food-image" />
              <div className="food-info">
                <h3 className="food-name">{food.name}</h3>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <p className="food-description">{food.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button className="see-more-btn" onClick={() => navigate("/allrecipes")}>
        See More
      </button>
    </div>
  );
};

export default Home;
