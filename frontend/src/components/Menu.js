import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Menu.css'; // Import the CSS for the styling

const Menu = () => {
  return (
    <div>
      <Navbar />
      <div className="menu-container">
        <div className="menu-grid">
        <section>
            <h2>Go to</h2>
            <ul>
              <li><Link to="/recipe/20-minute-chicken">Recipes</Link></li>
              <li><Link to="/recipe/bread-machine">Trending</Link></li>
              <li><Link to="/recipe/chicken">With Photos</Link></li>
            </ul>
          </section>
         
         

          <section>
            <h2>My Recipes box</h2>
            <ul>
              <li><Link to="/trending/quick-recipes">Recipes box</Link></li>
              <li><Link to="/trending/popular">Recipes I want to try</Link></li>
              <li><Link to="/recipe/chicken">Recipes i've made </Link></li>
            </ul>
          </section>

          <section>
            <h2>Ingredient Library</h2>
            <ul>
              <li><Link to="/ingredient/eggs">Eggs</Link></li>
              <li><Link to="/ingredient/chicken">Chicken</Link></li>
              <li><Link to="/ingredient/bread">Bread</Link></li>
            </ul>
          </section>

          <section>
            <h2>News</h2>
            <ul>
              <li><Link to="/news/celebrity">Celebrity News</Link></li>
              <li><Link to="/news/industry">Food Industry News</Link></li>
              <li><Link to="/news/healthy-living">Healthy Living News</Link></li>
            </ul>
          </section>
          <section>
            <h2>Search By</h2>
            <ul>
              <li><Link to="/recipe/20-minute-chicken">by Ingredients</Link></li>
              <li><Link to="/recipe/bread-machine">by Tag</Link></li>
              <li><Link to="/recipe/chicken">by Title</Link></li>
            </ul>
          </section>
          <section>
            <h2>References</h2>
            <ul>
              <li><Link to="/guides/gravy-survival">Approximent cooking Equivalent</Link></li>
              <li><Link to="/guides/chicken-roasting">Australian Cooking Management</Link></li>
              <li><Link to="/guides/pork-cooking">Pork Cooking Guide</Link></li>
            </ul>
          </section>
          <section>
            <h2>Guides</h2>
            <ul>
              <li><Link to="/guides/gravy-survival">Gravy Survival Guide</Link></li>
              <li><Link to="/guides/chicken-roasting">Roasting Chicken Guide</Link></li>
              <li><Link to="/guides/pork-cooking">Pork Cooking Guide</Link></li>
            </ul>
          </section>
          <section>
            <h2>More</h2>
            <ul>
              <li><Link to="/recipe/20-minute-chicken">A to Z - Recipes</Link></li>
              <li><Link to="/recipe/bread-machine">Ingredients</Link></li>
              <li><Link to="/recipe/chicken">Recipes</Link></li>
              <li><Link to="/recipe/chicken"> New Recipes</Link></li>
              <li><Link to="/recipe/chicken">Trending </Link></li>
              <li><Link to="/recipe/chicken">With Photos</Link></li>
            </ul>
          </section>
          <section>
            <h2>Favourites</h2>
            <ul>
              <li><Link to="/recipe/20-minute-chicken">20 Minute Chicken</Link></li>
              <li><Link to="/recipe/bread-machine">Bread Machine Recipes</Link></li>
              <li><Link to="/recipe/chicken">Chicken Recipes</Link></li>
              <li><Link to="/recipe/cookie">Cookie Recipes</Link></li>
              <li><Link to="/recipe/crockpot">Crockpot™ Recipes</Link></li>
              <li><Link to="/recipe/ground-beef">Ground Beef Recipes</Link></li>
              <li><Link to="/recipe/healthy">Healthy Recipes</Link></li>
              <li><Link to="/recipe/pork-chop">Pork Chop Recipes</Link></li>
              <li><Link to="/recipe/shrimp">Shrimp Recipes</Link></li>
              <li><Link to="/recipe/vegetarian">Vegetarian Recipes</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Menu;
