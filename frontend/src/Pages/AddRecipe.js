// import React, { useState } from "react";
// import "./AddRecipe.css";

// const AddRecipe = ({
//   categories = {
//     "North Indian": "northIndianFood",
//     "East Indian": "eastIndianFood",
//     "West Indian": "westIndianFood",
//     "Central Indian": "centralIndianFood",
//     "South Indian": "southIndianFood",
//   },
// }) => {
//   const [recipe, setRecipe] = useState({
//     name: "",
//     image: "",
//     description: "",
//     cookingDetails: { servings: "", prep: "", cook: "", ready: "" },
//     ingredients: [{ ingredient: "", metric: "", us: "" }],
//     directions: [""],
//     category: "North Indian",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRecipe({ ...recipe, [name]: value });
//   };

//   const handleCookingDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setRecipe({
//       ...recipe,
//       cookingDetails: { ...recipe.cookingDetails, [name]: value },
//     });
//   };

//   const handleIngredientChange = (index, e) => {
//     const newIngredients = [...recipe.ingredients];
//     newIngredients[index][e.target.name] = e.target.value;
//     setRecipe({ ...recipe, ingredients: newIngredients });
//   };

//   const handleDirectionChange = (index, e) => {
//     const newDirections = [...recipe.directions];
//     newDirections[index] = e.target.value;
//     setRecipe({ ...recipe, directions: newDirections });
//   };

//   const addIngredient = () => {
//     setRecipe({
//       ...recipe,
//       ingredients: [...recipe.ingredients, { ingredient: "", metric: "", us: "" }],
//     });
//   };

//   const addDirection = () => {
//     setRecipe({ ...recipe, directions: [...recipe.directions, ""] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       name: recipe.name,
//       image: recipe.image,
//       description: recipe.description,
//       servings: recipe.cookingDetails.servings,
//       prep_time: recipe.cookingDetails.prep,
//       cook_time: recipe.cookingDetails.cook,
//       ready_time: recipe.cookingDetails.ready,
//       category: recipe.category,
//       ingredients: recipe.ingredients,
//       directions: recipe.directions,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/recipes/api/recipes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Recipe added successfully!");
//         setRecipe({
//           name: "",
//           image: "",
//           description: "",
//           cookingDetails: { servings: "", prep: "", cook: "", ready: "" },
//           ingredients: [{ ingredient: "", metric: "", us: "" }],
//           directions: [""],
//           category: "North Indian",
//         });
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (error) {
//       console.error("Error submitting recipe:", error);
//       alert("Failed to connect to the server.");
//     }
//   };

//   return (
//     <div className="add-recipe-container">
//       <h2>Add New Recipe</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Recipe Name" value={recipe.name} onChange={handleChange} required />
//         <input type="text" name="image" placeholder="Image URL" value={recipe.image} onChange={handleChange} />
//         <textarea name="description" placeholder="Recipe Description" value={recipe.description} onChange={handleChange} required />

//         <h4>Cooking Details</h4>
//         <div className="cooking-details-row">
//           <input type="text" name="servings" placeholder="Servings" value={recipe.cookingDetails.servings} onChange={handleCookingDetailsChange} />
//           <input type="text" name="prep" placeholder="Prep Time" value={recipe.cookingDetails.prep} onChange={handleCookingDetailsChange} />
//           <input type="text" name="cook" placeholder="Cook Time" value={recipe.cookingDetails.cook} onChange={handleCookingDetailsChange} />
//           <input type="text" name="ready" placeholder="Ready In" value={recipe.cookingDetails.ready} onChange={handleCookingDetailsChange} />
//         </div>

//         <h4>Ingredients</h4>
//         {recipe.ingredients.map((ing, index) => (
//           <div key={index} className="ingredient-row">
//             <input type="text" name="ingredient" placeholder="Ingredient" value={ing.ingredient} onChange={(e) => handleIngredientChange(index, e)} />
//             <input type="text" name="metric" placeholder="Metric" value={ing.metric} onChange={(e) => handleIngredientChange(index, e)} />
//             <input type="text" name="us" placeholder="US Measurement" value={ing.us} onChange={(e) => handleIngredientChange(index, e)} />
//           </div>
//         ))}
//         <button type="button" onClick={addIngredient} className="add-btn">+ Add Ingredient</button>

//         <h4>Directions</h4>
//         {recipe.directions.map((dir, index) => (
//           <textarea key={index} placeholder={`Step ${index + 1}`} value={dir} onChange={(e) => handleDirectionChange(index, e)} />
//         ))}
//         <button type="button" onClick={addDirection} className="add-btn">+ Add Step</button>

//         <h4>Category</h4>
//         <select name="category" value={recipe.category} onChange={handleChange}>
//           {Object.entries(categories).map(([cat, value]) => (
//             <option key={value} value={cat}>{cat}</option>
//           ))}
//         </select>

//         <button type="submit" className="submit-btn">Add Recipe</button>
//       </form>
//     </div>
//   );
// };

// export default AddRecipe;
import React, { useState, useEffect } from "react";
import { FaHeart, FaStar, FaTrash } from "react-icons/fa";
import "./AddRecipe.css";
import { Link } from "react-router-dom";

const AddRecipe = ({
  categories = {
    "North Indian": "northIndianFood",
    "East Indian": "eastIndianFood",
    "West Indian": "westIndianFood",
    "Central Indian": "centralIndianFood",
    "South Indian": "southIndianFood",
  },
}) => {
  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    description: "",
    cookingDetails: { servings: "", prep: "", cook: "", ready: "" },
    ingredients: [{ ingredient: "", metric: "", us: "" }],
    directions: [""],
    category: "North Indian",
  });

  const userId = localStorage.getItem("user_id");
  const [userRecipes, setUserRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false); // State for toggling recipes visibility
  const handleDelete = async (recipeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/recipes/api/delete-recipe/${recipeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Recipe deleted successfully!");
        // Refresh recipes after deletion
        setUserRecipes(userRecipes.filter((recipe) => recipe[0] !== recipeId));
      } else {
        alert("Failed to delete the recipe.");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Error deleting recipe. Please try again.");
    }
  };
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/recipes/api/user-recipes/${userId}`)
        .then((response) => response.json())
        .then((data) => setUserRecipes(data))
        .catch((error) => console.error("Error fetching user recipes:", error));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleCookingDetailsChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      cookingDetails: { ...recipe.cookingDetails, [name]: value },
    });
  };

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index][e.target.name] = e.target.value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleDirectionChange = (index, e) => {
    const newDirections = [...recipe.directions];
    newDirections[index] = e.target.value;
    setRecipe({ ...recipe, directions: newDirections });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { ingredient: "", metric: "", us: "" }],
    });
  };

  const addDirection = () => {
    setRecipe({ ...recipe, directions: [...recipe.directions, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not logged in. Please log in first.");
      return;
    }

    const payload = {
      name: recipe.name,
      image: recipe.image,
      description: recipe.description,
      servings: recipe.cookingDetails.servings,
      prep_time: recipe.cookingDetails.prep,
      cook_time: recipe.cookingDetails.cook,
      ready_time: recipe.cookingDetails.ready,
      category: recipe.category,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      user_id: userId,
    };

    try {
      const response = await fetch("http://localhost:5000/recipes/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Recipe added successfully!");
        setRecipe({
          name: "",
          image: "",
          description: "",
          cookingDetails: { servings: "", prep: "", cook: "", ready: "" },
          ingredients: [{ ingredient: "", metric: "", us: "" }],
          directions: [""],
          category: "North Indian",
        });

        // Refresh user recipes list
        fetch(`http://localhost:5000/recipes/api/user-recipes/${userId}`)
          .then((response) => response.json())
          .then((data) => setUserRecipes(data))
          .catch((error) => console.error("Error fetching user recipes:", error));
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    //     <div className="add-recipe-container">
    //       <h2>Add New Recipe</h2>
    //       {userId ? <p>Logged in as User ID: {userId}</p> : <p>Please log in to add a recipe.</p>}
    //       <form onSubmit={handleSubmit}>
    //         <input type="text" name="name" placeholder="Recipe Name" value={recipe.name} onChange={handleChange} required />
    //         <input type="text" name="image" placeholder="Image URL" value={recipe.image} onChange={handleChange} />
    //         <textarea name="description" placeholder="Recipe Description" value={recipe.description} onChange={handleChange} required />

    //         <h4>Cooking Details</h4>
    //         <div className="cooking-details-row">
    //           <input type="text" name="servings" placeholder="Servings" value={recipe.cookingDetails.servings} onChange={handleCookingDetailsChange} />
    //           <input type="text" name="prep" placeholder="Prep Time" value={recipe.cookingDetails.prep} onChange={handleCookingDetailsChange} />
    //           <input type="text" name="cook" placeholder="Cook Time" value={recipe.cookingDetails.cook} onChange={handleCookingDetailsChange} />
    //           <input type="text" name="ready" placeholder="Ready In" value={recipe.cookingDetails.ready} onChange={handleCookingDetailsChange} />
    //         </div>

    //         <h4>Ingredients</h4>
    //         {recipe.ingredients.map((ing, index) => (
    //           <div key={index} className="ingredient-row">
    //             <input type="text" name="ingredient" placeholder="Ingredient" value={ing.ingredient} onChange={(e) => handleIngredientChange(index, e)} />
    //             <input type="text" name="metric" placeholder="Metric" value={ing.metric} onChange={(e) => handleIngredientChange(index, e)} />
    //             <input type="text" name="us" placeholder="US Measurement" value={ing.us} onChange={(e) => handleIngredientChange(index, e)} />
    //           </div>
    //         ))}
    //         <button type="button" onClick={addIngredient} className="add-btn">+ Add Ingredient</button>

    //         <h4>Directions</h4>
    //         {recipe.directions.map((dir, index) => (
    //           <textarea key={index} placeholder={`Step ${index + 1}`} value={dir} onChange={(e) => handleDirectionChange(index, e)} />
    //         ))}
    //         <button type="button" onClick={addDirection} className="add-btn">+ Add Step</button>

    //         <h4>Category</h4>
    //         <select name="category" value={recipe.category} onChange={handleChange}>
    //           {Object.entries(categories).map(([cat, value]) => (
    //             <option key={value} value={cat}>{cat}</option>
    //           ))}
    //         </select>

    //         <button type="submit" className="submit-btn">Add Recipe</button>
    //       </form>

    //       {/* Toggle Button for Showing Recipes */}
    //       <button type="button" onClick={() => setShowRecipes(!showRecipes)} className="toggle-btn">
    //         {showRecipes ? "Hide Recipes" : "Show Recipes"}
    //       </button>

    //       {/* Conditionally Render Recipes */}
    //       {showRecipes && (
    //        <div className="user-recipes-container">
    //        <h2>Your Recipes</h2>
    //        {userRecipes.length === 0 ? <p>No recipes added yet.</p> : (
    //            <div className="recipe-list">
    //            {userRecipes.map((rec) => (
    //              <Link
    //                key={rec[0]}
    //                to={`/recipedetails/${rec[0]}`} // ✅ Navigates to the correct recipe details page
    //                style={{ textDecoration: "none", color: "inherit" }}
    //              >
    //                <div className="recipe-card">
    //                  <img src={rec[2]} alt={rec[1]} />
    //                  <h3>{rec[1]}</h3>
    //                  <div>
    //                    {[...Array(5)].map((_, i) => (
    //                      <FaStar key={i} color="gold" />
    //                    ))}
    //                  </div>
    //                  <p>{rec[3]}</p>
    //                </div>
    //              </Link>
    //            ))}
    //          </div>
    //        )}
    //    </div>
    //       )}
    //     </div>
    //   );
    // };

    // export default AddRecipe;
    <div className="add-recipe-container">
      <h2>Add New Recipe</h2>
      {userId ? <p>Logged in as User ID: {userId}</p> : <p>Please log in to add a recipe.</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Recipe Name" value={recipe.name} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={recipe.image} onChange={handleChange} />
        <textarea name="description" placeholder="Recipe Description" value={recipe.description} onChange={handleChange} required />

        <h4>Cooking Details</h4>
        <div className="cooking-details-row">
          <input type="text" name="servings" placeholder="Servings" value={recipe.cookingDetails.servings} onChange={handleCookingDetailsChange} />
          <input type="text" name="prep" placeholder="Prep Time" value={recipe.cookingDetails.prep} onChange={handleCookingDetailsChange} />
          <input type="text" name="cook" placeholder="Cook Time" value={recipe.cookingDetails.cook} onChange={handleCookingDetailsChange} />
          <input type="text" name="ready" placeholder="Ready In" value={recipe.cookingDetails.ready} onChange={handleCookingDetailsChange} />
        </div>

        <h4>Ingredients</h4>
        {recipe.ingredients.map((ing, index) => (
          <div key={index} className="ingredient-row">
            <input type="text" name="ingredient" placeholder="Ingredient" value={ing.ingredient} onChange={(e) => handleIngredientChange(index, e)} />
            <input type="text" name="metric" placeholder="Metric" value={ing.metric} onChange={(e) => handleIngredientChange(index, e)} />
            <input type="text" name="us" placeholder="US Measurement" value={ing.us} onChange={(e) => handleIngredientChange(index, e)} />
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="add-btn">+ Add Ingredient</button>

        <h4>Directions</h4>
        {recipe.directions.map((dir, index) => (
          <textarea key={index} placeholder={`Step ${index + 1}`} value={dir} onChange={(e) => handleDirectionChange(index, e)} />
        ))}
        <button type="button" onClick={addDirection} className="add-btn">+ Add Step</button>

        <h4>Category</h4>
        <select name="category" value={recipe.category} onChange={handleChange}>
          {Object.entries(categories).map(([cat, value]) => (
            <option key={value} value={cat}>{cat}</option>
          ))}
        </select>

        <button type="submit" className="submit-btn">Add Recipe</button>
      </form>

      {/* Toggle Button for Showing Recipes */}
      <button type="button" onClick={() => setShowRecipes(!showRecipes)} className="toggle-btn">
        {showRecipes ? "Hide Recipes" : "Show Recipes"}
      </button>

      {/* Conditionally Render Recipes */}
      {showRecipes && (
        <div className="user-recipes-container">
          <h2>Your Recipes</h2>
          {userRecipes.length === 0 ? (
            <p>No recipes added yet.</p>
          ) : (
            <div className="recipe-list">
              {userRecipes.map((rec) => (
                <div key={rec[0]} className="recipe-card">
                  {/* Delete Button */}
                  <button className="delete-btn" onClick={() => handleDelete(rec[0])}>
                    <FaTrash />
                  </button>

                  {/* Recipe Details Link */}
                  <Link to={`/recipedetails/${rec[0]}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <img src={rec[2]} alt={rec[1]} />
                    <h3>{rec[1]}</h3>
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color="gold" />
                      ))}
                    </div>
                    <p>{rec[3]}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddRecipe;