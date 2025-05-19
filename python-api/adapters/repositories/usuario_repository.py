from adapters.orm.models import Usuario
from db import db

class UsuarioRepository:
    def buscar_por_email(self, email):
        return Usuario.query.filter_by(email=email).first()

    def buscar_por_id(self, id):
        return Usuario.query.get(id)

    def criar(self, email, senha, plano_id):
        user = Usuario(email=email, plano_id=plano_id)
        user.set_senha(senha)
        db.session.add(user)
        db.session.commit()
        return user
