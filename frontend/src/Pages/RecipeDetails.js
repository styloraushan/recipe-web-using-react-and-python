// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Star, Save, Camera, Printer, Share } from "lucide-react";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import "../Pages/RecipeInfo.css";

// export default function RecipeInfo() {
//   const { recipe_id } = useParams();
//   const [food, setFood] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [photos, setPhotos] = useState([]);
//   const [unit, setUnit] = useState("metric");
//   const [showFileInput, setShowFileInput] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [username, setUsername] = useState("Guest");

//   // Fetch recipe, comments, and username
//   console.log("Recipe ID from useParams:", recipe_id);
//   useEffect(() => {
//     const storedUserId = localStorage.getItem("user_id");
//     if (storedUserId) {
//       setUserId(storedUserId);
//       axios.get(`http://localhost:5000/auth/user/${storedUserId}`)
//         .then(res => setUsername(res.data.username || "Guest"))
//         .catch(err => console.error("Error fetching user:", err));
//     }

//     const fetchRecipe = axios.get(`http://localhost:5000/recipes/api/allrecipes/${recipe_id}`);
//     const fetchComments = axios.get(`http://localhost:5000/recipes/api/comments/${recipe_id}`);

//     Promise.all([fetchRecipe, fetchComments])
//       .then(([recipeRes, commentsRes]) => {
//         setFood(recipeRes.data);
//         setComments(commentsRes.data);
//       })
//       .catch(error => console.error("Error fetching data:", error))
//       .finally(() => setLoading(false));
//   }, [recipe_id]);

//   // Handle photo upload
//   const handlePhotoUpload = (e) => {
//     const newPhotos = Array.from(e.target.files).map(file => URL.createObjectURL(file));
//     setPhotos(prev => [...prev, ...newPhotos]);
//     setShowFileInput(false);
//   };

//   // Print recipe
//   const handlePrint = () => window.print();

//   // Post a new comment
//   const postComment = async () => {
//     if (!newComment.trim() || !userId) return;

//     try {
//       const response = await axios.post("http://localhost:5000/recipes/api/comments", {
//         recipe_id,
//         user_id: userId,
//         content: newComment
//       });

//       setComments(prev => [response.data, ...prev]); // Update comments in real time
//       setNewComment("");
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };

//   if (loading) return <h2>Loading recipe...</h2>;
//   if (!food) return <h2>No recipe found.</h2>;

//   return (
//     <div>
//       <Navbar className="no-print" />
//       <div className="recipe-container">
//         <h3 className="recipe-title">{food.name}</h3>
//         <h2 className="recipe-subtitle">{food.description}</h2>

//         {/* Recipe Image */}
//         <div className="flex justify-center mt-3">
//           <img src={food.image} alt={food.name} className="recipe-image" />
//         </div>

//         {/* Uploaded Photos */}
//         {photos.length > 0 && (
//           <div className="uploaded-photos">
//             <h3 className="text-lg font-bold mb-2 text-orange-600">Uploaded Photos</h3>
//             <div className="grid grid-cols-3 gap-4">
//               {photos.map((photo, index) => (
//                 <img key={index} src={photo} alt={`Uploaded ${index + 1}`} className="uploaded-photo" />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Rating Stars */}
//         <div className="rating-stars no-print">
//           {[...Array(5)].map((_, i) => <Star key={i} className="star" />)}
//         </div>

//         {/* Action Buttons */}
//         <div className="action-buttons no-print">
//           <button><Save className="mr-2" /> Save</button>
//           <button className="primary">Try It</button>
//           <label>
//             <button onClick={() => setShowFileInput(!showFileInput)}>
//               <Camera className="mr-2" /> Add Photo
//             </button>
//             {showFileInput && <input type="file" accept="image/*" className="file-input" onChange={handlePhotoUpload} multiple />}
//           </label>
//           <button onClick={handlePrint}><Printer className="mr-2" /> Print</button>
//           <button><Share className="mr-2" /> Share</button>
//         </div>

//         {/* Cooking Details */}
//         <div className="cooking-details">
//           <div>Servings: {food.servings}</div>
//           <div>Prep: {food.prep_time}</div>
//           <div>Cook: {food.cook_time}</div>
//           <div>Ready: {food.ready_time}</div>
//         </div>

//         {/* Ingredients Table */}
//         <div className="mt-4">
//           <div className="flex justify-end space-x-2 no-print">
//             <button className={`border p-2 rounded-lg ${unit === "metric" ? "bg-orange-500 text-white" : "bg-gray-100"}`} onClick={() => setUnit("metric")}>
//               Metric
//             </button>
//             <button className={`border p-2 rounded-lg ${unit === "us" ? "bg-orange-500 text-white" : "bg-gray-100"}`} onClick={() => setUnit("us")}>
//               U.S.
//             </button>
//           </div>
//           <table className="ingredients-table">
//             <thead>
//               <tr>
//                 <th>Ingredient</th>
//                 <th>{unit === "metric" ? "Metric" : "U.S."}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {food.ingredients.map((ing, i) => (
//                 <tr key={i}>
//                   <td>{ing.ingredient}</td>
//                   <td>{unit === "metric" ? ing.metric : ing.us_measure}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Directions */}
//         <div className="directions">
//           <h3>Directions</h3>
//           <ol>
//             {food.directions.map((step, i) => <li key={i}>{step}</li>)}
//           </ol>
//         </div>

//         {/* Comments Section */}
//         <div className="comments-section no-print">
//           <h3>Comments</h3>
//           {comments.length > 0 ? (
//             comments.map(comment => (
//               <div key={comment.id} className="comment">
//                 <strong>{comment.username}</strong> <span>{comment.created_at.split("T")[0]}</span>
//                 <p>{comment.content}</p>
//               </div>
//             ))
//           ) : (
//             <p>No comments yet. Be the first to comment!</p>
//           )}
//           {/* New Comment Form */}
//           <textarea
//             placeholder="Add a comment..."
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             className="comment-textarea"
//           ></textarea>
//           <button onClick={postComment}>Post Comment</button>
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Save, Camera, Printer, Share } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../Pages/RecipeInfo.css";

export default function RecipeInfo() {
  const { recipe_id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [unit, setUnit] = useState("metric");
  const [showFileInput, setShowFileInput] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [recipeRes, commentsRes] = await Promise.all([
          axios.get(`http://localhost:5000/recipes/api/allrecipes/${recipe_id}`),
          axios.get(`http://localhost:5000/recipes/api/comments/${recipe_id}`)
        ]);

        setFood(recipeRes.data);
        setComments(commentsRes.data);

        if (userId) {
          const userRes = await axios.get(`http://localhost:5000/auth/user/${userId}`);
          setUsername(userRes.data.username || "Guest");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recipe_id, userId]);

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const newPhotos = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...newPhotos]);
    setShowFileInput(false);
  };

  // Print recipe
  const handlePrint = () => window.print();
  const [visibleComments, setVisibleComments] = useState(3); // Show first 5 comments initially

  // Post a new comment
  const postComment = async () => {
    if (!newComment.trim() || !userId) return;

    try {
      const response = await axios.post("http://localhost:5000/recipes/api/comments", {
        recipe_id,
        user_id: userId,
        content: newComment
      });

      setComments(prev => [response.data, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (loading) return <h2>Loading recipe...</h2>;
  if (!food) return <h2>No recipe found.</h2>;

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

        {/* Uploaded Photos */}
        {photos.length > 0 && (
          <div className="uploaded-photos">
            <h3 className="text-lg font-bold mb-2 text-orange-600">Uploaded Photos</h3>
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Uploaded ${index + 1}`} className="uploaded-photo" />
              ))}
            </div>
          </div>
        )}

        {/* Rating Stars */}
        <div className="rating-stars no-print">
          {[...Array(5)].map((_, i) => <Star key={i} className="star" />)}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons no-print">
          <button><Save className="mr-2" /> Save</button>
          <button className="primary">Try It</button>
          <label>
            <button onClick={() => setShowFileInput(!showFileInput)}>
              <Camera className="mr-2" /> Add Photo
            </button>
            {showFileInput && <input type="file" accept="image/*" className="file-input" onChange={handlePhotoUpload} multiple />}
          </label>
          <button onClick={handlePrint}><Printer className="mr-2" /> Print</button>
          <button><Share className="mr-2" /> Share</button>
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
            {food.directions.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>

        {/* Comments Section */}
        <div className="comments-section no-print">
          <h3>Comments</h3>
          {comments.length > 0 ? (
            <>
              {comments.slice(0, visibleComments).map(comment => (
                <div key={comment.id} className="comment">
                  <strong>{comment.username}</strong> <span>{comment.created_at.split("T")[0]}</span>
                  <p>{comment.content}</p>
                </div>
              ))}

              <div className="comment-buttons">
                {visibleComments < comments.length && (
                  <button className="see-more-btn" onClick={() => setVisibleComments(visibleComments + 2)}>
                    See More Comments
                  </button>
                )}

                {visibleComments > 5 && (
                  <button className="see-less-btn" onClick={() => setVisibleComments(2)}>
                    See Less Comments
                  </button>
                )}
              </div>
            </>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
          {/* New Comment Form */}
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-textarea"
          ></textarea>
          <button onClick={postComment} className="postcomment">Post Comment</button>
        </div>
      </div>
    </div>
  );
}
