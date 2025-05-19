from flask_jwt_extended import JWTManager
from interfaces.auth import configure_jwt_callbacks

jwt = JWTManager()

def init_jwt(app):
    jwt.init_app(app)
    configure_jwt_callbacks(app)
