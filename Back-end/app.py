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

@app.route("/allCategories", methods=["Get"])
def AllCategories() :
    m = model(app.config["DB_IP"], app.config["DB_USER"],
              app.config["DB_PASSWORD"], app.config["DATABASE"])
    return jsonify(m.getCategories())
    
@app.route('/SignUpData', methods=["POST"])
def Register():
    FullName = request.json.get("fullName")
    Email = request.json.get("usernameSignUp")
    Password = request.json.get("passwordSignUp")
    PhoneNo = request.json.get("phoneNo")
    c = Users(0, FullName, Email, Password, PhoneNo)
    m = model(app.config["DB_IP"], app.config["DB_USER"],
              app.config["DB_PASSWORD"], app.config["DATABASE"])
    if m.checkUserExist(Email) :
        return jsonify({"error": "User already exist"}), 401
    
    if m.insertUser(c) :
        user_id = m.getUserID(Email)
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
        return jsonify({"error": "User doesn't exist"}), 401
    user_id = m.validatePassword(Email, Password)
    if user_id == -1:
        return jsonify({"error": "Invalid Password"}), 401    
    else:
        access_token = create_access_token(identity=user_id)
        return jsonify(access_token=access_token), 200
   
@app.route("/AddEvent", methods=["POST"])
def AddEvent():
    UserCreated =  get_jwt_identity()
    Title = request.json.get("selectedtitle")
    Description = request.json.get("selectedeventDesc")
    Capacity = request.json.get("selectedCapacity")
    Recursive = request.json.get("selectedrecursive")
    f = request.files.get("Poster")
    Poster = f"Static\Poster\{UserCreated}_{Title}_{Description}.pdf"
    if Path(Poster).is_file():
        os.remove(Poster)
    f.save(Poster)
    Date = request.json.get("selectedeventDate")
    Time = request.json.get("selectedtime")
    Duration = request.json.get("selectedDuration")
    event = Events(0, UserCreated, Title, Description, Poster, CatID, Capacity,Date, Time, Duration, Recursive)
    m = model(app.config["DB_IP"], app.config["DB_USER"],
              app.config["DB_PASSWORD"], app.config["DATABASE"])
    CatID = m.getCatID(request.json.get("selectedCats"))
    m.insertEvent(event)

# snd mail
    return 200

@app.route("/Feed", methods=["GET"])
def Feed():
    # user_id =  get_jwt_identity()
    user_id =  1
    m = model(app.config["DB_IP"], app.config["DB_USER"],
              app.config["DB_PASSWORD"], app.config["DATABASE"])
    data = m.getEventsOfOthers(user_id)
    return jsonify(data)

# Running app
if __name__ == '__main__':
    app.run(debug=True)