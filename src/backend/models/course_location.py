from datetime import datetime
from .base_model import db

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