from .base_model import db

class ExamQuestion(db.Model):
    __tablename__ = 'exam_questions'

    id = db.Column(db.Integer, primary_key=True)
    exam_set_id = db.Column(db.Integer)
    question_type = db.Column(db.String(200))
    question_content = db.Column(db.String(200))
    possible_answers = db.Column(db.String(200))

    def __init__(self, exam_set_id, question_type, question_content, possible_answers):
        self.exam_set_id = exam_set_id
        self.question_type = question_type
        self.question_content = question_content
        self.possible_answers = possible_answers

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'exam_set_id': self.exam_set_id,
            'question_type': self.question_type,
            'question_content': self.question_content,
            'possible_answers': self.possible_answers
        }

    def update(self, json_with_updates):
        '''
        Updates exam_question info.
        Returns True if some fields were updated and False otherwise.
        '''
        has_updates = False
        exam_set_id = json_with_updates.get('exam_set_id')
        if exam_set_id is not None and exam_set_id != self.exam_set_id:
                self.exam_set_id = exam_set_id
                has_updates = True
        question_type = json_with_updates.get('question_type')
        if question_type is not None and question_type != self.question_type:
            self.question_type = question_type
            has_updates = True
        question_content = json_with_updates.get('question_content')
        if question_content is not None and question_content != self.question_content:
            self.question_content = question_content
            has_updates = True
        possible_answers = json_with_updates.get('possible_answers')
        if possible_answers is not None and possible_answers != self.possible_answers:
            self.possible_answers = possible_answers
            has_updates = True
        return has_updates
