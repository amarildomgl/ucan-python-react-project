from adapters.orm.models import Reserva
from db import db

class ReservaRepository:
    def criar(self, reserva_entity):
        reserva = Reserva(**reserva_entity.__dict__)
        db.session.add(reserva)
        db.session.commit()
        return reserva

    def contar_reservas_mes(self, usuario_id, data):
        return Reserva.query.filter(
            Reserva.usuario_id == usuario_id,
            Reserva.data_evento.month == data.month,
            Reserva.data_evento.year == data.year
        ).count()

    def listar_por_usuario(self, usuario_id):
        return Reserva.query.filter_by(usuario_id=usuario_id).all()
