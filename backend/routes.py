from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
import mysql.connector
from config import Config 

auth_routes = Blueprint('auth_routes', __name__)
bcrypt = Bcrypt()

# Database Connection
db = mysql.connector.connect(
    host=Config.DB_HOST,
    user=Config.DB_USER,
    password=Config.DB_PASSWORD,
    database=Config.DB_NAME
)
cursor = db.cursor()

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
