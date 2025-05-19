from datetime import datetime

class CriarReserva:
    def __init__(self, reserva_repo, plano_repo, brinquedo_repo):
        self.reserva_repo = reserva_repo
        self.plano_repo = plano_repo
        self.brinquedo_repo = brinquedo_repo

    def executar(self, reserva):
        data = reserva.data_evento
        if data < datetime.today().date():
            raise Exception("A data do evento deve ser futura.")

        limite = self.plano_repo.obter_limite_reservas(reserva.usuario_id)
        reservas_atuais = self.reserva_repo.contar_reservas_mes(reserva.usuario_id, data)

        if reservas_atuais >= limite:
            raise Exception("Limite de reservas mensais atingido para o plano atual.")

        if not self.brinquedo_repo.esta_disponivel(reserva.brinquedo_id):
            raise Exception("Brinquedo não está disponível.")

        self.brinquedo_repo.marcar_indisponivel(reserva.brinquedo_id)
        return self.reserva_repo.criar(reserva)
