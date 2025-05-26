from extensions import db

class Subscricao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    plano_id = db.Column(db.Integer, db.ForeignKey('plano.id'), nullable=False)
    data_inicio = db.Column(db.DateTime)
    data_fim = db.Column(db.DateTime)
    ativa = db.Column(db.Boolean, default=True)
    brinquedos = db.relationship('BrinquedoSubscricao', backref='subscricao', lazy=True)
