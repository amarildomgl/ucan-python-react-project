from flask import Blueprint, jsonify
from models.brinquedo import Brinquedo

bp = Blueprint('brinquedos', __name__, url_prefix='/api')

@bp.route('/brinquedos', methods=['GET'])
def obter_brinquedos():
    brinquedos = Brinquedo.query.filter_by(disponivel=True).all()
    resultado = []
    for brinquedo in brinquedos:
        resultado.append({
            'id': brinquedo.id,
            'nome': brinquedo.nome,
            'categoria': brinquedo.categoria,
            'idade_recomendada': brinquedo.idade_recomendada,
            'descricao': brinquedo.descricao,
            'imagem_url': brinquedo.imagem_url
        })
    return jsonify(resultado), 200
