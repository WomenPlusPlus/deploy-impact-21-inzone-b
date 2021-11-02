from os import stat
from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import *


class QueryHandler:
    '''
    A class to handle query to db, support basic functionality such as 
    - get all objects, 
    - get object by attribute,
    etc.
    '''

    def __init__(self, db_obj, model, model_name):
        self.db_obj = db_obj
        self.model = model
        self.model_name = model_name

    @staticmethod
    def create_generic_json_response(object, code=200):
        '''
        Given an object and respond code, return a JSON response with respond code and a header of allowing access control origin
        resp.headers.add('Access-Control-Allow-Origin', '*')
        '''
        response = jsonify(object)
        response.status_code = code
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    @staticmethod
    def get_missing_field_name(json_object, fields):
        '''
        Given a json_object and a list of required fields, finds the first one in the list that is missing in the json object. If all fields are present, returns None.
        '''
        for field in fields:
            if json_object.get(field) is None:
                return field
        return None

    def handle_get_all_request(self):
        '''
        Get all object from the db and return a REST response
        '''
        try:
            objects = self.model.query.all()
            return QueryHandler.create_generic_json_response([e.serialize() for e in objects])
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)

    def handle_get_object_by_attribute(self, **kwargs):
        '''
        Given keyword arguments, get the first object with matching query condition.
        For example, 
        if the input is name='some_name', then we will return the first object of the db which field 'name' equals to 'some_name'
        '''
        try:
            object = self.model.query.filter_by(**kwargs).first()
            if object is None:
                return QueryHandler.create_generic_json_response(
                    {'message': 'Unable to find any {} with filter {}'.format(self.model_name, kwargs)}, 400)
            return QueryHandler.create_generic_json_response(object.serialize())
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)

    def add_new_object_to_db(self, object, **kwargs):
        '''
        Given a object from a model, create new object in db if there is no such object existed in the db.
        The searching criteria is set by **kwargs.
        For example,
        if there is already an object of model A with attribute_x="some_value", then
        self.add_new_object_to_db(new_object, attribute_x="some_value") --> will not add new object to the db
        self.add_new_object_to_db(new_object, attribute_x="some_other_value") --> will add new object to the db
        self.add_new_object_to_db(new_object, attribute_y="some_value") --> will also add new object to the db
        '''
        try:
            # we first check if there is any existing object with this argument
            existing_object = self.model.query.filter_by(**kwargs).first()
            if existing_object is not None:
                # we found an object with this filter, so we cant create a new object
                return QueryHandler.create_generic_json_response(
                    {'message': 'Bad Request: {} with {} already exists'.format(self.model_name, kwargs)}, 400)
            self.db_obj.session.add(object)
            self.db_obj.session.commit()
            return QueryHandler.create_generic_json_response(
                {'message': 'A new {} added with {}'.format(self.model_name, kwargs)})
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)

    def handle_delete_object_by_attribute(self, **kwargs):
        '''
        Given keyword arguments, delete the first object with matching query condition.
        For example,
        if the input is name='some_name', then we will delete the first object of the db which field 'name' equals to 'some_name'
        '''
        try:
            object = self.model.query.filter_by(**kwargs).first()
            if object is None:
                return QueryHandler.create_generic_json_response(
                    {'message': 'Unable to find any {} with {}'.format(self.model_name, kwargs)}, 400)
            self.db_obj.session.delete(object)
            self.db_obj.session.commit()
            return QueryHandler.create_generic_json_response(
                {'message': '{} with {} is deleted'.format(self.model_name, kwargs)})
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)


class StudentQueryHandler(QueryHandler):
    '''
    A class inherits from QueryHandler and perform specific functionality related to student
    '''

    @staticmethod
    def UpdateEntry(student, json_with_updates):
        '''
        Updates student info.
        Returns True if some fields were updated and False otherwise.
        '''
        has_updates = False
        full_name = json_with_updates.get('fullName')
        if full_name is not None and full_name != student.fullName:
            student.fullName = full_name
            has_updates = True
        password = json_with_updates.get('password')
        if password is not None:
            password = generate_password_hash(password)
            if password != student.password:
                student.password = password
                has_updates = True
        course_name = json_with_updates.get('course_name')
        if course_name is not None and course_name != student.course_name:
            student.course_name = course_name
            has_updates = True
        course_location = json_with_updates.get('course_location')
        if course_location is not None and course_location != student.course_location:
            student.course_location = course_location
            has_updates = True
        language = json_with_updates.get('language')
        if language is not None and language != student.language:
            student.language = language
            has_updates = True
        return has_updates

    def handle_add_new_object_request(self, request):
        '''
        Given a JSON request, create new object in db
        '''
        if not request.is_json:
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: not json'}, 405)
        content = request.get_json()
        missing_field = QueryHandler.get_missing_field_name(
            content, ['fullName', 'email', 'password', 'course_name', 'course_location', 'language'])
        if missing_field is not None:
            # there is at least 1 missing key in the input json, so we throw an error back
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: missing field \'{}\''.format(missing_field)}, 405)
        email = content.get('email')
        # create a new student
        student = self.model(
            full_name=content.get('fullName'),
            email=email,
            password=generate_password_hash(content.get('password')),
            course_name=content.get('course_name'),
            course_location=content.get('course_location'),
            language=content.get('language'))
        return self.add_new_object_to_db(student, email=email)

    def handle_update_object(self, request):
        '''
        Update students table entry according to request
        '''
        if not request.is_json:
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: not json'}, 405)
        content = request.get_json()
        email = content.get('email')
        if email is None:
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: not json'}, 405)
        try:
            student = self.model.query.filter_by(email=email).first()
            if student is None:
                return QueryHandler.create_generic_json_response(
                        {'message': 'Bad Request: {} with email={} doesn\'t exist'.format(self.model_name, email)}, 400)
            if not StudentQueryHandler.UpdateEntry(student, content):
                return QueryHandler.create_generic_json_response(
                        {'message': 'Bad Request: {} with email={} nothing to update'.format(self.model_name, email)}, 400)
            self.db_obj.session.merge(student)
            self.db_obj.session.commit()
            return QueryHandler.create_generic_json_response(
                    {'message': '{} with email={} is updated'.format(self.model_name, email)})
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)

    def set_first_query_done(self, email):
        '''
        Sets first_query_done fiels to True for student with specified email.
        Returns True on success, False otherwise.
        '''
        try:
            student = self.model.query.filter_by(email=email).first()
            if student is None:
                return False
            if student.first_query_done:
                return True
            student.first_query_done = True
            self.db_obj.session.merge(student)
            self.db_obj.session.commit()
            return True
        except Exception as e:
            return False


class CourseQueryHandler(QueryHandler):
    '''
    A class inherits from QueryHandler and perform specific functionality related to course
    '''

    def handle_add_new_object_request(self, request):
        '''
        Given a JSON request, create new object in db
        '''
        if not request.is_json:
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: not json'}, 405)
        content = request.get_json()
        missing_field = QueryHandler.get_missing_field_name(
            content, ['name', 'start_at', 'finish_at', 'description', 'number_of_credits'])
        if missing_field is not None:
            # there is at least 1 missing key in the input json, so we throw an error back
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: missing field \'{}\''.format(missing_field)}, 405)
        course_name = content.get('name')
        # create a new course
        course = self.model(
            name=course_name,
            start_at=content.get('start_at'),
            finish_at=content.get('finish_at'),
            description=content.get('description'),
            number_of_credits=content.get('number_of_credits'))
        return self.add_new_object_to_db(course, name=course_name)
