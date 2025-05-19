from datetime import date

class Reserva:
    def __init__(self, cliente_id, brinquedo_id, usuario_id, data_evento: date):
        self.cliente_id = cliente_id
        self.brinquedo_id = brinquedo_id
        self.usuario_id = usuario_id
        self.data_evento = data_evento
