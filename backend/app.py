import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig
from flask_migrate import Migrate

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

    def __init__(self, full_name, email, joined_at):
        self.full_name = full_name
        self.email = email
        self.joined_at = joined_at

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'joined_at':self.joined_at
        }


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
