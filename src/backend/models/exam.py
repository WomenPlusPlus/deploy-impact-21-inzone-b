from .base_model import db, get_missing_field_name


class Exam(db.Model):
    __tablename__ = 'exams'

    id = db.Column(db.Integer, primary_key=True)
    exam_set_id = db.Column(db.Integer)
    student_id = db.Column(db.Integer)
    student_mark = db.Column(db.String(5))
    mark_entered_by = db.Column(db.String(200))
    opened_at = db.Column(db.DateTime())
    closed_at = db.Column(db.DateTime())
    duration_in_minutes = db.Column(db.Integer)
    taken_at = db.Column(db.DateTime())
    mark_entered_at = db.Column(db.DateTime())

    def __init__(self, exam_set_id, student_id, opened_at, closed_at, duration_in_minutes, 
    student_mark=None, mark_entered_by=None, taken_at=None, mark_entered_at=None):
        self.exam_set_id = exam_set_id
        self.student_id = student_id
        self.student_mark = student_mark
        self.mark_entered_by = mark_entered_by
        self.opened_at = opened_at
        self.closed_at = closed_at
        self.duration_in_minutes = duration_in_minutes
        self.taken_at = taken_at
        self.mark_entered_at = mark_entered_at

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'exam_set_id': self.exam_set_id,
            'student_id': self.student_id,
            'student_mark': self.student_mark,
            'mark_entered_by': self.mark_entered_by,
            'opened_at': self.opened_at,
            'closed_at': self.closed_at,
            'duration_in_minutes': self.duration_in_minutes,
            'taken_at': self.taken_at,
            'mark_entered_at': self.mark_entered_at
        }

    def update(self, json_with_updates):
        '''
        Updates exams info.
        Returns True if some fields were updated and False otherwise.
        '''
        has_updates = False
        exam_set_id = json_with_updates.get('exam_set_id')
        if exam_set_id is not None and exam_set_id != self.exam_set_id:
            self.exam_set_id = exam_set_id
            has_updates = True
        student_id = json_with_updates.get('student_id')
        if student_id is not None and student_id != self.student_id:
            self.student_id = student_id
            has_updates = True
        student_mark = json_with_updates.get('student_mark')
        # we allow student_mark to be None, so we should not check for None here
        if student_mark != self.student_mark:
            self.student_mark = student_mark
            has_updates = True
        mark_entered_by = json_with_updates.get('mark_entered_by')
        if mark_entered_by is not None and mark_entered_by != self.mark_entered_by:
            self.mark_entered_by = mark_entered_by
            has_updates = True
        opened_at = json_with_updates.get('opened_at')
        if opened_at is not None and opened_at != self.opened_at:
            self.opened_at = opened_at
            has_updates = True
        closed_at = json_with_updates.get('closed_at')
        if closed_at is not None and closed_at != self.closed_at:
            self.closed_at = closed_at
            has_updates = True
        duration_in_minutes = json_with_updates.get('duration_in_minutes')
        if duration_in_minutes is not None and duration_in_minutes != self.duration_in_minutes:
            self.duration_in_minutes = duration_in_minutes
            has_updates = True
        taken_at = json_with_updates.get('taken_at')
        # we allow taken_at to be None, so we should not check for None here
        if taken_at != self.taken_at:
            self.taken_at = taken_at
            has_updates = True
        mark_entered_at = json_with_updates.get('mark_entered_at')
        if mark_entered_at is not None and mark_entered_at != self.mark_entered_at:
            self.mark_entered_at = mark_entered_at
            has_updates = True
        return has_updates

    @staticmethod
    def create_from_json(content):
        '''
        Creates Exam object from input 'content'.
        If some mandatory fields are missing in 'content', returns an error message.
        '''
        missing_field = get_missing_field_name(
            content, ['exam_set_id', 'student_id', 'opened_at', 'closed_at', 'duration_in_minutes'])
        if missing_field is not None:
            # there is at least 1 missing key in the input json, so we throw an error back
            return None, 'Invalid input: missing field \'{}\''.format(missing_field)
        # create a new exam
        exam = Exam(
            exam_set_id=content.get('exam_set_id'),
            student_id=content.get('student_id'),
            opened_at=content.get('opened_at'),
            closed_at=content.get('closed_at'),
            duration_in_minutes=content.get('duration_in_minutes'))
        return exam, ''

    def unique_kwargs(self):
        return {'exam_set_id': self.exam_set_id, 'student_id': self.student_id}


