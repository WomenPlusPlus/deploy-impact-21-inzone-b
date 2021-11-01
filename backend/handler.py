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
                    {'message': 'Bad Request - {} with {} already exists'.format(self.model_name, kwargs)}, 400)
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

    def handle_add_new_object_request(self, request):
        '''
        Given a JSON request, create new object in db
        '''
        if not request.is_json:
            return QueryHandler.create_generic_json_response({'message': 'Bad Request - input is not json'}, 400)
        content = request.get_json()
        email = content['email']
        # create a new student
        student = self.model(
            full_name=content['fullName'],
            email=email,
            password=generate_password_hash(content['password']),
            course_name=content['course_name'],
            course_location=content['course_location'],
            language=content['language'])
        return self.add_new_object_to_db(student, email=email)


class CourseQueryHandler(QueryHandler):
    '''
    A class inherits from QueryHandler and perform specific functionality related to course
    '''

    def handle_add_new_object_request(self, request):
        '''
        Given a JSON request, create new object in db
        '''
        if not request.is_json:
            return QueryHandler.create_generic_json_response({'message': 'Bad Request - input is not json'}, 400)
        content = request.get_json()
        course_name = content['name']
        # create a new course
        course = self.model(
            name=course_name,
            start_at=content['start_at'],
            finish_at=content['finish_at'],
            description=content['description'],
            number_of_credits=content['number_of_credits'])
        return self.add_new_object_to_db(course, name=course_name)
