import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewProfile.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import UpdateUser from "../Pages/UpdateUser";
import AddRecipe from "../Pages/AddRecipe";

const ViewProfile = () => {
  const { user_id } = useParams();
  const [userData, setUserData] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [activeSection, setActiveSection] = useState("recipes");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      // Fetch user data
      axios
        .get(`http://localhost:5000/auth/user/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      // Fetch saved recipes separately
      axios
        .get(`http://localhost:5000/recipes/saved-recipes/${userId}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setSavedRecipes(response.data); // ✅ Use fetched saved recipes
          } else {
            setSavedRecipes([]); // Empty array if no saved recipes
          }
        })
        .catch((error) => {
          console.error("Error fetching saved recipes:", error);
        });
    }
  }, []);

  const handleAddRecipe = () => setActiveSection("addRecipe");
  const handleSavedRecipes = () => setActiveSection("recipes");
  const handleUpdateAccount = () => {
    const userId = localStorage.getItem("user_id");
    setActiveSection("updateAccount");
    navigate(`/update/${userId}`);
  };

  const handleDeactivateAccount = () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      const userId = localStorage.getItem("user_id");
      axios
        .delete(`http://localhost:5000/auth/user/${userId}`)
        .then(() => {
          localStorage.removeItem("user_id");
          navigate("/signup");
        })
        .catch((error) => console.error("Error deactivating account:", error));
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="view-profile-container">
        <div className="profile-section">
          <h2>User Profile</h2>
          <div className="profile-details">
            <img
              className="profile-pic"
              src={userData.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALenBlSNumBnitd9xNeUCNp9xuBdU_GwtIw&s"}
              alt="User Profile"
            />
            <div className="user-info">
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
          </div>

          <div className="button-group">
            <button className="btn add" onClick={handleAddRecipe}>Add Recipe</button>
            <button className="btn saved" onClick={handleSavedRecipes}>Saved Recipes</button>
            <button className="btn update" onClick={handleUpdateAccount}>Update Account</button>
            <button className="btn deactivate" onClick={handleDeactivateAccount}>Deactivate Account</button>
          </div>
        </div>

        <div className="recipes-sections">
          {activeSection === "recipes" && (
            <div className="recipes-sectionss">
              <h3>Saved Recipes</h3>
              <div className="recipes-grids" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
                {savedRecipes.length > 0 ? (
                  savedRecipes.map((recipe) => (
                    <Link to={`/recipedetails/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="recipe-cards">
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="recipe-images"
                          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <h4>{recipe.name}</h4>
                        <p>{recipe.description}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No saved recipes found.</p>
                )}
              </div>
            </div>
          )}

          {activeSection === "addRecipe" && (
            <div className="add-recipe-section">
              <AddRecipe />
            </div>
          )}

          {activeSection === "updateAccount" && <UpdateUser />}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
