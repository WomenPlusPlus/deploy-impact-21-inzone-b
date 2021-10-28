from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] ='postgresql://postgres://avnadmin:YRCpQ9L8NxQqOCa9@inzone-b-pg-inzone-b-project.aivencloud.com:15460/defaultdb?sslmode=require/students'

db=SQLAlchemy(app)
for result in students
    print (result.full_name)


if __name__ == '__main__':
    app.run(debug=True)
