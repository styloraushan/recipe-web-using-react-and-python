# Online Recipe Finder

## Overview
The **Online Recipe Finder** is a web application designed to help users discover and explore new recipes based on their personal preferences, dietary needs, and available ingredients. It leverages external APIs to provide users with a wide variety of recipes, along with nutritional information and cooking instructions.

## Features
- **Ingredient-Based Recipe Search**: Users can input available ingredients to find suitable recipes.
- **Cuisine and Dietary Filters**: Filter recipes based on cuisine type, dietary restrictions (e.g., vegan, gluten-free, low-carb), and cooking time.
- **User Authentication**: Users can sign up and log in to save their favorite recipes.
- **Recipe Submission**: Users can contribute their own recipes to the platform.
- **Shopping List Generator**: Generate shopping lists based on selected recipes.
- **Social Sharing**: Share recipes via social media platforms.

## Technology Stack
### Frontend
- React.js
- HTML, CSS, JavaScript

### Backend
- Python (Flask)
- MySQL
- Spoonacular API (for fetching recipes)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Python & Flask
- MySQL

### Setup Instructions
1. **Clone the repository:**
   ```sh
   git clone https://github.com/styloraushan/recipe-web-using-react-and-python
   cd online-recipe-finder
   ```
2. **Install frontend dependencies:**
   ```sh
   cd frontend
   npm install
   ```
3. **Start the frontend server:**
   ```sh
   npm start
   ```
4. **Set up the backend:**
   ```sh
   cd backend
   pip install -r requirements.txt
   ```
5. **Run the Flask server:**
   ```sh
   python app.py
   ```
6. **Set up MySQL database:**
   - Create a database named `recipe_finder`.
   - Run the provided `schema.sql` file to set up tables.

## Usage
- Open `http://localhost:3000/` in your browser to access the application.
- Register/Login to personalize your experience.
- Search for recipes by ingredients, cuisine, or dietary needs.
- Save and share your favorite recipes.

## Contributors
- **Raushan Kumar** (3502110549)
- **Pragya Aastha** (3502110542)
- **Saurabh Kr. Singh** (3502110555)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
