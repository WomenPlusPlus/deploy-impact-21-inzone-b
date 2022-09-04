from .base_model import db, get_missing_field_name

class StudentAnswer(db.Model):
    __tablename__ = 'exam_answer'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('exam_questions.id'))
    exam_id = db.Column(db.Integer, db.ForeignKey('exam_sets.id'))
    answer_texts = db.Column(db.ARRAY(db.String))

    def __init__(self, question_id, exam_id, answer_texts):
        self.question_id = question_id
        self.exam_id = exam_id
        self.answer_texts = answer_texts

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'question_id': self.question_id,
            'exam_id': self.exam_id,
            'answer_texts': self.answer_texts
        }

    def update(self, json_with_updates):
        '''
        Updates student_answer info.
        Returns True if some fields were updated and False otherwise.
        '''
        has_updates = False
        answer_texts = json_with_updates.get('answer_texts')
        if answer_texts is not None and answer_texts != self.answer_texts:
            self.answer_texts = answer_texts
            has_updates = True
        return has_updates

    @staticmethod
    def create_from_json(content):
        '''
        Creates StudentAnswer object from input 'content'.
        If some mandatory fields are missing in 'content', returns an error message.
        '''
        missing_field = get_missing_field_name(
            content, ['question_id', 'exam_id', 'answer_texts'])
        if missing_field is not None:
            # there is at least 1 missing key in the input json, so we throw an error back
            return None, 'Invalid input: missing field \'{}\''.format(missing_field)
        # create a new student answer
        student_answer = StudentAnswer(
            question_id=content.get('question_id'),
            exam_id=content.get('exam_id'),
            answer_texts=content.get('answer_texts'))
        return student_answer, ''

    def unique_kwargs(self):
        return {'question_id': self.question_id, 'exam_id': self.exam_id}
