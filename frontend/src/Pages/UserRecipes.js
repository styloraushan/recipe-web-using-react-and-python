import React, { useState, useEffect } from "react";

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      alert("User not logged in. Please log in first.");
      return;
    }

    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recipes/api/user-recipes/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setRecipes(data);
        } else {
          alert("Failed to fetch recipes: " + (data.error || "Unknown error"));
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
        alert("Error connecting to the server.");
      }
    };

    fetchUserRecipes();
  }, [userId]);

  return (
    <div className="user-recipes-container">
      <h2>Your Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found. Add some recipes!</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <img src={recipe.image} alt={recipe.name} style={{ width: "200px" }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRecipes;
