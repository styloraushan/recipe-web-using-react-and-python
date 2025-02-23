import React, { useState } from "react";
import "./RecipeGrid.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const allRecipes = {
  day: [
    {
      id: 1,
      name: "Betty Crocker Pancakes",
      description: "Classic pancakes from the Betty Crocker Cookbook.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFoJj4FmQOH_vPCFSE9OMdSGVuBCpuN8XZ5w&s",
      link: "https://example.com/betty-crocker-pancakes",
    },
    {
      id: 2,
      name: "Sopa Azteca (Tortilla Soup)",
      description: "A warm and flavorful soup with avocado and cheese.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8OIeCKyzj3rYDnaRHbmMEtNfIbGpkwMrVaA&s",
      link: "https://example.com/sopa-azteca",
    },
  ],
  week: [
    {
      id: 3,
      name: "Chicago Crunchy Chocolate Chip Cookies",
      description: "A classic crunchy chocolate chip cookie from Chicago.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSauLuFkNI2qwkja0Z7GV3uFXQ9wWcku8pysQ&s",
      link: "https://example.com/chicago-cookies",
    },
    {
      id: 4,
      name: "Greek Pizza Mini Muffins",
      description: "Delicious muffins packed with Greek flavors.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9T4ldwnIbueSfXyAZoBOklYq5aOf6dsqoZQ&s",
      link: "https://example.com/greek-pizza-muffins",
    },
  ],
  month: [
    {
      id: 5,
      name: "Homemade Salt & Spice Set",
      description: "A simple salt and spice set to enhance your cooking.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu238c97VzM1cZ0udxuS5VoR3-iYQ7XK5E_w&s",
      link: "https://example.com/salt-spice",
    },
    {
      id: 6,
      name: "Fresh Avocado Toast",
      description: "A healthy and delicious avocado toast recipe.",
      image: "https://www.vegrecipesofindia.com/wp-content/uploads/2016/08/avocado-garlic-bread-toast-recipe-1-500x375.jpg",
      link: "https://example.com/avocado-toast",
    },
  ],
  quarter: [
    {
      id: 7,
      name: "Spaghetti Carbonara",
      description: "A creamy Italian pasta dish with pancetta.",
      image: "https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg",
      link: "https://example.com/spaghetti-carbonara",
    },
    {
      id: 8,
      name: "Mexican Street Tacos",
      description: "Authentic Mexican tacos with marinated meat.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAdHlsKbxOUJ3B9_7K5Ds-tKxtwJx50aeH8Q&s",
      link: "https://example.com/mexican-street-tacos",
    },
    {
      id: 9,
      name: "Spaghetti Carbonara",
      description: "A creamy Italian pasta dish with pancetta.",
      image: "https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg",
      link: "https://example.com/spaghetti-carbonara",
    },
    {
      id: 10,
      name: "Mexican Street Tacos",
      description: "Authentic Mexican tacos with marinated meat.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAdHlsKbxOUJ3B9_7K5Ds-tKxtwJx50aeH8Q&s",
      link: "https://example.com/mexican-street-tacos",
    },
  ],
  year: [
    {
      id: 9,
      name: "Classic French Croissant",
      description: "Buttery and flaky French-style croissants.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzLP9uLMUndSVtmryZzKL2DBGcDdzE7-3wg&s",
      link: "https://example.com/french-croissant",
    },
    {
      id: 10,
      name: "BBQ Ribs with Honey Glaze",
      description: "Slow-cooked ribs with a honey BBQ glaze.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjMJXSy_lO4Q0GLrkgQ8525brPwwvhkx2cg&s",
      link: "https://example.com/bbq-ribs",
    },
  ],
};

const RecipeGrid = () => {
  const [selectedFilter, setSelectedFilter] = useState("day"); // Default: "day"

  return (
    <div>
      <Navbar />

      <div className="recipe-container">
        <h2 className="title">
          Top Recipes <span className="highlight">During the last {selectedFilter}</span>
        </h2>

        {/* Filter Buttons */}
        <div className="filter-tabs">
          {["day", "week", "month", "quarter", "year"].map((filter) => (
            <button
              key={filter}
              className={selectedFilter === filter ? "active" : ""}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)} {/* Capitalize first letter */}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="grid">
          {allRecipes[selectedFilter].map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="recipe-image"
                onClick={() => window.open(recipe.image, "_blank")} // Open image in new tab
                style={{ cursor: "pointer" }}
              />
              <div className="recipe-info">
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
                <button
                  className="read-more-btn"
                  onClick={() => window.location.href = recipe.link} // Navigate to recipe details
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div><div><Footer></Footer></div>
    </div>
  );
};

export default RecipeGrid;
