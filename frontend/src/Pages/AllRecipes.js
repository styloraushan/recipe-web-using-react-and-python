import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const styles = {
  homeContainer: { padding: "20px", backgroundColor: "#f8f9fa" },
  header: { textAlign: "center", marginBottom: "30px" },
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
  foodInfo: { padding: "10px", textAlign: "center", backgroundColor: "#fff" },
  foodName: { fontSize: "1rem", fontWeight: "bold", color: "#333", marginTop: "0" },
  foodDescription: { fontSize: "1rem", color: "#777", lineHeight: "1.5" },
};

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/recipes/api/recipe-list");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div style={styles.homeContainer}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>All Recipes</h1>
        <p style={styles.headerSubtitle}>Discover the best flavors of Food</p>
      </header>

      {loading && <p>Loading recipes...</p>}
      {error && <p>Error: {error}</p>}

      <div style={styles.foodList}>
        {recipes.map((recipe, index) => (
          <Link
            key={index}
            to="/recipeinfo"
            state={{ recipe }} // Passing recipe details via state
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={styles.foodItem}>
              <div style={styles.favoriteIcon}>
                <FaHeart />
              </div>
              <img src={recipe.image} alt={recipe.name} style={styles.foodImage} />
              <div style={styles.foodInfo}>
                <h3 style={styles.foodName}>{recipe.name}</h3>
                <p style={styles.foodDescription}>{recipe.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
