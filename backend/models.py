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
    course_name = db.Column(db.String(200))
    course_location = db.Column(db.String(200))
    language = db.Column(db.String(200))
    first_query_done = db.Column(db.Boolean)
    validated_by_admin = db.Column(db.Boolean)

    def __init__(self, full_name, email, password, course_name, course_location, language, first_query_done = False, validated_by_admin = False):
        # we dont have to create the id because the db will do that automatically
        self.full_name = full_name
        self.email = email
        self.joined_at = datetime.now()
        self.password = password
        self.course_name = course_name
        self.course_location = course_location
        self.language = language
        self.first_query_done = first_query_done
        self.validated_by_admin = validated_by_admin

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'joined_at': self.joined_at,
            'password': self.password,
            'course_name': self.course_name,
            'course_location': self.course_location,
            'language': self.language,
            'first_query_done': self.first_query_done,
            'validated_by_admin': self.validated_by_admin
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

class RoleType(db.Model):
    __tablename__ = 'role_types'

    id = db.Column(db.Integer, primary_key=True)
    role_type = db.Column(db.String(200))

    def __init__(self, role_type):
        # we dont have to create the id because the db will do that automatically
        self.role_type = role_type

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'role_type': self.role_type
        }

class CourseLocation(db.Model):
    __tablename__ = 'course_locations'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(200))
    country = db.Column(db.String(200))

    def __init__(self, location, country):
        # we dont have to create the id because the db will do that automatically
        self.location = location
        self.country = country

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'location': self.location,
            'country': self.country
        }

class SupportedLanguages(db.Model):
    __tablename__ = 'supported_languages'

    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(200))

    def __init__(self, language):
        # we dont have to create the id because the db will do that automatically
        self.language = language

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'language': self.language
        }
