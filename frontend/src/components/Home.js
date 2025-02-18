import React, { useState } from 'react';
import northIndianFood from "../data/northfood";
import "./Home.css"; // Importing CSS file

const Home = () => {
  // Display only the first 8 items initially
  const [displayedFood] = useState(northIndianFood.slice(0, 8));

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="headers">
        <h1>Welcome to Recipe Finder</h1>
        <p>Discover the best flavors of Food</p>
      </header>

      {/* Food Items Display */}
      <div className="food-list">
        {displayedFood.map((food, index) => (
          <div key={index} className="food-item">
            <img src={food.image} alt={food.name} />
            <div className="food-info">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
