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
        full_name = content["fullName"]
        email = content["email"]
        password = generate_password_hash(content["password"])
        try:
            # we first check if there is any existing student with the same email
            existing_object = self.model.query.filter_by(email=email).first()
            if existing_object is not None:
                # we found a student with the same email, so we cant create a new student
                return QueryHandler.create_generic_json_response(
                    {'message': 'Bad Request - a student with this email already existed'}, 400)

            # we can create a new student
            student = self.model(
                full_name=full_name,
                email=email,
                password=password
            )
            self.db_obj.session.add(student)
            self.db_obj.session.commit()
            return QueryHandler.create_generic_json_response(
                {'message': 'A new student added with email {}'.format(email)})
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)


class CourseQueryHandler(QueryHandler):
    '''
    A class inherits from QueryHandler and perform specific functionality related to course
    '''

    def handle_add_new_object_request(self, request):
        '''
        Given a JSON request, create new object in db
        '''
        # TODO: add logic to add new course here
        return QueryHandler.create_generic_json_response({'message': 'Error: not supported yet'}, 400)
