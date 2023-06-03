from flask import *
from werkzeug.wrappers import response
from Model import model
from datetime import datetime
from ViewClasses import *

app = Flask(__name__)
app.config.from_object("config")
app.secret_key = app.config["SECRET_KEY"]

@app.route('/')
def logIn():

    # m = model(app.config["database"], app.config["host"],
    #           app.config["user"], app.config["password"], app.config["port"])
    return "/"

if __name__ == '__main__':
    app.run(debug = True)