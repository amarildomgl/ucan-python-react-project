from flask import Flask, send_from_directory
from config import Config
from extensions import db, cors

# Import Blueprints
from routes.auth_routes import bp as auth_bp
from routes.plano_routes import bp as plano_bp
from routes.brinquedo_routes import bp as brinquedo_bp
from database.seed import seed

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
cors.init_app(app, resources={r"/*": {"origins": "*"}})

# Registrar Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(plano_bp)
app.register_blueprint(brinquedo_bp)

# Servir arquivos estáticos da pasta public
@app.route('/public/<path:filename>')
def public_files(filename):
    return send_from_directory('public', filename)

@app.before_request
def before_request_func():
    db.create_all()
    seed()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # Aqui você pode importar e rodar o seed do banco, se desejar
    app.run(debug=True, port=5000)
