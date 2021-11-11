from .base_model import db

class StudentAnswer(db.Model):
    __tablename__ = 'student_answers'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer)
    exam_id = db.Column(db.Integer)
    answer_indexes = db.Column(db.ARRAY(db.Integer))
    answer_texts = db.Column(db.ARRAY(db.String))

    def __init__(self, question_id, exam_id, answer_indexes, answer_texts):
        self.question_id = question_id
        self.exam_id = exam_id
        self.answer_index = answer_index
        self.answer_texts = answer_texts

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'question_id': self.question_id,
            'exam_id': self.exam_id,
            'answer_indexes': self.answer_indexes,
            'answer_texts': self.answer_texts
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
        answer_indexes = json_with_updates.get('answer_indexes')
        if answer_indexes is not None and answer_indexes != self.answer_indexes:
            self.answer_indexes = answer_indexes
            has_updates = True
        answer_texts = json_with_updates.get('answer_texts')
        if answer_texts is not None and answer_texts != self.answer_texts:
            self.answer_texts = answer_texts
            has_updates = True
        return has_updates
