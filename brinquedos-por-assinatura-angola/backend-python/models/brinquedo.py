from extensions import db

class Brinquedo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    idade_recomendada = db.Column(db.String(20), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    disponivel = db.Column(db.Boolean, default=True)
    imagem_url = db.Column(db.String(200))
    subscricoes = db.relationship('BrinquedoSubscricao', backref='brinquedo', lazy=True)
