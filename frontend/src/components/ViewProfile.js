import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewProfile.css";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
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
      axios
        .get(`http://localhost:5000/auth/user/${userId}`)
        .then((response) => {
          setUserData(response.data);
          setSavedRecipes(
            response.data.savedRecipes || [
              {
                name: "Rogan Josh",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALenBlSNumBnitd9xNeUCNp9xuBdU_GwtIw&s",
                description: "A traditional Kashmiri dish of lamb cooked in aromatic, rich spices, including saffron and cardamom."
              },
              {
                name: "Aloo Gobi",
                image: "https://th.bing.com/th/id/OIP.ZySaC8BuGfrW0V5ZW8TWJAHaHa?rs=1&pid=ImgDetMain",
                description: "A vegetarian dish made with potatoes and cauliflower cooked with turmeric, cumin, and other spices."
              },
              {
                name: "Chole Bhature",
                image: "https://2.bp.blogspot.com/-OU_L_dlS_G0/Wx9rVpMKeVI/AAAAAAAAAEE/lL6pyCPBVoQkBxbpYZg9wRt6-Lce51C7ACLcBGAs/s1600/imperial%2Binn.jpg",
                description: "Spicy chickpeas served with a deep-fried bread called 'bhature.'"
              },
              {
                name: "Dal Makhani",
                image: "https://recipes.timesofindia.com/thumb/53097626.cms?imgsize=156015&width=800&height=800",
                description: "A creamy lentil dish made with black lentils and kidney beans, cooked with butter and cream."
              }
            ]
          );
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleAddRecipe = () => setActiveSection("addRecipe");
  const handleSavedRecipes = () => setActiveSection("recipes");
  const handleUpdateAccount = () => {
    const userId = localStorage.getItem("user_id"); // Get user ID
    setActiveSection("updateAccount"); // Show UpdateUser inside ViewProfile
    navigate(`/update/${userId}`); // Navigate to update page
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
              <h3>Added Recipes</h3>
              <div className="recipes-grids" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
                {savedRecipes.map((recipe, index) => (
                  <Link
                    to="/recipeinfo"
                    key={index}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
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
                ))}
              </div>
            </div>

          )}

          {activeSection === "addRecipe" && (
            <div className="add-recipe-section">
              <div>
                <AddRecipe />  {/* ✅ Proper component syntax */}
              </div>
            </div>
          )}

<div>
      {activeSection === "updateAccount" && <UpdateUser />}
    </div>
        </div>

      </div>
    </div>
  );
};

export default ViewProfile;
