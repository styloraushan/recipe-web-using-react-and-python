import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Save, Camera, Printer, Share } from "lucide-react";
import Navbar from "../components/Navbar";
import "../Pages/RecipeInfo.css"; // Import the CSS file

export default function RecipeInfo() {
  const { recipe_id } = useParams(); // Get recipe_id from URL
  const [food, setFood] = useState(null); // Store recipe data
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [unit, setUnit] = useState("metric");
  const [showFileInput, setShowFileInput] = useState(false);

  // Fetch the recipe from the backend
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recipes//api/allrecipes/${recipe_id}`);
        if (!response.ok) {
          throw new Error("Recipe not found");
        }
        const data = await response.json();
        setFood(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setFood(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipe_id]);

  // Show loading message
  if (loading) {
    return (
      <div>
        <Navbar className="no-print" />
        <div className="recipe-container">
          <h2>Loading recipe...</h2>
        </div>
      </div>
    );
  }

  // If no recipe is found
  if (!food) {
    return (
      <div>
        <Navbar className="no-print" />
        <div className="recipe-container">
          <h2>No recipe found.</h2>
        </div>
      </div>
    );
  }

  // Handle multiple photo uploads
  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    }
    setShowFileInput(false);
  };

  // Handle printing the recipe
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Navbar className="no-print" />
      <div className="recipe-container">
        <h3 className="recipe-title">{food.name}</h3>
        <h2 className="recipe-subtitle">{food.description}</h2>

        {/* Recipe Image */}
        <div className="flex justify-center mt-3">
          <img src={food.image} alt={food.name} className="recipe-image" />
        </div>
        <div className="flex justify-center mt-2 no-print">
          <Camera className="text-gray-500 w-8 h-8" />
        </div>

        {/* Uploaded Photos */}
        {photos.length > 0 && (
          <div className="uploaded-photos">
            <h3 className="text-lg font-bold mb-2 text-orange-600">
              Uploaded Photos
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Uploaded ${index + 1}`} className="uploaded-photo" />
              ))}
            </div>
          </div>
        )}

        {/* Rating Stars */}
        <div className="rating-stars no-print">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="star" />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons no-print">
          <button>
            <Save className="mr-2" /> Save
          </button>
          <button className="primary">Try It</button>
          <label>
            <button onClick={() => setShowFileInput(!showFileInput)}>
              <Camera className="mr-2" /> Add Photo
            </button>
            {showFileInput && (
              <input type="file" accept="image/*" className="file-input" onChange={handlePhotoUpload} multiple />
            )}
          </label>
          <button onClick={handlePrint}>
            <Printer className="mr-2" /> Print
          </button>
          <button className="no-print">
            <Share className="mr-2" /> Share
          </button>
        </div>

        {/* Cooking Details */}
        <div className="cooking-details">
          <div>Servings: {food.servings}</div>
          <div>Prep: {food.prep_time}</div>
          <div>Cook: {food.cook_time}</div>
          <div>Ready: {food.ready_time}</div>
        </div>

        {/* Ingredients Table */}
        <div className="mt-4">
          <div className="flex justify-end space-x-2 no-print">
            <button className={`border p-2 rounded-lg ${unit === "metric" ? "bg-orange-500 text-white" : "bg-gray-100"}`} onClick={() => setUnit("metric")}>
              Metric
            </button>
            <button className={`border p-2 rounded-lg ${unit === "us" ? "bg-orange-500 text-white" : "bg-gray-100"}`} onClick={() => setUnit("us")}>
              U.S.
            </button>
          </div>
          <table className="ingredients-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>{unit === "metric" ? "Metric" : "U.S."}</th>
              </tr>
            </thead>
            <tbody>
              {food.ingredients.map((ing, i) => (
                <tr key={i}>
                  <td>{ing.ingredient}</td>
                  <td>{unit === "metric" ? ing.metric : ing.us_measure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Directions */}
        <div className="directions">
          <h3>Directions</h3>
          <ol>
            {food.directions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Comments Section */}
        <div className="comments-section no-print">
          <h3>Comments</h3>
          <textarea placeholder="Add a comment..."></textarea>
          <button>Post Comment</button>
        </div>
      </div>
    </div>
  );
}
