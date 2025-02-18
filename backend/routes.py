from flask import Flask, Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
import mysql.connector
import requests
from config import Config 

# Initialize Flask app and bcrypt
app = Flask(__name__)
bcrypt = Bcrypt(app)

# Database Connection
db = mysql.connector.connect(
    host=Config.DB_HOST,
    user=Config.DB_USER,
    password=Config.DB_PASSWORD,
    database=Config.DB_NAME
)
cursor = db.cursor()

# Define Blueprint for auth routes
auth_routes = Blueprint('auth_routes', __name__)

# Signup Route
@auth_routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    try:
        cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)", 
                      (username, email, password))
        db.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except:
        return jsonify({"error": "User already exists"}), 400

# Login Route
@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    cursor.execute("SELECT id, password_hash FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user and bcrypt.check_password_hash(user[1], password):
        return jsonify({"message": "Login successful", "user_id": user[0]})
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Get User Details Route
@auth_routes.route('/user/<int:user_id>', methods=['GET'])
def get_user_details(user_id):
    try:
        cursor.execute("SELECT username, email FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()

        if user:
            return jsonify({
                "user_id": user_id,
                "username": user[0],
                "email": user[1]
            })
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update User Details Route
@auth_routes.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    new_username = data.get('username')
    new_email = data.get('email')

    try:
        cursor.execute("UPDATE users SET username = %s, email = %s WHERE id = %s", 
                      (new_username, new_email, user_id))
        db.commit()

        if cursor.rowcount:
            return jsonify({"message": "User details updated successfully"})
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete User Route
@auth_routes.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        db.commit()

        if cursor.rowcount:
            return jsonify({"message": "User deleted successfully"})
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get All Users Route
@auth_routes.route('/users', methods=['GET'])
def get_all_users():
    try:
        cursor.execute("SELECT id, username, email FROM users")
        users = cursor.fetchall()

        user_list = [{"user_id": user[0], "username": user[1], "email": user[2]} for user in users]
        return jsonify({"users": user_list})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Function to fetch recipes
def get_recipes(ingredients, diet):
    url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {
        # "apiKey": "9cfad92bb48d4c398dbf066de10f40f5",  # API Key
         "apiKey": "7a2ffaf6ded749ff8ab77a86ef88989d",  # API Key
        "query": ingredients,
        "diet": diet if diet != "None" else "",
        "number": 10,
        "addRecipeInformation": True
    }
    response = requests.get(url, params=params)
    return response.json() if response.status_code == 200 else {"error": "API request failed"}

# Route to handle recipe search
@auth_routes.route('/api/search', methods=['POST'])
def search():
    data = request.get_json()
    ingredients = data.get("ingredients")
    diet = data.get("diet")
    
    recipes = get_recipes(ingredients, diet)
    return jsonify(recipes)

# Register Blueprint for authentication routes
app.register_blueprint(auth_routes)

if __name__ == "__main__":
    app.run(debug=True)
