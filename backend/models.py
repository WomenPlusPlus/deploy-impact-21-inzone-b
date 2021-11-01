from  datetime import datetime
from flask_sqlalchemy import SQLAlchemy

# we define db object but we dont link it to the flask app yet
db = SQLAlchemy()
class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    joined_at = db.Column(db.DateTime())
    password = db.Column(db.String(200))

    def __init__(self, full_name, email, password):
        # we dont have to create the id because the db will do that automatically
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

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    description = db.Column(db.String(200))
    start_at = db.Column(db.DateTime())
    finish_at = db.Column(db.DateTime())
    number_of_credits = db.Column(db.Integer)

    def __init__(self, name, start_at, finish_at, description="", number_of_credits=0):
        # we dont have to create the id because the db will do that automatically
        self.name = name
        self.start_at = start_at
        self.finish_at = finish_at
        self.description = description
        self.number_of_credits = number_of_credits

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'start_at': self.start_at,
            'finish_at': self.finish_at,
            'number_of_credits': self.number_of_credits
        }