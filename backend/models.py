from app import db

class Student(db.Model):
    __tablename__ = 'public.students'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    joined_at = db.Column(db.DateTime())

    def __init__(self, full_name, email, published):
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
