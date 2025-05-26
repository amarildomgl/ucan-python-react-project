from flask import Blueprint, jsonify
from models.plano import Plano

bp = Blueprint('planos', __name__, url_prefix='/api')

@bp.route('/planos', methods=['GET'])
def obter_planos():
    planos = Plano.query.all()
    resultado = []
    for plano in planos:
        resultado.append({
            'id': plano.id,
            'nome': plano.nome,
            'descricao': plano.descricao,
            'preco': plano.preco,
            'quantidade_brinquedos': plano.quantidade_brinquedos
        })
    return jsonify(resultado), 200
