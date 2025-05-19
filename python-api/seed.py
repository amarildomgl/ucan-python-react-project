# Script para popular o banco de dados com dados fictícios
# Execute: python seed.py

from adapters.orm.models import db, Plano, Usuario, Brinquedo, Cliente
from app import create_app

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Planos
    plano1 = Plano(nome="Básico", limite_reservas=2)
    plano2 = Plano(nome="Premium", limite_reservas=5)
    db.session.add_all([plano1, plano2])
    db.session.commit()

    # Usuários
    user1 = Usuario(email="user1@email.com", plano_id=plano1.id)
    user1.set_senha("password")
    user2 = Usuario(email="user2@email.com", plano_id=plano2.id)
    user2.set_senha("password")
    db.session.add_all([user1, user2])
    db.session.commit()

    # Brinquedos
    brinquedos = [
        Brinquedo(nome="Carrinho", descricao="Carrinho de controle remoto"),
        Brinquedo(nome="Boneca", descricao="Boneca de pano"),
        Brinquedo(nome="Lego", descricao="Blocos de montar"),
    ]
    db.session.add_all(brinquedos)
    db.session.commit()

    # Clientes
    clientes = [
        Cliente(nome="João Silva", contacto="999999999"),
        Cliente(nome="Maria Souza", contacto="888888888"),
    ]
    db.session.add_all(clientes)
    db.session.commit()

    print("Banco de dados populado com dados fictícios.")
