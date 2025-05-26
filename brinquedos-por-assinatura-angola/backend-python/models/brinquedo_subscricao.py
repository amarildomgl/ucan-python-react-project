from extensions import db

class BrinquedoSubscricao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brinquedo_id = db.Column(db.Integer, db.ForeignKey('brinquedo.id'), nullable=False)
    subscricao_id = db.Column(db.Integer, db.ForeignKey('subscricao.id'), nullable=False)
    data_emprestimo = db.Column(db.DateTime)
    data_devolucao = db.Column(db.DateTime)
    devolvido = db.Column(db.Boolean, default=False)
