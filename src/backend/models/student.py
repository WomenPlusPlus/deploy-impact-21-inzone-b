from datetime import datetime
from werkzeug.security import generate_password_hash
from .base_model import db, get_missing_field_name

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    joined_at = db.Column(db.DateTime())
    password = db.Column(db.String(200))
    course_name = db.Column(db.String(200))
    course_location = db.Column(db.String(200))
    language = db.Column(db.String(200))
    first_query_done = db.Column(db.Boolean)
    validated_by_admin = db.Column(db.Boolean)

    def __init__(self, full_name, email, password, course_name, course_location, language, first_query_done = False, validated_by_admin = False):
        # we dont have to create the id because the db will do that automatically
        self.full_name = full_name
        self.email = email
        self.joined_at = datetime.now()
        self.password = password
        self.course_name = course_name
        self.course_location = course_location
        self.language = language
        self.first_query_done = first_query_done
        self.validated_by_admin = validated_by_admin

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'joined_at': self.joined_at,
            'password': self.password,
            'course_name': self.course_name,
            'course_location': self.course_location,
            'language': self.language,
            'first_query_done': self.first_query_done,
            'validated_by_admin': self.validated_by_admin
        }

    def update(self, json_with_updates):
        '''
        Updates student info.
        Returns True if some fields were updated and False otherwise.
        '''
        has_updates = False
        full_name = json_with_updates.get('full_name')
        if full_name is not None and full_name != self.full_name:
            self.full_name = full_name
            has_updates = True
        password = json_with_updates.get('password')
        if password is not None:
            password = generate_password_hash(password)
            if password != self.password:
                self.password = password
                has_updates = True
        course_name = json_with_updates.get('course_name')
        if course_name is not None and course_name != self.course_name:
            self.course_name = course_name
            has_updates = True
        course_location = json_with_updates.get('course_location')
        if course_location is not None and course_location != self.course_location:
            self.course_location = course_location
            has_updates = True
        language = json_with_updates.get('language')
        if language is not None and language != self.language:
            self.language = language
            has_updates = True
        first_query_done = json_with_updates.get('first_query_done')
        # first_query_done field can be changed only from False to True
        if first_query_done is not None and first_query_done and not self.first_query_done:
            self.first_query_done = True
            has_updates = True
        validated_by_admin = json_with_updates.get('validated_by_admin')
        if validated_by_admin is not None and validated_by_admin != self.validated_by_admin:
            self.validated_by_admin = validated_by_admin
            has_updates = True
        return has_updates

    @staticmethod
    def create_from_json(content):
        '''
        Creates Student object from input 'content'.
        If some mandatory fields are missing in 'content', returns an error message.
        '''
        missing_field = get_missing_field_name(
            content, ['full_name', 'email', 'password', 'course_name', 'course_location', 'language'])
        if missing_field is not None:
            # there is at least 1 missing key in the input json, so we throw an error back
            return None, 'Invalid input: missing field \'{}\''.format(missing_field)
        # create a new student
        student = Student(
            full_name=content.get('full_name'),
            email=content.get('email'),
            password=generate_password_hash(content.get('password')),
            course_name=content.get('course_name'),
            course_location=content.get('course_location'),
            language=content.get('language'))
        return student, ''

    def unique_kwargs(self):
        return {'email': self.email}
