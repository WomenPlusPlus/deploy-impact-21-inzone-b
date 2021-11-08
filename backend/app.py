from flask import Flask, request, jsonify, session

from config import DevelopmentConfig
from flask_migrate import Migrate
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash

from handler import *

from models.student import *
from models.course import *
from models.course_location import *
from models.role_type import *
from models.supported_language import *
from models.exam import *
from models.exam_set import *
from models.question_type import *
from models.exam_question import *

app = Flask(__name__)

app.config.from_object(DevelopmentConfig)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# we want to set the timeout of each session
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)
# we define db object in models.py and now we link it to the flask app
db.init_app(app)
migrate = Migrate(app, db)
student_handler = StudentQueryHandler(db, Student, 'student')
course_handler = CourseQueryHandler(db, Course, 'course')
role_type_handler = QueryHandler(db, RoleType, 'role type')
course_location_handler = QueryHandler(db, CourseLocation, 'course location')
supported_language_handler = QueryHandler(
    db, SupportedLanguages, 'supported language')
exam_handler = QueryHandler(db, Exam, 'exam')
exam_set_handler = QueryHandler(db, ExamSet, 'exam_set')
question_type_handler =  QueryHandler(db, QuestionType, 'question_type')
exam_question_handler = QueryHandler(db, ExamQuestion, 'exam_question')

@app.route('/')
def home():
    if 'email' in session:
        return QueryHandler.create_generic_json_response(
            {'message': 'Welcome to Edunity, you are already logged in ', 'email': session['email']})
    else:
        return QueryHandler.create_generic_json_response(
            {'message': 'Welcome to Edunity, proceed to log in now'}, 401)


@app.route('/role-types')
def get_all_role_types():
    return role_type_handler.handle_get_all_request()


@app.route('/role-type/<query_name>')
def get_role_type_by_name(query_name):
    return role_type_handler.handle_get_first_object_by_attribute(role_type=query_name)


@app.route('/course-locations')
def get_all_course_locations():
    return course_location_handler.handle_get_all_request()


@app.route('/course-location/<query_name>')
def get_course_location_by_name(query_name):
    return course_location_handler.handle_get_first_object_by_attribute(location=query_name)


@app.route('/supported-languages')
def get_all_supported_languages():
    return supported_language_handler.handle_get_all_request()


@app.route('/supported-language/<query_name>')
def get_supported_language_by_name(query_name):
    return supported_language_handler.handle_get_first_object_by_attribute(location=query_name)


@app.route('/exams')
def get_all_exams():
    return exam_handler.handle_get_all_request()
    
@app.route('/exam_sets')
def get_all_exam_sets():
    return exam_set_handler.handle_get_all_request()

@app.route('/question_types')
def get_all_question_types():
    return question_type_handler.handle_get_all_request()

@app.route('/exam_questions')
def get_all_exam_questions():
    return exam_question_handler.handle_get_all_request()


@app.route('/courses')
def get_all_courses():
    return course_handler.handle_get_all_request()


@app.route('/course/<query_name>')
def get_course_by_name(query_name):
    return course_handler.handle_get_first_object_by_attribute(name=query_name)


@app.route('/course', methods=['POST'])
def add_new_course():
    return course_handler.handle_add_new_object_request(request)


@app.route('/course/<query_name>', methods=['DELETE'])
def delete_course(query_name):
    return course_handler.handle_delete_object_by_attribute(name=query_name)


@app.route('/course/<query_name>', methods=['PUT'])
def update_course(query_name):
    return course_handler.handle_update_object_by_attribute(request, name=query_name)


@app.route('/students')
def get_all_students():
    return student_handler.handle_get_all_request()


@app.route('/student/<query_email>')
def get_student_by_email(query_email):
    result = student_handler.handle_get_first_object_by_attribute(email=query_email)
    if result.status_code == 200:
        first_query_done_request = jsonify({'first_query_done' : True})
        student_handler.handle_update_object_by_attribute(first_query_done_request, email=query_email)
    return result


@app.route('/student', methods=['POST'])
def add_new_student():
    return student_handler.handle_add_new_object_request(request)


@app.route('/student/<query_email>', methods=['DELETE'])
def delete_student(query_email):
    return student_handler.handle_delete_object_by_attribute(email=query_email)


@app.route('/student/<query_email>', methods=['PUT'])
def update_student(query_email):
    return student_handler.handle_update_object_by_attribute(request, email=query_email)


@app.route('/student/login', methods=['POST'])
def student_login():
    try:
        json = request.json
        email = json.get('email')
        raw_pass = json.get('password')

        valid_request = False
        # validate the received values
        if email is None or raw_pass is None:
            return QueryHandler.create_generic_json_response(
                {'message': 'Bad Request - invalid credentials'}, 400)

        # get student object
        student = Student.query.filter_by(email=email).first()
        # check if we can find any student with this email
        if student is None:
            return QueryHandler.create_generic_json_response(
                {'message': 'Bad Request - unable to find any student with email {}'.format(email)}, 400)

        # verify password
        if check_password_hash(student.password, raw_pass):
            # successfully log in
            session['email'] = student.email
            return QueryHandler.create_generic_json_response(
                {'message': 'Logged in successfully with email {}'.format(session['email'])})
        else:
            return QueryHandler.create_generic_json_response(
                {'message': 'Bad Request - invalid password'}, 400)
    except Exception as e:
        return QueryHandler.create_generic_json_response(
            {'message': 'unexpected error: {}'.format(str(e))}, 400)


@app.route('/student/logout', methods=['POST'])
def student_logout():
    if 'email' in session:
        session.pop('email', None)
    return QueryHandler.create_generic_json_response({'message': 'You successfully logged out'})


if __name__ == '__main__':
    app.run()
