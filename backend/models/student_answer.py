from .base_model import db

class StudentAnswer(db.Model):
    __tablename__ = 'student_answers'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer)
    exam_id = db.Column(db.Integer)
    answer_index = db.Column(db.Integer)
    answer_text = db.Column(db.String(200))

    def __init__(self, question_id, exam_id, answer_index, answer_text):
        self.question_id = question_id
        self.exam_id = exam_id
        self.answer_index = answer_index
        self.answer_text = answer_text

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'question_id': self.question_id,
            'exam_id': self.exam_id,
            'answer_index': self.answer_index,
            'answer_text': self.answer_text
        }

    def update(self, json_with_updates):
        '''
        Updates student_answer info.
        Returns True if some fields were updated and False otherwise.
        '''
        has_updates = False
        question_id = json_with_updates.get('question_id')
        if question_id is not None and question_id != self.question_id:
                self.question_id = question_id
                has_updates = True
        exam_id = json_with_updates.get('exam_id')
        if exam_id is not None and exam_id != self.exam_id:
            self.exam_id = exam_id
            has_updates = True
        answer_index = json_with_updates.get('answer_index')
        if answer_index is not None and answer_index != self.answer_index:
            self.answer_index = answer_index
            has_updates = True
        answer_text = json_with_updates.get('answer_text')
        if answer_text is not None and answer_text != self.answer_text:
            self.answer_text = answer_text
            has_updates = True
        return has_updates
