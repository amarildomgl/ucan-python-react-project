from flask import Blueprint, request, jsonify
from adapters.repositories.brinquedo_repository import BrinquedoRepository

bp = Blueprint('brinquedos', __name__, url_prefix='/brinquedos')

@bp.route('/', methods=['GET'])
def listar_brinquedos():
    brinquedos = BrinquedoRepository().listar()
    return jsonify([
        {
            "id": b.id,
            "nome": b.nome,
            "descricao": b.descricao,
            "disponivel": b.disponivel
        } for b in brinquedos
    ])


@bp.route('/', methods=['POST'])
def criar_brinquedo():
    data = request.json
    try:
        novo = BrinquedoRepository().criar(data['nome'], data.get('descricao', ''))
        return jsonify({"id": novo.id, "nome": novo.nome}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
