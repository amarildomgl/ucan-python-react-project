from flask import Blueprint, jsonify, request
from models.usuario import Usuario
from models.subscricao import Subscricao
from models.plano import Plano
from models.brinquedo_subscricao import BrinquedoSubscricao
from models.brinquedo import Brinquedo
from extensions import db
from utils.jwt_utils import decode_token
import datetime

bp = Blueprint('perfil', __name__, url_prefix='/api')

@bp.route('/perfil', methods=['GET'])
def obter_perfil():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'mensagem': 'Token não fornecido'}), 401
    token = auth_header.split(' ')[1]
    usuario_id = decode_token(token)
    if isinstance(usuario_id, str):
        return jsonify({'mensagem': usuario_id}), 401
    usuario = Usuario.query.filter_by(id=usuario_id).first()
    if not usuario:
        return jsonify({'mensagem': 'Usuário não encontrado'}), 404
    # Buscar todas as subscrições do usuário, ordenadas da mais recente para a mais antiga
    subscricoes = (
        Subscricao.query
        .filter_by(usuario_id=usuario.id)
        .order_by(Subscricao.data_inicio.desc())
        .all()
    )
    subs_data = []
    for sub in subscricoes:
        plano = Plano.query.filter_by(id=sub.plano_id).first()
        brinquedos_subs = BrinquedoSubscricao.query.filter_by(subscricao_id=sub.id, devolvido=False).all()
        brinquedos_data = []
        for bs in brinquedos_subs:
            brinquedo = Brinquedo.query.filter_by(id=bs.brinquedo_id).first()
            brinquedos_data.append({
                'id': brinquedo.id,
                'nome': brinquedo.nome,
                'data_emprestimo': bs.data_emprestimo.strftime('%d/%m/%Y'),
                'data_devolucao': bs.data_devolucao.strftime('%d/%m/%Y') if bs.data_devolucao else None
            })
        subs_data.append({
            'id': sub.id,
            'plano': {
                'id': plano.id,
                'nome': plano.nome,
                'quantidade_brinquedos': plano.quantidade_brinquedos
            },
            'data_inicio': sub.data_inicio.strftime('%d/%m/%Y'),
            'data_fim': sub.data_fim.strftime('%d/%m/%Y') if sub.data_fim else None,
            'ativa': sub.ativa,
            'brinquedos': brinquedos_data
        })
    return jsonify({
        'id': usuario.id,
        'nome': usuario.nome,
        'email': usuario.email,
        'telefone': usuario.telefone,
        'subscricoes': subs_data
    }), 200
