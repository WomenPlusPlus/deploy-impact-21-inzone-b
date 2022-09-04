import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'antonina'
    SQLALCHEMY_DATABASE_URI = 'postgresql://encima:Potent4Sunscreen@pg-db.gwill.cloud:5432/inzone'
    ROLES = ['admin', 'educator', 'student']
    COURSE_LOCATIONS = [
        ('Azraq', 'Jordan'),
        ('Kakuma', 'Kenya'),
        ('Geneva', 'Switzerland')
    ]
    ADMIN_USER = ("lou@inzone.ch", "UKNgcyrEaeoAsiuPTgL5ian5N8nA5vh")


class ProductionConfig(Config):
    DEBUG = False
    # SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:482f6763915bc6cfea003668ea49b0334bac0d49bd82e8db@inzone.internal:5432'
# env var: DATABASE_URL=postgres://inzone_backend:UrFLuYoxWpkCRfy@top2.nearest.of.inzone.internal:5432/inzone

class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
