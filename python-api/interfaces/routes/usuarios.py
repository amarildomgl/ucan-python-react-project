from flask import Blueprint, request, jsonify
from core.usecases.registrar_usuario import RegistrarUsuario
from core.usecases.autenticar_usuario import AutenticarUsuario
from adapters.repositories.usuario_repository import UsuarioRepository
from adapters.repositories.plano_repository import PlanoRepository
from flask_jwt_extended import create_access_token
from datetime import timedelta

bp = Blueprint('usuarios', __name__, url_prefix='/usuarios')

@bp.route('/registro', methods=['POST'])
def registrar_usuario():
    data = request.json
    usecase = RegistrarUsuario(UsuarioRepository(), PlanoRepository())

    try:
        user = usecase.executar(data)
        return jsonify({"msg": "Usuário registrado com sucesso", "id": user.id}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400


@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    usecase = AutenticarUsuario(UsuarioRepository())

    try:
        user = usecase.executar(data)
        access_token = create_access_token(identity=user.id, expires_delta=timedelta(days=1))
        return jsonify(access_token=access_token), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 401
