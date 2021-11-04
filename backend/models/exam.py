from .base_model import db


class Exam(db.Model):
    __tablename__ = 'exams'

    id = db.Column(db.Integer, primary_key=True)
    exam_set_id = db.Column(db.Integer)
    student_id = db.Column(db.Integer)
    student_mark = db.Column(db.String(5))
    mark_entered_by = db.Column(db.String(200))
    opened_at = db.Column(db.DateTime())
    closed_at = db.Column(db.DateTime())
    duration = db.Column(db.Interval)
    taken_at = db.Column(db.DateTime())
    mark_entered_at = db.Column(db.DateTime())

    def __init__(self, exam_set_id, student_id, student_mark, mark_entered_by, opened_at, closed_at, duration, taken_at, mark_entered_at):
        self.exam_set_id = exam_set_id
        self.student_id = student_id
        self.student_mark = student_mark
        self.mark_entered_by = mark_entered_by
        self.opened_at = opened_at
        self.closed_at = closed_at
        self.duration = duration
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
            'duration': self.duration,
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
        if student_mark is not None and mark_entered_by != self.student_mark:
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
        duration = json_with_updates.get('duration')
        if duration is not None and duration != self.duration:
            self.duration = duration
            has_updates = True
        taken_at = json_with_updates.get('taken_at')
        if taken_at is not None and taken_at != self.taken_at:
            self.taken_at = taken_at
            has_updates = True
        mark_entered_at = json_with_updates.get('mark_entered_at')
        if mark_entered_at is not None and mark_entered_at != self.mark_entered_at:
            self.mark_entered_at = mark_entered_at
            has_updates = True
        return has_updates


