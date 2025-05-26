from extensions import db
from models.plano import Plano
from models.brinquedo import Brinquedo

def seed():
    if Plano.query.count() == 0:
        planos = [
            Plano(nome="Básico", descricao="2 brinquedos por mês", preco=4900, quantidade_brinquedos=2),
            Plano(nome="Padrão", descricao="4 brinquedos por mês", preco=7900, quantidade_brinquedos=4),
            Plano(nome="Premium", descricao="6 brinquedos por mês", preco=11900, quantidade_brinquedos=6)
        ]
        for plano in planos:
            db.session.add(plano)
        brinquedos = [
            Brinquedo(
                nome="Boneca Interativa",
                categoria="Bonecas",
                idade_recomendada="3-6 anos",
                descricao="Boneca que fala e canta músicas em português",
                imagem_url="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
            ),
            # ...adicione os outros brinquedos aqui, igual ao app.py original...
        ]
        for brinquedo in brinquedos:
            db.session.add(brinquedo)
        db.session.commit()
