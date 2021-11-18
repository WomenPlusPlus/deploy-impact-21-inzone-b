from flask import Flask, request, jsonify, session
import json
from config import DevelopmentConfig
from flask_migrate import Migrate
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import text

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
from models.student_answer import *

app = Flask(__name__)

app.config.from_object(DevelopmentConfig)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# we want to set the timeout of each session
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)
# we define db object in models.py and now we link it to the flask app
db.init_app(app)
migrate = Migrate(app, db)
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


@app.route('/exam/<id>')
def get_exam_by_id(id):
    return exam_handler.handle_get_first_object_by_attribute(id=id)


@app.route('/exam', methods=['POST'])
def add_new_exam():
    return exam_handler.handle_add_new_object_request(request)


@app.route('/exam/<id>', methods=['DELETE'])
def delete_exam(id):
    return exam_handler.handle_delete_object_by_attribute(id=id)


@app.route('/exam/<id>/startExam', methods=['PUT'])
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


@app.route('/exam/<id>/student-answers')
def get_student_answers_by_exam_id(id):
    exam_response = exam_handler.handle_get_first_object_by_attribute(id=id)
    if exam_response.status_code != 200:
        # there is some error while getting exam, so we return the error itself
        return exam_response
    return student_answer_handler.handle_get_all_objects_by_attribute(exam_id=id)


@app.route('/exam/<id>/student-answers', methods=['POST'])
def add_student_answers_by_exam_id(id):
    exam_response = exam_handler.handle_get_first_object_by_attribute(id=id)
    if exam_response.status_code != 200:
        # there is some error while getting exam, so we return the error itself
        return exam_response
    return student_answer_handler.handle_add_multiple_objects_with_attribute(request, exam_id=id)


@app.route('/exam-sets')
def get_all_exam_sets():
    return exam_set_handler.handle_get_all_request()


@app.route('/exam-set/<id>')
def get_exam_set_by_id(id):
    return exam_set_handler.handle_get_first_object_by_attribute(id=id)


@app.route('/exam-set/<id>/number-of-questions')
def get_number_of_questions_by_exam_set_id(id):
    exam_set_response = exam_set_handler.handle_get_first_object_by_attribute(id=id)
    if exam_set_response.status_code != 200:
        # there is some error while getting exam_set, so we return the error itself
        return exam_set_response
    all_questions_response = exam_question_handler.handle_get_all_objects_by_attribute(exam_set_id=id)
    # we need to convert from reponse data to dict
    all_questions_dict = json.loads(all_questions_response.get_data())
    return QueryHandler.create_generic_json_response({'number_of_questions': len(all_questions_dict)})


@app.route('/exam-set/<id>/exam-questions')
def get_all_questions_by_exam_set_id(id):
    exam_set_response = exam_set_handler.handle_get_first_object_by_attribute(id=id)
    if exam_set_response.status_code != 200:
        # there is some error while getting exam_set, so we return the error itself
        return exam_set_response
    return exam_question_handler.handle_get_all_objects_by_attribute(exam_set_id=id)


@app.route('/question-types')
def get_all_question_types():
    return question_type_handler.handle_get_all_request()


@app.route('/exam-questions')
def get_all_exam_questions():
    return exam_question_handler.handle_get_all_request()


@app.route('/student-answers')
def get_all_student_answers():
    return student_answer_handler.handle_get_all_request()


@app.route('/student-answer', methods=['POST'])
def add_new_student_answer():
    return student_answer_handler.handle_add_new_object_request(request)


@app.route('/student-answer/<id>', methods=['PUT'])
def update_student_answer(id):
    return student_answer_handler.handle_update_object_by_attribute(request, id=id)


@app.route('/student-answer/<id>', methods=['DELETE'])
def delete_student_answer(id):
    return student_answer_handler.handle_delete_object_by_attribute(id=id)


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

@app.route('/student/<query_email>/current-exams')
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


@app.route('/testing/<query_email>/reset-exam-taken-time', methods=['PUT'])
def reset_exam_start_time(query_email):
    student_response = student_handler.handle_get_first_object_by_attribute(email=query_email)
    if student_response.status_code != 200:
        # there is some error while getting student info, so we return the error itself
        return student_response

    # there is no error when getting student info,
    # but we need to convert from reponse data to dict
    student_data_dict = json.loads(student_response.get_data())
    student_id = student_data_dict.get('id')
    taken_time_json_query = jsonify({'taken_at' : None})
    all_exams_of_a_student_response = exam_handler.handle_update_multiple_objects_by_attribute(taken_time_json_query, student_id=student_id)
    return all_exams_of_a_student_response

if __name__ == '__main__':
    app.run()
