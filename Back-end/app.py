from flask import *
from flask_session import Session
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
from BusinessObjects import *
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

@app.route('/SignUpPersonalInfo', methods=["POST"])
def SignUpPersonalInfo():
    pass

# Running app
if __name__ == '__main__':
    app.run(debug=True)