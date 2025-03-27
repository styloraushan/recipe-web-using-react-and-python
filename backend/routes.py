from flask import Flask, Blueprint, request, jsonify,session
from flask_bcrypt import Bcrypt
import mysql.connector
import requests
from config import Config 
from datetime import datetime

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
def get_apirecipes(ingredients, diet):
    url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {
        "apiKey": "9cfad92bb48d4c398dbf066de10f40f5",  # API Key
        #  "apiKey": "7a2ffaf6ded749ff8ab77a86ef88989d",  # API Key
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
    
    recipes = get_apirecipes(ingredients, diet)
    return jsonify(recipes)


# Define Blueprint for Feedback Routes
feedback_routes = Blueprint('feedback_routes', __name__)

# API to Submit Feedback
@feedback_routes.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    email = data.get('email')
    message = data.get('message')

    if not email or not message:
        return jsonify({'error': 'Email and message are required'}), 400

    try:
        cur = db.cursor()
        cur.execute("INSERT INTO feedback (email, message) VALUES (%s, %s)", (email, message))
        db.commit()
        cur.close()
        return jsonify({'message': 'Feedback submitted successfully'}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

# API to Get All Feedback
@feedback_routes.route('/api/feedback', methods=['GET'])
def get_feedback():
    try:
        cur = db.cursor()
        cur.execute("SELECT id, email, message, created_at FROM feedback ORDER BY created_at DESC")
        feedbacks = cur.fetchall()
        cur.close()

        feedback_list = [
            {
                'id': feedback[0],
                'email': feedback[1],
                'message': feedback[2],
                'created_at': feedback[3].strftime("%Y-%m-%d %H:%M:%S")
            }
            for feedback in feedbacks
        ]

        return jsonify(feedback_list)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

# Register Blueprints
app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(feedback_routes, url_prefix="/feedback")

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)


recipe_routes = Blueprint("recipe_routes", __name__)



@recipe_routes.route("/api/recipes", methods=["POST"])
def add_recipe():
    data = request.get_json()

    if "user_id" not in data:
        return jsonify({"error": "user_id is required"}), 400  # Ensure user_id is included

    try:
        sql = """
        INSERT INTO recipes (name, image, description, servings, prep_time, cook_time, ready_time, category, user_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data["name"], data["image"], data["description"], data["servings"], 
            data["prep_time"], data["cook_time"], data["ready_time"], data["category"], 
            data["user_id"]
        )
        cursor.execute(sql, values)
        recipe_id = cursor.lastrowid

        # Insert Ingredients
        for ing in data["ingredients"]:
            cursor.execute("INSERT INTO ingredients (recipe_id, ingredient, metric, us_measure) VALUES (%s, %s, %s, %s)", 
                           (recipe_id, ing["ingredient"], ing["metric"], ing["us"]))

        # Insert Directions
        for step_number, instruction in enumerate(data["directions"], start=1):
            cursor.execute("INSERT INTO directions (recipe_id, step_number, instruction) VALUES (%s, %s, %s)", 
                           (recipe_id, step_number, instruction))

        db.commit()
        return jsonify({"message": "Recipe added successfully!"}), 201

    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    

# API to Get All Recipes
@recipe_routes.route("/api/recipes", methods=["GET"])
def get_recipes():
    cursor.execute("SELECT * FROM recipes ORDER BY created_at DESC")
    recipes = cursor.fetchall()
    return jsonify(recipes)


# API to Get a Single Recipe (with Ingredients & Directions)
@recipe_routes.route("/api/recipes/<int:recipe_id>", methods=["GET"])
def get_recipe(recipe_id):
    cursor.execute("SELECT * FROM recipes WHERE id = %s", (recipe_id,))
    recipe = cursor.fetchone()

    if not recipe:
        return jsonify({"error": "Recipe not found"}), 404

    # Get Ingredients
    cursor.execute("SELECT ingredient, metric, us_measure FROM ingredients WHERE recipe_id = %s", (recipe_id,))
    ingredients = cursor.fetchall()

    # Get Directions
    cursor.execute("SELECT step_number, instruction FROM directions WHERE recipe_id = %s ORDER BY step_number", (recipe_id,))
    directions = cursor.fetchall()

    recipe["ingredients"] = ingredients
    recipe["directions"] = [step["instruction"] for step in directions]

    return jsonify(recipe)


# API to Delete a Recipe
@recipe_routes.route("/api/recipes/<int:recipe_id>", methods=["DELETE"])
def delete_recipe(recipe_id):
    try:
        cursor.execute("DELETE FROM recipes WHERE id = %s", (recipe_id,))
        db.commit()
        return jsonify({"message": "Recipe deleted successfully"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500
    

#  Recipe Fetching API
@recipe_routes.route("/api/recipe-list", methods=["GET"])
def fetch_recipe_summaries():
    try:
        cursor.execute("SELECT name, image, description FROM recipes")  # Fetch only required fields
        rows = cursor.fetchall()

        recipes = [{"name": row[0], "image": row[1], "description": row[2]} for row in rows]

        return jsonify(recipes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)


@recipe_routes.route("/api/allrecipes", methods=["GET"])
def get_all_recipes():
    try:
        cursor = db.cursor(dictionary=True)  # ✅ Fetch data as dictionaries

        # Fetch all recipes
        cursor.execute("""
            SELECT id, name, image, description, servings, prep_time, cook_time, ready_time, category 
            FROM recipes ORDER BY created_at DESC
        """)
        recipes = cursor.fetchall()

        if not recipes:
            return jsonify({"message": "No recipes found"}), 404

        # Fetch all ingredients and directions for each recipe
        for recipe in recipes:
            recipe_id = recipe["id"]

            # Fetch ingredients
            cursor.execute("""
                SELECT ingredient, metric, us_measure 
                FROM ingredients WHERE recipe_id = %s
            """, (recipe_id,))
            recipe["ingredients"] = cursor.fetchall() or []

            # Fetch directions
            cursor.execute("""
                SELECT step_number, instruction 
                FROM directions WHERE recipe_id = %s ORDER BY step_number
            """, (recipe_id,))
            recipe["directions"] = [step["instruction"] for step in cursor.fetchall()] or []

        return jsonify(recipes), 200

    except Exception as e:
        print("Error fetching recipes:", str(e))  # Debugging
        return jsonify({"error": "Internal Server Error"}), 500


@recipe_routes.route("/api/allrecipes/<int:recipe_id>", methods=["GET"])
def get_singlerecipe(recipe_id):
    try:
        cursor = db.cursor(dictionary=True)  

        # Fetch the main recipe details
        cursor.execute("""
            SELECT id, name, image, description, servings, prep_time, cook_time, ready_time, category 
            FROM recipes WHERE id = %s
        """, (recipe_id,))
        recipe = cursor.fetchone()

        if not recipe:
            return jsonify({"error": "Recipe not found"}), 404

        # Fetch ingredients
        cursor.execute("""
            SELECT ingredient, metric, us_measure 
            FROM ingredients WHERE recipe_id = %s
        """, (recipe_id,))
        recipe["ingredients"] = cursor.fetchall() or []

        # Fetch directions
        cursor.execute("""
            SELECT step_number, instruction 
            FROM directions WHERE recipe_id = %s ORDER BY step_number
        """, (recipe_id,))
        recipe["directions"] = [step["instruction"] for step in cursor.fetchall()] or []

        return jsonify(recipe), 200

    except Exception as e:
        print("Error fetching recipe:", str(e))  # Debugging
        return jsonify({"error": "Internal Server Error"}), 500
    


@recipe_routes.route("/api/user-recipes/<int:user_id>", methods=["GET"])
def get_user_recipes(user_id):
    cursor.execute("SELECT * FROM recipes WHERE user_id = %s ORDER BY created_at DESC", (user_id,))
    recipes = cursor.fetchall()
    return jsonify(recipes)


@recipe_routes.route("/api/delete-recipe/<int:recipe_id>", methods=["DELETE"])
def delete_userrecipe(recipe_id):
    try:
        cursor.execute("DELETE FROM recipes WHERE id = %s", (recipe_id,))
        db.commit()
        return jsonify({"message": "Recipe deleted successfully!"}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500


@recipe_routes.route('/save-recipe', methods=['POST'])
def save_recipe():
    data = request.json
    user_id = data.get('user_id')
    recipe_id = data.get('recipe_id')

    if not user_id or not recipe_id:
        return jsonify({"error": "Missing user_id or recipe_id"}), 400

    try:
        # Check if already saved
        cursor.execute("SELECT * FROM saved_recipes WHERE user_id = %s AND recipe_id = %s", (user_id, recipe_id))
        existing = cursor.fetchone()
        if existing:
            return jsonify({"message": "Recipe already saved!"}), 200

        cursor.execute(
            "INSERT INTO saved_recipes (user_id, recipe_id) VALUES (%s, %s)",
            (user_id, recipe_id)
        )
        db.commit()
        return jsonify({"message": "Recipe saved successfully!"}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)




@recipe_routes.route('/saved-recipes/<int:user_id>', methods=['GET'])
def get_saved_recipes(user_id):
    try:
        cursor.execute("""
            SELECT r.id, r.name, r.image, r.description, r.category 
            FROM saved_recipes sr
            JOIN recipes r ON sr.recipe_id = r.id
            WHERE sr.user_id = %s
        """, (user_id,))
        
        saved_recipes = cursor.fetchall()
        
        recipes_list = [
            {
                "id": recipe[0],
                "name": recipe[1],
                "image": recipe[2],
                "description": recipe[3],
                "category": recipe[4]
            } 
            for recipe in saved_recipes
        ]
        
        return jsonify(recipes_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@recipe_routes.route('/api/comments', methods=['POST'])
def post_comment():
    try:
        data = request.get_json()
        recipe_id = data.get("recipe_id")
        user_id = data.get("user_id")  
        content = data.get("content")

        if not all([recipe_id, user_id, content]):
            return jsonify({"error": "Missing required fields"}), 400

        created_at = datetime.utcnow()  # Use UTC for consistency

        # Insert into database
        with db.cursor() as cursor:
            cursor.execute(
                "INSERT INTO comment (recipe_id, user_id, content, created_at) VALUES (%s, %s, %s, %s)",
                (recipe_id, user_id, content, created_at)
            )
            db.commit()
            new_id = cursor.lastrowid

            # Fetch username dynamically
            cursor.execute("SELECT username FROM users WHERE id = %s", (user_id,))
            user = cursor.fetchone()
            username = user[0] if user else "Unknown"

        return jsonify({
            "id": new_id,
            "recipe_id": recipe_id,
            "user_id": user_id,
            "username": username,
            "content": content,
            "created_at": created_at.isoformat()
        }), 201

    except mysql.connector.Error as e:
        db.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@recipe_routes.route('/api/comments/<int:recipe_id>', methods=['GET'])
def get_comments(recipe_id):
    try:
        with db.cursor() as cursor:
            cursor.execute("""
                SELECT c.id, c.recipe_id, u.username, c.content, c.created_at 
                FROM comment c
                JOIN users u ON c.user_id = u.id
                WHERE c.recipe_id = %s
                ORDER BY c.created_at DESC
            """, (recipe_id,))
            
            comments = cursor.fetchall()

        comments_list = [
            {
                "id": row[0],
                "recipe_id": row[1],
                "username": row[2],  
                "content": row[3],
                "created_at": row[4].isoformat() if row[4] else None
            }
            for row in comments
        ]

        return jsonify(comments_list), 200

    except mysql.connector.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500