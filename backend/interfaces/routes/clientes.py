from flask import Blueprint, request, jsonify
from adapters.repositories.cliente_repository import ClienteRepository

bp = Blueprint('clientes', __name__, url_prefix='/clientes')

@bp.route('/', methods=['POST'])
def criar_cliente():
    data = request.json
    try:
        cliente = ClienteRepository().criar(data['nome'], data['contacto'])
        return jsonify({"id": cliente.id, "nome": cliente.nome}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400
