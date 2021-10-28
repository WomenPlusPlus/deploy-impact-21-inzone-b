from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig
from flask_migrate import Migrate
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)

app.config.from_object(DevelopmentConfig)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=10)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    joined_at = db.Column(db.DateTime())
    password = db.Column(db.String(200))

    def __init__(self, full_name, email, password):
        # we dont have to create the id because the db will do that automatically
        # self.id = 1 # 2 bytes
        # while Student.query.filter_by(id=self.id).first() is not None:
        #     self.id = uuid.uuid4().fields[1]
        self.full_name = full_name
        self.email = email
        self.joined_at = datetime.now()
        self.password = password

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'joined_at': self.joined_at,
            'password': self.password
        }


@app.route("/")
def home():
    if 'email' in session:
        email = session['email']
        return jsonify({'message': 'Welcome to Edunity, you are already logged in ', 'email': email})
    else:
        resp = jsonify(
            {'message': 'Welcome to Edunity, proceed to log in now'})
        resp.status_code = 401
        return resp


@app.route("/student/getall")
def get_all():
    try:
        students = Student.query.all()
        return jsonify([e.serialize() for e in students])
    except Exception as e:
        return(str(e))


@app.route("/student/<email_>")
def get_by_email(email_):
    try:
        student = Student.query.filter_by(email=email_).first()
        if student is None:
            resp = jsonify(
                {'message': 'Unable to find any student with email {}'.format(email_)})
            resp.status_code = 400
            return resp
        return jsonify(student.serialize())
    except Exception as e:
        return(str(e))


@app.route('/student', methods=['POST'])
def register_new_student():
    if not request.is_json:
        resp = jsonify(
            {'message': 'Bad Request - input is not json'})
        resp.status_code = 400
        return resp

    content = request.get_json()
    full_name = content["fullName"]
    email = content["email"]
    password = generate_password_hash(content["password"])
    try:
        # we first check if there is any existing student with the same email
        existing_student = Student.query.filter_by(email=email).first()
        if existing_student is not None:
            # we found a student with the same email
            resp = jsonify(
                {'message': 'Bad Request - a student with this email already existed'})
            resp.status_code = 400
            return resp

        # we can create a new student
        student = Student(
            full_name=full_name,
            email=email,
            password=password
        )
        db.session.add(student)
        db.session.commit()
        return jsonify({'message': 'Student registered with email {}'.format(email)})
    except Exception as e:
        resp = jsonify(
            {'message': 'Error: {}'.format(str(e))})
        resp.status_code = 400
        return resp


@app.route('/student/login', methods=['POST'])
def student_login():
    try:
        json = request.json
        email = json.get('email')
        raw_pass = json.get('password')

        valid_request = False
        # validate the received values
        if email and raw_pass:
            # get student object
            student = Student.query.filter_by(email=email).first()
            # check if we can find any student with this email
            if student is not None:
                valid_request = True
                # verify password
                if check_password_hash(student.password, raw_pass):
                    # successfully log in
                    session['email'] = student.email
                    return jsonify({'message': 'You are logged in successfully with email {}'.format(session['email'])})
                else:
                    resp = jsonify(
                        {'message': 'Bad Request - invalid password'})
                    resp.status_code = 400
                    return resp

        if valid_request == False:
            resp = jsonify(
                {'message': 'Bad Request - invalid credentials'})
            resp.status_code = 400
            return resp

    except Exception as e:
        resp = jsonify(
            {'message': 'Unexpected error'})
        resp.status_code = 400
        return resp


@app.route('/student/logout', methods=['POST'])
def student_logout():
    if 'email' in session:
        current_email = session['email']
        session.pop('email', None)
        return jsonify({'message': 'You successfully logged out from {}'.format(current_email)})
    else:
        return jsonify({'message': 'You successfully logged out even though you were not logged in'})


if __name__ == '__main__':
    app.run()
