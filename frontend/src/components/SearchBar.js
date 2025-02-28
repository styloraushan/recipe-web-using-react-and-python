import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link import
import "./SearchBar.css";
import "./Home.css";
import Navbar from "./Navbar";
import { FaSearch, FaHeart, FaStar } from "react-icons/fa";
import Ingredients from "./Ingredients";
import northIndianFood from "../data/northfood";
import easternIndianFood from "../data/eastfood";
import westernIndianFood from "../data/westfood";
import centralIndianFood from "../data/centralfood";
import southIndianFood from "../data/southfood";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [filteredFood, setFilteredFood] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const categories = {
    "North Indian": northIndianFood,
    "East Indian": easternIndianFood,
    "West Indian": westernIndianFood,
    "Central Indian": centralIndianFood,
    "South Indian": southIndianFood,
  };

  const allFoodData = [
    ...northIndianFood,
    ...easternIndianFood,
    ...westernIndianFood,
    ...centralIndianFood,
    ...southIndianFood,
  ];

  // Function to handle search across all categories
  const handleSearch = () => {
    if (query.trim() !== "") {
      const queryLower = query.toLowerCase();
      let result = [];

      if (searchType === "title") {
        result = allFoodData.filter((food) =>
          food.name.toLowerCase().includes(queryLower)
        );
      } else if (searchType === "ingredients") {
        // Note: This assumes that food.ingredients is an array of strings.
        // If food.ingredients is an array of objects, adjust accordingly.
        result = allFoodData.filter((food) =>
          food.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(queryLower)
          )
        );
      }

      setFilteredFood(result);
      setSelectedCategory(null); // Reset category selection on search
    }
  };

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setFilteredFood(categories[category] || []);
    setSelectedCategory(category);
  };

  // Dynamically set the placeholder text
  const getPlaceholderText = () => {
    return searchType === "title"
      ? "Search by dish name..."
      : "Search by ingredients...";
  };

  return (
    <div>
      <Navbar />
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder={getPlaceholderText()}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
          />
          <FaSearch className="icon search-icon" onClick={handleSearch} />
        </div>

        <div className="search-buttons">
          <button
            className={searchType === "title" ? "active" : ""}
            onClick={() => setSearchType("title")}
          >
            By Title
          </button>
          <button
            className={searchType === "ingredients" ? "active" : ""}
            onClick={() => setSearchType("ingredients")}
          >
            Browse Ingredients
          </button>
          <button onClick={() => navigate("/ingredients")}>By Ingredients</button>
        </div>

        {/* Category Selection */}
        <div className="category-buttons">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Display food results after search or category selection */}
      <div className="food-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((food, index) => (
            <div key={index} className="food-item">
              <Link
                to="/recipeinfo"
                state={{ food }} // Pass the food details via state
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {/* Favorite Heart Icon */}
                <div className="favorite-icon">
                  <FaHeart />
                </div>

                {/* Food Image */}
                <img src={food.image} alt={food.name} className="food-image" />

                <div className="food-info">
                  <h3>{food.name}</h3>

                  {/* Star Rating */}
                  <div className="star-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>

                  {/* Food Description */}
                  <p>{food.description}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No food items found</p>
        )}
      </div>

      {/* Display the Ingredients component */}
      <div>
        <Ingredients />
      </div>
    </div>
  );
};

export default SearchBar;
