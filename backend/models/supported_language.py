from datetime import datetime
from .base_model import db

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
