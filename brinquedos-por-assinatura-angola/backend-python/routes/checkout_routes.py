from flask import Blueprint, jsonify, request
from models.plano import Plano
from models.subscricao import Subscricao
from extensions import db
from utils.jwt_utils import decode_token
import datetime

bp = Blueprint('checkout', __name__, url_prefix='/api')

@bp.route('/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'mensagem': 'Token não fornecido'}), 401
    token = auth_header.split(' ')[1]
    usuario_id = decode_token(token)
    if isinstance(usuario_id, str):
        return jsonify({'mensagem': usuario_id}), 401
    plano = Plano.query.filter_by(id=data['plano_id']).first()
    if not plano:
        return jsonify({'mensagem': 'Plano não encontrado'}), 404
    data_fim = datetime.datetime.utcnow() + datetime.timedelta(days=30)
    nova_subscricao = Subscricao(
        usuario_id=usuario_id,
        plano_id=plano.id,
        data_inicio=datetime.datetime.utcnow(),
        data_fim=data_fim,
        ativa=True
    )
    db.session.add(nova_subscricao)
    db.session.commit()
    return jsonify({
        'mensagem': 'Subscricao ativada com sucesso',
        'subscricao': {
            'id': nova_subscricao.id,
            'plano': {
                'id': plano.id,
                'nome': plano.nome
            },
            'data_inicio': nova_subscricao.data_inicio.strftime('%d/%m/%Y'),
            'data_fim': nova_subscricao.data_fim.strftime('%d/%m/%Y')
        }
    }), 201
