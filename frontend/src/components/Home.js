import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import northIndianFood from "../data/northfood";
import { FaHeart, FaStar } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]); // State to store saved favorites

  // Function to save a recipe as favorite
  const handleSaveFavorite = (food) => {
    if (favorites.some((fav) => fav.id === food.id)) {
      // Remove from favorites if already saved
      setFavorites(favorites.filter((fav) => fav.id !== food.id));
    } else {
      // Save the recipe to favorites
      setFavorites([...favorites, food]);
    }
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

  const styles = {
    homeContainer: { padding: "20px", backgroundColor: "#f8f9fa", textAlign: "center" },
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
    foodList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      justifyItems: "center",
      padding: "20px",
      width: "1300px",
      margin: "0 auto",
    },
    foodItem: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      position: "relative",
      cursor: "pointer",
    },
    favoriteIcon: {
      position: "absolute",
      top: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      color: "white",

    },
    foodImage: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      transition: "transform 0.5s ease",
      borderRadius: "10px",
    },
    foodInfo: { padding: "10px", textAlign: "center", backgroundColor: "#fff" },
    foodName: { fontSize: "1rem", fontWeight: "bold", color: "#333", marginTop: "0" },
    starRating: { color: "orange", margin: "5px 0" },
    starIcon: { marginRight: "3px" },
    foodDescription: { fontSize: "1rem", color: "#777", lineHeight: "1.5" },
    seeMoreBtn: {
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: "#ff8c00",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
  };

  return (
    <div style={styles.homeContainer}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>{headings[headingIndex]}</h1>
        <p style={styles.headerSubtitle}>Discover the best flavors of Food</p>
      </header>

      <div style={styles.foodList}>
        {displayedFood.map((food, index) => (
          <div key={index} style={styles.foodItem}>
            {/* Save (Heart) Button */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "pink",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              }}
              onClick={() => handleSaveFavorite(food)}
            >
              <FaHeart
                size={20}
                color={favorites.some((fav) => fav.id === food.id) ? "red" : "green"}
              />
            </div>

            {/* Food Details */}
            <Link
              to="/recipeinfo"
              state={{ food }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={food.image} alt={food.name} style={styles.foodImage} />
              <div style={styles.foodInfo}>
                <h3 style={styles.foodName}>{food.name}</h3>
                <div style={styles.starRating}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} style={styles.starIcon} />
                  ))}
                </div>
                <p style={styles.foodDescription}>{food.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button style={styles.seeMoreBtn} onClick={() => navigate("/allrecipes")}>
        See More
      </button>
    </div>
  );
};

export default Home;