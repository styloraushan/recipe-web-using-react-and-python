import React, { useState } from "react";
import "./Ingredient.css"; 
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; 

const ingredientsList = [
  { name: "Tomato", img: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg" },
  { name: "Potato", img: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg" },
  { name: "Broccoli", img: "https://upload.wikimedia.org/wikipedia/commons/0/03/Broccoli_and_cross_section_edit.jpg" },
];

export default function Ingredient() {
  const [ingredient, setIngredient] = useState("");
  const [diet, setDiet] = useState("None");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchSubmitted(true);
    setLoading(true);

    try {
        const ingredientsArray = ingredient
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "");

        const response = await fetch('http://localhost:5000/auth/api/search', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredients: ingredientsArray,
                diet: diet,
            }),
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.results) {
            setRecipes(data.results);
        } else {
            console.error('Error fetching recipes:', data.error);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="containers">
        <div className="header">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/373/952/839/wooden-spoon-condiments-background-wallpaper-preview.jpg"
            alt="Recipe Ingredients"
            className="header-img"
          />
          <h1 className="header-title">Recipes by Ingredients</h1>
        </div>

        <div className="search-box">
          <h2>Enter ingredients, and get recipes</h2>
          <p>Find recipes by ingredients that you have on hand.</p>

          <div className="input-container">
            <input
              type="text"
              placeholder="Enter ingredient (comma separated)"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
              <option value="None">No Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Ketogenic">Ketogenic</option>
            </select>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "🔄 Searching..." : "🍽 Find Recipes"}
            </button>
          </div>
        </div>

        {!searchSubmitted && (
          <div className="ingredients-grid">
            {ingredientsList.map((item, index) => (
              <div key={index} className="ingredient">
                <img src={item.img} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p>⏳ Finding the best recipes for you...</p>
          </div>
        )}

        {!loading && searchSubmitted && (
          <div className="recipes-container">
            <h1>Great recipes start with simple ingredients!</h1>
            {recipes.length === 0 ? (
              <p>No recipes found. Please try different ingredients or diets.</p>
            ) : (
              <div className="recipe-grid">
                {recipes.map((recipe, index) => (
                  <div key={index} className="recipe">
                    <img src={recipe.image} alt={recipe.title} />
                    <h3>{recipe.title}</h3>
                    <p>⏳ Ready in {recipe.readyInMinutes} mins | 🍽 Serves: {recipe.servings}</p>
                    <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn">🔗 View Recipe</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
