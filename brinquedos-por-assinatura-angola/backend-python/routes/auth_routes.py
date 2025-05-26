from flask import Blueprint, request, jsonify
from models.usuario import Usuario
from extensions import db
from utils.jwt_utils import gerar_token

bp = Blueprint('auth', __name__, url_prefix='/api')

@bp.route('/registar', methods=['POST'])
def registar():
    data = request.get_json()
    usuario_existente = Usuario.query.filter_by(email=data['email']).first()
    if usuario_existente:
        return jsonify({'mensagem': 'Email já registado'}), 400
    novo_usuario = Usuario(
        nome=data['nome'],
        email=data['email'],
        telefone=data['telefone'],
        senha=data['password']
    )
    db.session.add(novo_usuario)
    db.session.commit()
    token = gerar_token(novo_usuario.id)
    return jsonify({
        'token': token,
        'user': {
            'id': novo_usuario.id,
            'nome': novo_usuario.nome,
            'email': novo_usuario.email,
            'telefone': novo_usuario.telefone
        }
    }), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = Usuario.query.filter_by(email=data['email']).first()
    if usuario and usuario.senha == data['password']:
        token = gerar_token(usuario.id)
        return jsonify({
            'token': token,
            'user': {
                'id': usuario.id,
                'nome': usuario.nome,
                'email': usuario.email,
                'telefone': usuario.telefone
            }
        }), 200
    return jsonify({'mensagem': 'Email ou senha incorretos'}), 401
