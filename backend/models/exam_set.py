from .base_model import db

class ExamSet(db.Model):
    __tablename__ = 'exam_sets'

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer)
    created_by = db.Column(db.String(200))
    created_at = db.Column(db.DateTime())
    name = db.Column(db.String(200))
    total_mark = db.Column(db.Integer)
    description = db.Column(db.String(200))
    additional_instruction = db.Column(db.String(200))

    def __init__(self, course_id, created_by, created_at, name, total_mark, description="", additional_instruction=""):
        self.course_id = course_id
        self.created_at = created_at
        self.name = name
        self.total_mark = total_mark
        self.description = description
        self.additional_instruction = additional_instruction

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'course_id': self.course_id,
            'created_by': self.created_by,
            'created_at': self.created_at,
            'name': self.name,
            'total_mark': self.total_mark,
            'description': self.description,
            'additional_instruction': self.additional_instruction
        }

    def update(self, json_with_updates):
        '''
        Updates exam_set info.
        Returns True if some fields were updated and False otherwise.
        '''
        has_updates = False
        course_id = json_with_updates.get('course_id')
        if course_id is not None and course_id != self.course_id:
                self.course_id = course_id
                has_updates = True
        created_by = json_with_updates.get('created_by')
        if created_by is not None and created_by != self.created_by:
            self.created_by = created_by
            has_updates = True
        create_at = json_with_updates.get('create_at')
        if created_at is not None and created_at != self.created_at:
            self.created_at = created_at
            has_updates = True
        name = json_with_updates.get('name')
        if name is not None and name != self.name:
            self.name = name
            has_updates = True
        total_mark = json_with_updates.get('total_mark')
        if total_mark is not None and total_mark != self.total_mark:
            self.total_mark = total_mark
            has_updates = True
        description = json_with_updates.get('description')
        if description is not None and description != self.description:
            self.description = description
            has_updates = True
        additional_instruction = json_with_updates.get('additional_instruction')
        if additional_instruction is not None and additional_instruction != self.additional_instruction:
            self.additional_instruction = additional_instruction
            has_updates = True
        return has_updates
