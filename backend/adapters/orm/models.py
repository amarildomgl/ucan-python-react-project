from db import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class Plano(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    limite_reservas = db.Column(db.Integer, nullable=False)


class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(128), nullable=False)
    plano_id = db.Column(db.Integer, db.ForeignKey('plano.id'), nullable=False)

    plano = db.relationship('Plano')

    def set_senha(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def verificar_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)


class Brinquedo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=True)
    disponivel = db.Column(db.Boolean, default=True)


class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    contacto = db.Column(db.String(20), nullable=False)


class Reserva(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    brinquedo_id = db.Column(db.Integer, db.ForeignKey('brinquedo.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    data_reserva = db.Column(db.Date, default=datetime.utcnow)
    data_evento = db.Column(db.Date, nullable=False)

    cliente = db.relationship('Cliente')
    brinquedo = db.relationship('Brinquedo')
    usuario = db.relationship('Usuario')
