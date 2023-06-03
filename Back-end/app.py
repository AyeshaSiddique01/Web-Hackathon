from flask import *
from werkzeug.wrappers import response
from Model import model
from datetime import datetime
from flask_cors import CORS
from fileinput import filename
import os
from pathlib import Path
import smtplib
import ssl
import random
import string
from flask_mail import Mail, Message
from ViewClasses import *
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity


app = Flask(__name__)
app.config['SECRET_KEY'] = "MYSECRETKEY"
# Initialize Flask-Session
# app.config['SESSION_TYPE'] = 'filesystem'
# Session(app)
# CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config.from_object("config")
app.config['JWT_SECRET_KEY'] = 'super-secret'


app.config['JWT_SECRET_KEY'] = 'super-secret'
jwt = JWTManager(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'elite.express243@gmail.com'
app.config['MAIL_PASSWORD'] = 'njsopxyyzkkssixt'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

app.config['MAIL_DEFAULT_SENDER'] = "elite.express243@gmail.com"
mail = Mail(app) 
verification_code = "".join(random.choices(string.ascii_letters+string.digits,k=10))

@app.route('/SignUpData', methods=["POST"])
def Register():
    FullName = request.json.get("fullName")
    Email = request.json.get("usernameSignUp")
    Password = request.json.get("passwordSignUp")
    PhoneNo = request.json.get("phoneNo")
    c = Users(0, FullName, Email, Password, PhoneNo)
    print(c.Email)
    m = model(app.config["DB_IP"], app.config["DB_USER"],
              app.config["DB_PASSWORD"], app.config["DATABASE"])
    if m.checkUserExist(Email) :
        print("User already exist")
        return jsonify({"error": "User already exist"}), 401
    user_id = m.insertUser(c)
    if user_id != -1 :
        print("yes")
        access_token = create_access_token(identity=user_id)
        return jsonify(access_token=access_token), 200
    else :
        print("Error in insertion")
        return jsonify({"error": "Error in insertion"}), 401

@app.route("/loginData", methods=["POST"])
def logIn() :
    Email = request.json.get("username")
    Password = request.json.get("password")
    m = model(app.config["DB_IP"], app.config["DB_USER"],
              app.config["DB_PASSWORD"], app.config["DATABASE"])
    
    if not m.checkUserExist(Email):
        print("User doesn't exist")
        return jsonify({"error": "User doesn't exist"}), 401
    user_id = m.validatePassword(Email, Password)
    if user_id == -1:
        print("Invalid Password")
        return jsonify({"error": "Invalid Password"}), 401    
    else:
        print("login")
        access_token = create_access_token(identity=user_id)
        return jsonify(access_token=access_token), 200
   
# Running app
if __name__ == '__main__':
    app.run(debug=True)