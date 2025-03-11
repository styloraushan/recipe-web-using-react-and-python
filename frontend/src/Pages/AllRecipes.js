// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaHeart, FaStar } from "react-icons/fa";
// import Navbar from "../components/Navbar";
// import Ingredient from "../components/Ingredients";

// const styles = {
//   homeContainer: { 
//     padding: "20px", 
//     backgroundColor: "#f8f9fa",  // Added missing comma
//     maxWidth: "1300px",  // Used camelCase
//     margin: "0 auto" 
//   },
//   header: { textAlign: "center", marginBottom: "30px" },
//   headerTitle: {
//     fontSize: "3rem",
//     fontWeight: "bold",
//     color: "#333",
//     background: "linear-gradient(45deg, #333, #ff8c00, #008080)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//   },
//   headerSubtitle: { fontSize: "1.2rem", color: "#555" },
//   foodList: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//     gap: "20px",
//     justifyItems: "center",
   
//   },
//   foodItem: {
//     backgroundColor: "#fff",
//     borderRadius: "12px",
//     overflow: "hidden",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     position: "relative",
//     cursor: "pointer",
//   },
//   favoriteIcon: {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     background: "pink",
//     width: "40px",
//     height: "40px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: "50%",
//     color: "white",
//     cursor: "pointer",
//   },
//   foodImage: {
//     width: "100%",
//     height: "180px",
//     objectFit: "cover",
//     transition: "transform 0.5s ease",
//     borderRadius: "10px",
//   },
//   starRating: { color: "orange", margin: "5px 0" },
//   starIcon: { marginRight: "3px" },
//   foodInfo: { padding: "10px", textAlign: "center", backgroundColor: "#fff" },
//   foodName: { fontSize: "1rem", fontWeight: "bold", color: "#333", marginTop: "0" },
//   foodDescription: { fontSize: "1rem", color: "#777", lineHeight: "1.5" },
// };

// const AllRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [savedRecipes, setSavedRecipes] = useState([]);

//   const loggedInUserId = localStorage.getItem("user_id"); // Retrieve logged-in user ID

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/recipes/api/allrecipes");
//         if (!response.ok) {
//           throw new Error("Failed to fetch recipes");
//         }
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleSaveRecipe = async (recipeId) => {
//     if (!loggedInUserId) {
//       alert("Please log in to save recipes!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/recipes/save-recipe", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id: loggedInUserId,
//           recipe_id: recipeId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save recipe");
//       }

//       setSavedRecipes([...savedRecipes, recipeId]);
//       alert("Recipe saved successfully!");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error saving recipe");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={styles.homeContainer}>
//         <header style={styles.header}>
//           <h1 style={styles.headerTitle}>All Recipes</h1>
//           <p style={styles.headerSubtitle}>Discover the best flavors of Food</p>
//         </header>

//         {loading && <p>Loading recipes...</p>}
//         {error && <p>Error: {error}</p>}

//         <div style={styles.foodList}>
//           {recipes.map((recipe) => (
//             <div key={recipe.id} style={styles.foodItem}>
//               <div
//                 style={{
//                   ...styles.favoriteIcon,
//                   background: savedRecipes.includes(recipe.id) ? "red" : "pink",
//                 }}
//                 onClick={() => handleSaveRecipe(recipe.id)}
//               >
//                 <FaHeart />
//               </div>
//               <Link to={`/recipedetails/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
//                 <img src={recipe.image} alt={recipe.name} style={styles.foodImage} />
//                 <div style={styles.foodInfo}>
//                   <h3 style={styles.foodName}>{recipe.name} ({recipe.category})</h3>
//                   <div style={styles.starRating}>
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar key={i} style={styles.starIcon} />
//                     ))}
//                   </div>
//                   <p style={styles.foodDescription}>{recipe.description}</p>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Ingredient />
//     </div>
//   );
// };

// export default AllRecipes;






// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaHeart, FaStar } from "react-icons/fa";
// import Navbar from "../components/Navbar";
// import Ingredient from "../components/Ingredients";
// import styles from "./AllRecipes.module.css"; // Import the CSS module

// const AllRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [savedRecipes, setSavedRecipes] = useState([]);

//   const loggedInUserId = localStorage.getItem("user_id");

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/recipes/api/allrecipes");
//         if (!response.ok) {
//           throw new Error("Failed to fetch recipes");
//         }
//         const data = await response.json();
//         setRecipes(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleSaveRecipe = async (recipeId) => {
//     if (!loggedInUserId) {
//       alert("Please log in to save recipes!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/recipes/save-recipe", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_id: loggedInUserId, recipe_id: recipeId }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save recipe");
//       }

//       setSavedRecipes([...savedRecipes, recipeId]);
//       alert("Recipe saved successfully!");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error saving recipe");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className={styles.homeContainer}>
//         <header className={styles.header}>
//           <h1 className={styles.headerTitle}>All Recipes</h1>
//           <p className={styles.headerSubtitle}>Discover the best flavors of Food</p>
//         </header>

//         {loading && <p>Loading recipes...</p>}
//         {error && <p>Error: {error}</p>}

//         <div className={styles.foodList}>
//           {recipes.map((recipe) => (
//             <div key={recipe.id} className={styles.foodItem}>
//               <div
//                 className={`${styles.favoriteIcon} ${savedRecipes.includes(recipe.id) ? styles.saved : ""}`}
//                 onClick={() => handleSaveRecipe(recipe.id)}
//               >
//                 <FaHeart />
//               </div>
//               <Link to={`/recipedetails/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
//                 <img src={recipe.image} alt={recipe.name} className={styles.foodImage} />
//                 <div className={styles.foodInfo}>
//                   <h3 className={styles.foodName}>{recipe.name} ({recipe.category})</h3>
//                   <div className={styles.starRating}>
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar key={i} className={styles.starIcon} />
//                     ))}
//                   </div>
//                   <p className={styles.foodDescription}>{recipe.description}</p>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Ingredient />
//     </div>
//   );
// };

// export default AllRecipes;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Ingredient from "../components/Ingredients";
import styles from "./AllRecipes.module.css"; // Import the CSS module

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const loggedInUserId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/recipes/api/allrecipes");
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

    const fetchSavedRecipes = async () => {
      if (!loggedInUserId) return;

      try {
        const response = await fetch(`http://localhost:5000/recipes/saved/${loggedInUserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch saved recipes");
        }
        const savedData = await response.json();
        setSavedRecipes(savedData.map((recipe) => recipe.id));
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [loggedInUserId]);

  const handleSaveRecipe = async (recipeId) => {
    if (!loggedInUserId) {
      alert("Please log in to save recipes!");
      return;
    }

    if (savedRecipes.includes(recipeId)) {
      alert("Recipe already saved!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/recipes/save-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: loggedInUserId, recipe_id: recipeId }),
      });

      if (!response.ok) {
        throw new Error("Failed to save recipe");
      }

      setSavedRecipes([...savedRecipes, recipeId]);
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving recipe");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.homeContainer}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>All Recipes</h1>
          <p className={styles.headerSubtitle}>Discover the best flavors of Food</p>
        </header>

        {loading && <p>Loading recipes...</p>}
        {error && <p>Error: {error}</p>}

        <div className={styles.foodList}>
          {recipes.map((recipe) => (
            <div key={recipe.id} className={styles.foodItem}>
              <div
                className={`${styles.favoriteIcon} ${savedRecipes.includes(recipe.id) ? styles.saved : ""}`}
                onClick={() => handleSaveRecipe(recipe.id)}
              >
                <FaHeart style={{ color: savedRecipes.includes(recipe.id) ? "red" : "gray" }} />
              </div>
              <Link to={`/recipedetails/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={recipe.image} alt={recipe.name} className={styles.foodImage} />
                <div className={styles.foodInfo}>
                  <h3 className={styles.foodName}>{recipe.name} ({recipe.category})</h3>
                  <div className={styles.starRating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={styles.starIcon} />
                    ))}
                  </div>
                  <p className={styles.foodDescription}>{recipe.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Ingredient />
    </div>
  );
};

export default AllRecipes;

