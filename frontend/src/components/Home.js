import React, { useState, useEffect } from "react";
import northIndianFood from "../data/northfood";
import { FaHeart, FaStar } from "react-icons/fa";

const Home = () => {
  // Display only the first 8 items initially
  const [displayedFood] = useState(northIndianFood.slice(0, 8));

  // Inline style objects for easy maintenance
  const headings = [
    "Welcome to Recipe Finder",
    "Discover Amazing Recipes",
    "Cook with Passion",
    "Your Culinary Journey Begins",
    "Taste the Tradition"
  ];

  // State to hold current heading index
  const [headingIndex, setHeadingIndex] = useState(0);

  // Change heading text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingIndex((prevIndex) => (prevIndex + 1) % headings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [headings.length]);
  const styles = {
    homeContainer: {
      padding: "20px",
      backgroundColor: "#f8f9fa",
    
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    headerTitle: {
      fontSize: "3rem",
      fontWeight: "bold",
      color: "#333",
      background: "linear-gradient(45deg, #333, #ff8c00, #008080)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    headerSubtitle: {
      fontSize: "1.2rem",
      color: "#555",
    },
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
    },
    favoriteIcon: {
      position: "absolute",
      top: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "pink",
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
    foodInfo: {
      padding: "10px",
      textAlign: "center",
      backgroundColor: "#fff",
    },
    foodName: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#333",
      marginTop: "0",
    },
    starRating: {
      color: "orange",
      margin: "5px 0",
    },
    starIcon: {
      marginRight: "3px",
    },
    foodDescription: {
      fontSize: "1rem",
      color: "#777",
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.homeContainer}>
      {/* Header Section */}
      <header style={styles.header}>
      <h1 style={styles.headerTitle}>{headings[headingIndex]}</h1>
        <p style={styles.headerSubtitle}>Discover the best flavors of Food</p>
      </header>

      {/* Food Items Display */}
      <div style={styles.foodList}>
        {displayedFood.map((food, index) => (
          <div key={index} style={styles.foodItem}>
            {/* Favorite Heart Icon */}
            <div style={styles.favoriteIcon}>
              <FaHeart />
            </div>

            {/* Food Image */}
            <img src={food.image} alt={food.name} style={styles.foodImage} />

            {/* Food Info */}
            <div style={styles.foodInfo}>
              <h3 style={styles.foodName}>{food.name}</h3>

              {/* Star Rating */}
              <div style={styles.starRating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} style={styles.starIcon} />
                ))}
              </div>

              <p style={styles.foodDescription}>{food.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
