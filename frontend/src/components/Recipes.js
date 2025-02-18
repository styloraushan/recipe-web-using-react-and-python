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
    image: "https://www.simplyrecipes.com/thmb/Oa9V2lmhWom41ELfF3eYVdXjVAo=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Spaghetti-Carbonara-LEAD-06-d0a52b17377f4f5f86c3046a6b2145b0.jpg",
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
    image: "https://www.recipetineats.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry_5-SQ.jpg",
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description:
      "A rich chocolate dessert with a gooey, molten center served warm.",
    image: "https://www.cookingclassy.com/wp-content/uploads/2020/02/molten-lava-cake-20.jpg",
  },
  {
    id: 5,
    name: "Greek Salad",
    description:
      "A refreshing salad with feta cheese, olives, tomatoes, and cucumbers.",
    image: "https://www.acouplecooks.com/wp-content/uploads/2022/04/Greek-Salad-006.jpg",
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
