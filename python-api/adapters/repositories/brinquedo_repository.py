from adapters.orm.models import Brinquedo
from db import db

class BrinquedoRepository:
    def esta_disponivel(self, brinquedo_id):
        brinquedo = Brinquedo.query.get(brinquedo_id)
        return brinquedo and brinquedo.disponivel

    def marcar_indisponivel(self, brinquedo_id):
        brinquedo = Brinquedo.query.get(brinquedo_id)
        if brinquedo:
            brinquedo.disponivel = False
            db.session.commit()

    def listar(self):
        return Brinquedo.query.all()

    def criar(self, nome, descricao=""):
        brinquedo = Brinquedo(nome=nome, descricao=descricao)
        db.session.add(brinquedo)
        db.session.commit()
        return brinquedo
