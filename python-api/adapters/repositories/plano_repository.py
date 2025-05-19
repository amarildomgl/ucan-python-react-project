from adapters.orm.models import Plano, Usuario

class PlanoRepository:
    def buscar_por_id(self, id):
        return Plano.query.get(id)

    def obter_limite_reservas(self, usuario_id):
        usuario = Usuario.query.get(usuario_id)
        return usuario.plano.limite_reservas if usuario else 0
