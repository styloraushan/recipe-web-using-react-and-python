import React from "react";
import { useLocation } from "react-router-dom"; 
import "./Result.css";
import Navbar from "./Navbar";

export default function Result() {
    const location = useLocation();
    const { recipes } = location.state || { recipes: [] }; // ✅ Ensure recipes is defined

    return (
        <div>
            <div><Navbar></Navbar>
            
            <h1>Recipe Results</h1>
            {recipes.length === 0 ? (
                <p>No recipes found. Please try different ingredients or diets.</p>
            ) : (
                <div className="recipes-container">
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
        </div></div>
    );
}
