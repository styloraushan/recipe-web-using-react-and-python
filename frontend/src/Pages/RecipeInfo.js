import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Star, Save, Camera, Printer, Share } from "lucide-react";
import Navbar from "../components/Navbar";
import "./RecipeInfo.css"; // Import the CSS file

export default function RecipeInfo() {
  // Retrieve food data from the router state
  const { state } = useLocation();
  const food = state?.food;
  const [photos, setPhotos] = useState([]); // Store multiple photos
  const [unit, setUnit] = useState("metric");
  const [showFileInput, setShowFileInput] = useState(false); // Control file input visibility

  // If no food data is passed, show a fallback message
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
      {/* Hide Navbar and action buttons from print using the "no-print" class */}
      <Navbar className="no-print" />
      <div className="recipe-container">
        {/* Recipe Info */}
        <h3 className="recipe-title">{food.name}</h3>
        <h2 className="recipe-subtitle">{food.description}</h2>

        {/* Recipe Image */}
        <div className="flex justify-center mt-3">
          <img src={food.image} alt={food.name} className="recipe-image" />
        </div>
        <div className="flex justify-center mt-2 no-print">
          {/* <Camera className="text-gray-500 w-8 h-8" /> */}
        </div>

        {/* Uploaded Photos */}
        {photos.length > 0 && (
          <div className="uploaded-photos">
            <h3 className="text-lg font-bold mb-2 text-orange-600">
              Uploaded Photos
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Uploaded ${index + 1}`}
                  className="uploaded-photo"
                />
              ))}
            </div>
          </div>
        )}

        {/* Image and Ratings */}
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
              <input
                type="file"
                accept="image/*"
                className="file-input"
                onChange={handlePhotoUpload}
                multiple
              />
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
        {food.cookingDetails && (
          <div className="cooking-details">
            <div>Servings: {food.cookingDetails.servings}</div>
            <div>Prep: {food.cookingDetails.prep}</div>
            <div>Cook: {food.cookingDetails.cook}</div>
            <div>Ready: {food.cookingDetails.ready}</div>
          </div>
        )}

        {/* Ingredients Table */}
        {food.ingredients && (
          <div className="mt-4">
            <div className="flex justify-end space-x-2 no-print">
              <button
                className={`border p-2 rounded-lg ${unit === "metric" ? "bg-orange-500 text-white" : "bg-gray-100"
                  }`}
                onClick={() => setUnit("metric")}
              >
                Metric
              </button>
              <button
                className={`border p-2 rounded-lg ${unit === "us" ? "bg-orange-500 text-white" : "bg-gray-100"
                  }`}
                onClick={() => setUnit("us")}
              >
                U.S.
              </button>
            </div>
            <table className="ingredients-table">
  <thead>
    {/* Screen header: 2 columns */}
    <tr className="screen-only">
      <th>Ingredient</th>
      <th>Amount</th>
    </tr>
    {/* Print header: 3 columns */}
    <tr className="print-only">
      <th>Ingredient</th>
      <th>Metric</th>
      <th>U.S.</th>
    </tr>
  </thead>
  <tbody>
    {food.ingredients.map((ing, i) => (
      <tr key={i}>
        <td>{ing.ingredient}</td>
        {/* Screen cell: show selected unit */}
        <td className="screen-only">
          {unit === "metric" ? ing.metric : ing.us}
        </td>
        {/* Print cells: show both measurements */}
        <td className="print-only">{ing.metric}</td>
        <td className="print-only">{ing.us}</td>
      </tr>
    ))}
  </tbody>
</table>


          </div>
        )}

        {/* Directions */}
        {food.directions && (
          <div className="directions">
            <h3>Directions</h3>
            <ol>
              {food.directions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Comments Section */}
        <div className="comments-section no-print">
          <h3>Comments</h3>
          <textarea    className="comment-textarea" placeholder="Add a comment..."></textarea>
          <button>Post Comment</button>
        </div>
      </div>
    </div>
  );
}