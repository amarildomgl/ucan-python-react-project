from flask_jwt_extended import JWTManager
from flask import jsonify

jwt = JWTManager()

def configure_jwt_callbacks(app):

    @jwt.unauthorized_loader
    def unauthorized_callback(callback):
        return jsonify({"erro": "Token de acesso ausente ou inválido"}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({"erro": "Token inválido"}), 401

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({"erro": "Token expirado"}), 401

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return jsonify({"erro": "Token revogado"}), 401

    @jwt.needs_fresh_token_loader
    def fresh_token_required_callback(jwt_header, jwt_payload):
        return jsonify({"erro": "Token não é fresco"}), 401

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        from adapters.repositories.usuario_repository import UsuarioRepository
        identity = jwt_data["sub"]
        repo = UsuarioRepository()
        return repo.buscar_por_id(identity)
