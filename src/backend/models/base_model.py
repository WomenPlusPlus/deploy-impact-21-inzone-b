from flask_sqlalchemy import SQLAlchemy
# we define db object but we dont link it to the flask app yet
db = SQLAlchemy()

def get_missing_field_name(json_object, fields):
    '''
    Given a json_object and a list of required fields,
    finds the first one in the list that is missing in the json object. If all fields are present, returns None.
    '''
    for field in fields:
        if json_object.get(field) is None:
            return field
    return None
