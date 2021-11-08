import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'antonina'
    SQLALCHEMY_DATABASE_URI = 'postgresql://Inzoneb:TpdsD16ZRmxy4mqs@inzone-b-pg-inzone-b-project.aivencloud.com:15460/inzone?sslmode=require'


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
