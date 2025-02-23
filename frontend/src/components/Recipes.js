import React from "react";
import "./Recipes.css";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Ingredients from "./Ingredients";
import Home from "./Home";

const recipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    description:
      "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
    image: "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    description:
      "A fragrant rice dish with marinated chicken, saffron, and aromatic spices.",
    image: "https://www.whiskaffair.com/wp-content/uploads/2020/07/Chicken-Biryani-2-3.jpg",
  },
  {
    id: 3,
    name: "Vegetable Stir-Fry",
    description:
      "A quick and healthy dish packed with colorful veggies and soy sauce.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ZRkUfrveFnAgNkXzDdxYx0AYDOn_Gw4Jwg&s",
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description:
      "A rich chocolate dessert with a gooey, molten center served warm.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu6mEn2S-XQ9jxSWuQutBdKpEjNrXx-GhvUw&s",
  },
  {
    id: 5,
    name: "Greek Salad",
    description:
      "A refreshing salad with feta cheese, olives, tomatoes, and cucumbers.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLCj3FBQYgKwjQp9bjsACmzEIGzi2ka5GU_g&s",
  },
  {
    id: 6,
    name: "Butter Chicken",
    image: "https://bing.com/th?id=OSK.97ee55c141c2f83bc22172593933b785",
    description: "A creamy, flavorful dish made with marinated chicken cooked in a rich tomato gravy with butter and cream."
  },
  {
    id: 7,
    name: "Paneer Tikka",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfPSukRfeHtN7tj8-ayndPIH9C0Bt1VVrbbA&s",
    description: "Grilled chunks of paneer marinated in yogurt and spices, often served with green chutney."
  },
  {
    id: 8,
    name: "Rogan Josh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALenBlSNumBnitd9xNeUCNp9xuBdU_GwtIw&s",
    description: "A traditional Kashmiri dish of lamb cooked in aromatic, rich spices, including saffron and cardamom."
  },
];
const Recipes = () => {
    
  return (
    <div><Home></Home>
    <div> <Navbar></Navbar>
    <div className="recipes-container">
      <h1 className="title">Featured Recipes</h1>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <div className="recipe-info">
              <h2 className="recipe-name">{recipe.name}</h2>
              <p className="recipe-description">{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  <div><Ingredients></Ingredients></div>
    
  </div>
    
    </div>
  );
};

export default Recipes;
