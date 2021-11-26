from datetime import datetime
from .base_model import db

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