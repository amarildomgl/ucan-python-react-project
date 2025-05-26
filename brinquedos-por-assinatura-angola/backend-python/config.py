import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'brinquedos.db')
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@localhost/brinquedos'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = '1000020998'
