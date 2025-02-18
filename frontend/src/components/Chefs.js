import React from "react";
import "./Chefs.css";

const chefs = [
  {
    id: 1,
    name: "Laurie R.",
    description:
      "Laurie resides in Nova Scotia, Canada. With Italian roots, her love for cooking traces to hours spent in the kitchen with her family, and love of gardening.",
    image: "https://via.placeholder.com/80", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Mark R. Vogel",
    description:
      "Mark R. Vogel received his doctorate in clinical psychology from Yeshiva University and his culinary arts degree from the Institute of Culinary Education.",
    image: "https://via.placeholder.com/80", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Gordon Ramsay",
    description:
      "A world-renowned chef known for his Michelin-star restaurants and fiery personality on TV cooking shows.",
    image: "https://via.placeholder.com/80", // Replace with actual image URL
  },
  {
    id: 4,
    name: "Julia Child",
    description:
      "An American chef who introduced French cuisine to the U.S. through her famous cookbooks and television shows.",
    image: "https://via.placeholder.com/80", // Replace with actual image URL
  },
  {
    id: 5,
    name: "Anthony Bourdain",
    description:
      "A legendary chef, traveler, and storyteller known for his culinary adventures and deep cultural explorations.",
    image: "https://via.placeholder.com/80", // Replace with actual image URL
  },
];

const Chefs = () => {
  return (
    <div className="chefs-container">
      <h1 className="title">Meet Our Chefs</h1>
      <div className="chefs-list">
        {chefs.map((chef) => (
          <div key={chef.id} className="chef-card">
            <img src={chef.image} alt={chef.name} className="chef-image" />
            <div className="chef-info">
              <h2 className="chef-name">{chef.name}</h2>
              <p className="chef-description">{chef.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chefs;
