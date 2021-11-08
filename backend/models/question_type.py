from .base_model import db

class QuestionType(db.Model):
    __tablename__ = 'question_types'

    id = db.Column(db.Integer, primary_key=True)
    question_type = db.Column(db.String(200))
    description = db.Column(db.String(200))

    def __init__(self, question_type, description=""):
        self.question_type = question_type
        self.description = description

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'question_type': self.question_type,
            'description': self.description
        }

    def update(self, json_with_updates):
        '''
        Updates question_type info.
        Returns True if some fields were updated and False otherwise.
        '''
        has_updates = False
        question_type = json_with_updates.get('question_type')
        if question_type is not None and question_type != self.question_type:
                self.question_type = question_type
                has_updates = True
        description = json_with_updates.get('description')
        if description is not None and description != self.description:
            self.description = description
            has_updates = True
        return has_updates
