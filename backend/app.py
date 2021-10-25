import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig

app = Flask(__name__)

app.config.from_object(DevelopmentConfig)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] =  False
db = SQLAlchemy(app)

from models import Student

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/add")
def add_student():
    return "not supported"

@app.route("/getall")
def get_all():
    try:
        students=Student.query.all()
        return  jsonify([e.serialize() for e in students])
    except Exception as e:
        return(str(e))

@app.route("/get/<id_>")
def get_by_id(id_):
    try:
        student=Student.query.filter_by(id=id_).first()
        return jsonify(student.serialize())
    except Exception as e:
        return(str(e))

if __name__ == '__main__':
    app.run()
