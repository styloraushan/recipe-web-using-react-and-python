import React, { useState } from "react";
import "./Ingredient.css"; 
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; 

const ingredientsList = [
  { name: "Tomato", img: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg" },
  { name: "Potato", img: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg" },
  { name: "Broccoli", img: "https://upload.wikimedia.org/wikipedia/commons/0/03/Broccoli_and_cross_section_edit.jpg" },
  { name: "Carrot", img: "https://www.allthatgrows.in/cdn/shop/products/Carrot-Orange.jpg?v=1598079671" },
  { name: "Cucumber", img: "https://m.media-amazon.com/images/I/41VcQMvZzgL._SY300_SX300_QL70_FMwebp_.jpg" },
  { name: "Bell Pepper", img: "https://cdn.britannica.com/12/147312-050-BEC6A59E/Bell-peppers.jpg" },
  { name: "Onion", img: "https://5.imimg.com/data5/SELLER/Default/2024/5/419610158/MO/LQ/OO/160347834/white-onion.jpg" },
  { name: "Garlic", img: "https://images-cdn.ubuy.co.in/64efc1651632da2ebd38d442-garlic-bulb-fresh-whole-each.jpg" },
  { name: "Ginger", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfjmOYr-EOxju98atL8_xXqoWFUvRt06Ub7Q&s" },
  { name: "Spinach", img: "https://gabbarfarms.com/cdn/shop/products/Spinach_1000x.jpg?v=1620713074" },
  { name: "Salt", img: "https://organicmandya.com/cdn/shop/files/CrystalSeaSalt_2_402011f2-7d91-43d2-ab8e-edfc2a2ad5c5.jpg?v=1719080901&width=1024" },
  { name: "Pepper", img: "https://hindustanspices.in/wp-content/uploads/2020/07/blackpepper.jpg" },
  { name: "Olive Oil", img: "https://5.imimg.com/data5/SELLER/Default/2024/3/399146262/RE/IE/UP/19315684/extra-virgin-olive-oil.jpg" },
  { name: "Lemon", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxdbI-T6M5QeU7XTcNcrl9ocTpBA0zRfFTw&s" },
  { name: "Parsley", img: "https://iprod.mishry.com/wp-content/uploads/2019/07/fresh-coriander-leaves.jpg" },
  { name: "Thyme", img: "https://m.media-amazon.com/images/I/71JAKKx7WgL.jpg" },
  { name: "Rosemary", img: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2017/12/rosemary-leaves-bound-in-rope-on-wooden-table.jpg?w=1155&h=1541" },
  { name: "Basil", img: "https://www.dawnlee.in/wp-content/uploads/2022/07/world-best-basil-tulsi-leaves-dawn-lee-by-jain-roots-1.webp" },
  { name: "Oregano", img: "https://farmonics.co.in/cdn/shop/products/oregano_31bdde37-19a5-422a-b8de-1bf8d6d156b4.jpg?v=1698247514&width=1445" },
  { name: "Cumin", img: "https://cdn.shopify.com/s/files/1/0201/1720/files/IMG-1444_600x600.jpg?v=1689862446" },
  { name: "Paprika", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpzTMrBhu8XfXO0psESXrHlYZXG7v7D0M0gIhnZXWDalHKs1sBBCmaifL1g94tNsUOgFQ&usqp=CAU" },
  { name: "Cauliflower", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXo1pTXhMFZ52F1Ydkf5Qd7yrdSOrGfYMIQA&s" },
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
