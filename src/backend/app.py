from flask import Flask, request, jsonify, session
from flask_cors import CORS
import json
import random
from config import DevelopmentConfig
from flask_migrate import Migrate
from flask_security import Security, SQLAlchemyUserDatastore, auth_required, hash_password, roles_required
from flask_security.models import fsqla_v3 as fsqla

from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from flask_openapi3 import Info, Tag
from flask_openapi3 import OpenAPI

from handler import *

from models.student import *
from models.user import *
from models.course import *
from models.course_location import *
from models.role_type import *
from models.supported_language import *
from models.exam import *
from models.exam_set import *
from models.question_type import *
from models.exam_question import *
from models.student_answer import *

info = Info(title="Inzone API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

app.config.from_object(DevelopmentConfig)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# we want to set the timeout of each session
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)
# we define db object in models.py and now we link it to the flask app
db.init_app(app)
migrate = Migrate(app, db)
# fsqla.FsModels.set_db_info(db)
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

exam_tag = Tag(name="Exam")
user_tag = Tag(name="Student")
course_tag = Tag(name="Course")

user_handler = QueryHandler(db, Student, 'user')
student_handler = QueryHandler(db, Student, 'student')
course_handler = QueryHandler(db, Course, 'course')
role_type_handler = QueryHandler(db, RoleType, 'role type')
course_location_handler = QueryHandler(db, CourseLocation, 'course location')
supported_language_handler = QueryHandler(
    db, SupportedLanguages, 'supported language')
exam_handler = QueryHandler(db, Exam, 'exam')
exam_set_handler = QueryHandler(db, ExamSet, 'exam set')
question_type_handler = QueryHandler(db, QuestionType, 'question type')
exam_question_handler = QueryHandler(db, ExamQuestion, 'exam question')
student_answer_handler = StudentAnswerQueryHandler(db, StudentAnswer, 'student answer')

with app.app_context():
    db.create_all()
    for role in app.config['ROLES']:
        user_datastore.find_or_create_role(name=role)
    
    
    try:
        for loc in app.config['COURSE_LOCATIONS']:
            l = course_location_handler.handle_get_first_object_by_attribute(location=loc[0])
            if not l:
                c = CourseLocation(loc[0], loc[1])
                db.session.add(c)
    except IntegrityError as e:
        print(e)

    u = user_datastore.find_user(email=app.config['ADMIN_USER'][0])
    if not u:
        u = user_datastore.create_user(email=app.config['ADMIN_USER'][0], password=app.config['ADMIN_USER'][1])
    a = user_datastore.find_role('admin')
    user_datastore.add_role_to_user(u, a)
    db.session.commit()
    # user_datastore.add_role_user(u, admin_role)

@app.get('/')
def home():
    if 'email' in session:
        return QueryHandler.create_generic_json_response(
            {'message': 'Welcome to Edunity, you are already logged in ', 'email': session['email']})
    else:
        return QueryHandler.create_generic_json_response(
            {'message': 'Welcome to Edunity, proceed to log in now'}, 401)


@app.get('/role-types')
def get_all_role_types():
    return role_type_handler.handle_get_all_request()


@app.get('/role-type/<query_name>')
def get_role_type_by_name(query_name):
    return role_type_handler.handle_get_first_object_by_attribute(role_type=query_name)


@app.get('/course-locations')
def get_all_course_locations():
    return course_location_handler.handle_get_all_request()


@app.get('/course-location/<query_name>')
def get_course_location_by_name(query_name):
    return course_location_handler.handle_get_first_object_by_attribute(location=query_name)


@app.get('/supported-languages')
def get_all_supported_languages():
    return supported_language_handler.handle_get_all_request()


@app.get('/supported-language/<query_name>')
def get_supported_language_by_name(query_name):
    return supported_language_handler.handle_get_first_object_by_attribute(location=query_name)


@app.get('/exams', tags=[exam_tag])
def get_all_exams():
    return exam_handler.handle_get_all_request()


@app.get('/exam/<id>', tags=[exam_tag])
def get_exam_by_id(id):
    return exam_handler.handle_get_first_object_by_attribute(id=id)


@app.post('/exam', tags=[exam_tag])
def add_new_exam():
    return exam_handler.handle_add_new_object_request(request)


@app.delete('/exam/<id>')
def delete_exam(id):
    return exam_handler.handle_delete_object_by_attribute(id=id)


@app.post('/exam/<id>/startExam')
def start_exam_by_id(id):
    exam = exam_handler.handle_get_first_object_by_attribute(id=id)
    if exam.status_code != 200:
        # there is some error while getting exam, so we return the error itself
        return exam
    content = exam.get_json()
    if content.get('taken_at') is not None and content.get('taken_at') != 'null':
        # the exam is already started
        return QueryHandler.create_generic_json_response(
                    {'message': 'Exam with id = {} is already started at {}'.format(id, content.get('taken_at'))}, 400)
    start_time = datetime.now()
    opened_at = datetime.strptime(content.get('opened_at'), '%a, %d %b %Y %X %Z')
    if start_time < opened_at:
        return QueryHandler.create_generic_json_response(
                    {'message': 'Exam with id = {} will open at {}'.format(id, content.get('opened_at'))}, 400)
    closed_at = datetime.strptime(content.get('closed_at'), '%a, %d %b %Y %X %Z')
    if start_time >= closed_at:
        return QueryHandler.create_generic_json_response(
                    {'message': 'Exam with id = {} closed at {}'.format(id, content.get('closed_at'))}, 400)
    start_exam_request = jsonify({'taken_at' : start_time})
    return exam_handler.handle_update_object_by_attribute(start_exam_request, id=id)


@app.get('/exam/<id>/student-answers')
def get_student_answers_by_exam_id(id):
    exam_response = exam_handler.handle_get_first_object_by_attribute(id=id)
    if exam_response.status_code != 200:
        # there is some error while getting exam, so we return the error itself
        return exam_response
    return student_answer_handler.handle_get_all_objects_by_attribute(exam_id=id)


@app.post('/exam/<id>/student-answers')
def add_student_answers_by_exam_id(id):
    exam_response = exam_handler.handle_get_first_object_by_attribute(id=id)
    if exam_response.status_code != 200:
        # there is some error while getting exam, so we return the error itself
        return exam_response
    return student_answer_handler.handle_add_multiple_objects_with_attribute(request, exam_id=id)


@app.get('/exam-sets')
def get_all_exam_sets():
    return exam_set_handler.handle_get_all_request()


@app.get('/exam-set/<id>')
def get_exam_set_by_id(id):
    return exam_set_handler.handle_get_first_object_by_attribute(id=id)


@app.get('/exam-set/<id>/number-of-questions')
def get_number_of_questions_by_exam_set_id(id):
    exam_set_response = exam_set_handler.handle_get_first_object_by_attribute(id=id)
    if exam_set_response.status_code != 200:
        # there is some error while getting exam_set, so we return the error itself
        return exam_set_response
    all_questions_response = exam_question_handler.handle_get_all_objects_by_attribute(exam_set_id=id)
    if all_questions_response.status_code != 200:
        # there is some error while getting all_questions, so we return the error itself
        return all_questions_response
    # we need to convert from reponse data to dict
    all_questions_dict = json.loads(all_questions_response.get_data())
    return QueryHandler.create_generic_json_response({'number_of_questions': len(all_questions_dict)})


@app.get('/exam-set/<id>/exam-questions')
def get_all_questions_by_exam_set_id(id):
    exam_set_response = exam_set_handler.handle_get_first_object_by_attribute(id=id)
    if exam_set_response.status_code != 200:
        # there is some error while getting exam_set, so we return the error itself
        return exam_set_response
    all_questions_response = exam_question_handler.handle_get_all_objects_by_attribute(exam_set_id=id)
    if all_questions_response.status_code != 200:
        # there is some error while getting all_questions, so we return the error itself
        return all_questions_response
    # we need to convert from reponse data to list
    all_questions_list = json.loads(all_questions_response.get_data())
    random.shuffle(all_questions_list)
    for question in all_questions_list:
        if question.get('possible_answers') is not None:
            random.shuffle(question.get('possible_answers'))
    return QueryHandler.create_generic_json_response(all_questions_list)


@app.get('/question-types')
def get_all_question_types():
    return question_type_handler.handle_get_all_request()


@app.get('/exam-questions')
@auth_required()
def get_all_exam_questions():
    return exam_question_handler.handle_get_all_request()


@app.get('/student-answers')
@roles_required('admin', 'educator')
def get_all_student_answers():
    return student_answer_handler.handle_get_all_request()


@app.post('/student-answer')
def add_new_student_answer():
    return student_answer_handler.handle_add_new_object_request(request)


@app.put('/student-answer/<id>')
def update_student_answer(id):
    return student_answer_handler.handle_update_object_by_attribute(request, id=id)


@app.delete('/student-answer/<id>')
def delete_student_answer(id):
    return student_answer_handler.handle_delete_object_by_attribute(id=id)


@app.get('/courses')
def get_all_courses():
    return course_handler.handle_get_all_request()


@app.get('/course/<query_name>')
def get_course_by_name(query_name):
    return course_handler.handle_get_first_object_by_attribute(name=query_name)


@app.post('/course')
def add_new_course():
    return course_handler.handle_add_new_object_request(request)


@app.delete('/course/<query_name>')
def delete_course(query_name):
    return course_handler.handle_delete_object_by_attribute(name=query_name)


@app.put('/course/<query_name>')
def update_course(query_name):
    return course_handler.handle_update_object_by_attribute(request, name=query_name)


@app.get('/students')
@roles_required('admin', 'educator')
def get_all_students():
    return student_handler.handle_get_all_request()


@app.get('/student/<query_email>')
@roles_required('admin', 'educator')
def get_student_by_email(query_email):
    student_response = student_handler.handle_get_first_object_by_attribute(email=query_email)
    if student_response.status_code != 200:
        # there is some error while getting student info, so we return the error itself
        return student_response
    # there is no error when getting student info,
    # but we need to convert from reponse data to dict
    student_data_dict = json.loads(student_response.get_data())
    validated_by_admin = student_data_dict.get('validated_by_admin')
    # only after being validated by admin, we then consider this is the first log-in
    if validated_by_admin == True :
        first_query_done_request = jsonify({'first_query_done' : True})
        student_handler.handle_update_object_by_attribute(first_query_done_request, email=query_email)
    return student_response


@app.post('/student')
def add_new_student():
    return student_handler.handle_add_new_object_request(request)


@app.delete('/student/<query_email>')
def delete_student(query_email):
    return student_handler.handle_delete_object_by_attribute(email=query_email)


@app.put('/student/<query_email>')
def update_student(query_email):
    return student_handler.handle_update_object_by_attribute(request, email=query_email)

@app.get('/student/<query_email>/current-exams')
@auth_required()
def get_current_exams_of_a_student(query_email):
    student_response = student_handler.handle_get_first_object_by_attribute(email=query_email)
    if student_response.status_code != 200:
        # there is some error while getting student info, so we return the error itself
        return student_response
    # there is no error when getting student info,
    # but we need to convert from reponse data to dict
    student_data_dict = json.loads(student_response.get_data())
    student_id = student_data_dict.get('id')
    # we create SQLAlchemy text command which the current time is within opened time and closed time
    current_time = datetime.now()
    text_command = text('student_id={} and opened_at < timestamp \'{}\' and timestamp \'{}\' < closed_at and taken_at IS NULL'.format(
        student_id, current_time, current_time))
    all_exams_of_a_student_response = exam_handler.handle_get_all_objects_with_text_command(text_command)
    return all_exams_of_a_student_response

@app.get('/student/<query_email>/past-exams')
@auth_required()
def get_past_exams_of_a_student(query_email):
    student_response = student_handler.handle_get_first_object_by_attribute(email=query_email)
    if student_response.status_code != 200:
        # there is some error while getting student info, so we return the error itself
        return student_response

    # there is no error when getting student info,
    # but we need to convert from reponse data to dict
    student_data_dict = json.loads(student_response.get_data())
    student_id = student_data_dict.get('id')
    # we create SQLAlchemy text command of exams which was already taken
    current_time = datetime.now()
    text_command = text('student_id={} and taken_at is not null'.format(student_id))
    all_exams_of_a_student_response = exam_handler.handle_get_all_objects_with_text_command(text_command)
    return all_exams_of_a_student_response


@app.post('/student/login')
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


@app.post('/student/logout')
def student_logout():
    if 'email' in session:
        session.pop('email', None)
    return QueryHandler.create_generic_json_response({'message': 'You successfully logged out'})


@app.put('/testing/<query_email>/reset-exam-taken-time')
def reset_exam_start_time(query_email):
    student_response = student_handler.handle_get_first_object_by_attribute(email=query_email)
    if student_response.status_code != 200:
        # there is some error while getting student info, so we return the error itself
        return student_response

    # there is no error when getting student info,
    # but we need to convert from reponse data to dict
    student_data_dict = json.loads(student_response.get_data())
    student_id = student_data_dict.get('id')
    taken_time_json_query = jsonify({'taken_at' : None, 'student_mark' : None})
    all_exams_of_a_student_response = exam_handler.handle_update_multiple_objects_by_attribute(taken_time_json_query, student_id=student_id)
    return all_exams_of_a_student_response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9292)
