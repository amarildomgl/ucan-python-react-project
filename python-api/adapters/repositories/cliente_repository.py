from adapters.orm.models import Cliente
from db import db

class ClienteRepository:
    def buscar_por_id(self, id):
        return Cliente.query.get(id)

    def criar(self, nome, contacto):
        cliente = Cliente(nome=nome, contacto=contacto)
        db.session.add(cliente)
        db.session.commit()
        return cliente
