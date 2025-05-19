from flask import Flask
from db import db
from config import config_by_name
from services.jwt_service import init_jwt

# Blueprints
from interfaces.routes import brinquedos, reservas, clientes, usuarios

def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    # Inicializa extensões
    db.init_app(app)
    init_jwt(app)

    # Registra rotas
    app.register_blueprint(brinquedos.bp)
    app.register_blueprint(reservas.bp)
    app.register_blueprint(clientes.bp)
    app.register_blueprint(usuarios.bp)

    with app.app_context():
        from adapters.orm import models  # Garante que os modelos sejam registrados
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app("development")
    app.run()
