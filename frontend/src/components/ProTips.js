import React from "react";
import "./ProTips.css";
import Navbar from "../components/Navbar";
import Chefs from "../components/Chefs";
import Footer from "./Footer";

const ProTips = () => {
  const tips = [
    { id: 1, title: "Use Fresh Ingredients", description: "Fresh ingredients enhance flavor and texture in every dish." },
    { id: 2, title: "Preheat Your Pan", description: "A hot pan ensures proper searing and even cooking." },
    { id: 3, title: "Season in Layers", description: "Add seasoning gradually for a well-balanced taste." },
    { id: 4, title: "Knife Skills Matter", description: "A sharp knife and proper cutting techniques improve efficiency and safety." },
    { id: 5, title: "Don’t Overcrowd the Pan", description: "Giving food enough space helps in even browning and cooking." },
  ];

  return (
    <div>
            <Navbar />
    <div className="protips-container">
      <h1 className="title">Chef's Pro Tips</h1>
      <p className="subtitle">Master the kitchen with these expert cooking tips!</p>

      <div className="tips-list">
        {tips.map((tip) => (
          <div key={tip.id} className="tip-card">
            <h2 className="tip-title">{tip.title}</h2>
            <p className="tip-description">{tip.description}</p>
          </div>
        ))}
      </div>
    </div> <div>
        <Chefs></Chefs>
        </div>
        
        <div><Footer></Footer></div></div>
  );
};

export default ProTips;
