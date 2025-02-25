// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom"; // ✅ Import useParams
// import { FaStar } from "react-icons/fa";

// const SavedRecipes = () => {
//   const { user_id } = useParams(); // ✅ Get userId from URL
//   const [savedRecipes, setSavedRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!user_id) return; // Ensure user_id exists before fetching

//     const fetchSavedRecipes = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/recipes/saved-recipes/${user_id}`);
//         if (!response.ok) throw new Error("Failed to fetch saved recipes");

//         const data = await response.json();
//         setSavedRecipes(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSavedRecipes();
//   }, [user_id]);

//   return (
//     <div className="saved-recipes-container">
//       <h2>Your Saved Recipes</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {!loading && !error && savedRecipes.length === 0 && <p>No saved recipes yet.</p>}

//       <div className="recipe-list">
//         {savedRecipes.map((recipe) => (
//           <Link key={recipe.id} to={`/recipedetails/${recipe.id}`} className="recipe-card">
//             <img src={recipe.image} alt={recipe.name} />
//             <h3>{recipe.name} ({recipe.category})</h3>
//             <div className="star-rating">
//               {[...Array(5)].map((_, i) => (
//                 <FaStar key={i} color="gold" />
//               ))}
//             </div>
//             <p>{recipe.description}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SavedRecipes;
