import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig
from flask_migrate import Migrate
from datetime import datetime
import uuid
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)

app.config.from_object(DevelopmentConfig)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] =  False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    joined_at = db.Column(db.DateTime())
    password = db.Column(db.String(200))

    def __init__(self, full_name, email, password):
        self.id = 1 # 2 bytes
        while Student.query.filter_by(id=self.id).first() is not None:
            self.id = uuid.uuid4().fields[1]
        self.full_name = full_name
        self.email = email
        self.joined_at = datetime.now()
        self.password = password
        

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'joined_at': self.joined_at,
            'password': self.password
        }


@app.route("/")
def hello():
    return "Hello World!"

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
    
@app.route("/register", methods=["POST"])
def register():
    if not request.is_json:
        return "Error: input is not json."
    content = request.get_json()
    fullName = content["fullName"]
    email = content["email"]
    password = generate_password_hash(content["password"])
    try:
        student=Student(
            full_name=fullName,
            email=email,
            password=password
        )
        db.session.add(student)
        db.session.commit()
        return "Student registered: {}".format(student.serialize())
    except Exception as e:
        return(str(e))

if __name__ == '__main__':
    app.run()
