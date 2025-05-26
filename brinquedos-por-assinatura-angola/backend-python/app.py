from flask import Flask
from config import Config
from extensions import db, cors

# Import Blueprints
from routes.auth_routes import bp as auth_bp
from routes.plano_routes import bp as plano_bp
from routes.brinquedo_routes import bp as brinquedo_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
cors.init_app(app, resources={r"/*": {"origins": "*"}})

# Registrar Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(plano_bp)
app.register_blueprint(brinquedo_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # Aqui você pode importar e rodar o seed do banco, se desejar
    app.run(debug=True, port=5000)
