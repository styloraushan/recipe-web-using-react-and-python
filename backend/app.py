from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import mysql.connector
from routes import auth_routes , feedback_routes , recipe_routes  # Import routes from routes.py
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
bcrypt = Bcrypt(app)

# Database Connection
db = mysql.connector.connect(
    host=app.config["DB_HOST"],
    user=app.config["DB_USER"],
    password=app.config["DB_PASSWORD"],
    database=app.config["DB_NAME"]
)
cursor = db.cursor()

# Register Routes
app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(feedback_routes, url_prefix='/feedback')
app.register_blueprint(recipe_routes, url_prefix='/recipes')



if __name__ == '__main__':
    app.run(debug=True)
