import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import Menu from "./components/Menu";
import Profile from "./components/Profile";
import ViewProfile from "./components/ViewProfile";
import Ingredient from "./components/Ingredient";
import Footer from "./components/Footer";
import RecipeGrid from "./components/RecipeGrid";
import ProTips from "./components/ProTips";
import Recipes from "./components/Recipes";
import Result from "./components/Result";
import Home from "./components/Home";
import RecipeInfo from "./Pages/RecipeInfo";
import UpdateUser from "./Pages/UpdateUser"
import AllRecipes from "./Pages/AllRecipes";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Recipes />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/searchbar" element={<SearchBar />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/viewprofile" element={<ViewProfile />} />
                <Route path="/ingredients" element={<Ingredient />} />
                <Route path="/protips" element={<ProTips />} />
                <Route path="/recipegrid" element={<RecipeGrid />} />
                <Route path="/results" element={<Result />} /> {/* ✅ FIXED */}
                <Route path="/home" element={<Home />} />
                <Route path="/recipeinfo" element={<RecipeInfo />} />
                {/* <Route path="/update/:user_id" element={<UpdateUser />} /> */}
                <Route path="/viewprofile/*" element={<ViewProfile />} />
<Route path="/update/:user_id" element={<ViewProfile />} />
<Route path="/allrecipes" element={<AllRecipes />} />
             
            </Routes>
        </Router>
    );
}

export default App;
