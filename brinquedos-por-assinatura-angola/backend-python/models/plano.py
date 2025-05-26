from extensions import db

class Plano(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.String(200), nullable=False)
    preco = db.Column(db.Float, nullable=False)
    quantidade_brinquedos = db.Column(db.Integer, nullable=False)
    subscricoes = db.relationship('Subscricao', backref='plano', lazy=True)
