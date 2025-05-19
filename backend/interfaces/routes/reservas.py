from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from core.entities.reserva import Reserva
from core.usecases.criar_reserva import CriarReserva
from adapters.repositories.reserva_repository import ReservaRepository
from adapters.repositories.plano_repository import PlanoRepository
from adapters.repositories.brinquedo_repository import BrinquedoRepository

bp = Blueprint('reservas', __name__, url_prefix='/reservas')

@bp.route('/', methods=['POST'])
@jwt_required()
def criar_reserva():
    usuario_id = get_jwt_identity()
    data = request.json

    try:
        reserva = Reserva(
            cliente_id=data['cliente_id'],
            brinquedo_id=data['brinquedo_id'],
            usuario_id=usuario_id,
            data_evento=data['data_evento']
        )

        usecase = CriarReserva(
            ReservaRepository(),
            PlanoRepository(),
            BrinquedoRepository()
        )
        created = usecase.executar(reserva)
        return jsonify({"id": created.id}), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400


@bp.route('/', methods=['GET'])
@jwt_required()
def listar_reservas_usuario():
    usuario
