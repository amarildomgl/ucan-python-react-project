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
                imagem_url="1.jpg"
            ),
            Brinquedo(
                nome="Carrinho de Controle Remoto",
                categoria="Carrinhos",
                idade_recomendada="6-10 anos",
                descricao="Carrinho rápido com controle remoto de longo alcance",
                imagem_url="2.jpg"
            ),
            Brinquedo(
                nome="Jogo de Blocos de Montar",
                categoria="Blocos de Montar",
                idade_recomendada="4-10 anos",
                descricao="Blocos coloridos para montar diferentes estruturas criativas",
                imagem_url="3.jpg"
            ),
            Brinquedo(
                nome="Ursinho de Pelúcia",
                categoria="Pelúcias",
                idade_recomendada="1-5 anos",
                descricao="Ursinho de pelúcia macio e fofinho",
                imagem_url="4.jpg"
            ),
            Brinquedo(
                nome="Quebra-Cabeça de Animais",
                categoria="Quebra-Cabeças",
                idade_recomendada="5-9 anos",
                descricao="Quebra-cabeça educativo com imagens de animais da floresta",
                imagem_url="5.jpg"
            ),
            Brinquedo(
                nome="Cozinha Infantil",
                categoria="Brinquedos de Faz de Conta",
                idade_recomendada="3-7 anos",
                descricao="Mini cozinha com utensílios para brincadeiras de faz de conta",
                imagem_url="6.jpg"
            ),
            Brinquedo(
                nome="Robô Educativo",
                categoria="Eletrônicos Educativos",
                idade_recomendada="7-12 anos",
                descricao="Robô interativo que ensina programação básica para crianças",
                imagem_url="7.jpg"
            ),
            Brinquedo(
                nome="Kit de Ciência Júnior",
                categoria="Educativos",
                idade_recomendada="8-12 anos",
                descricao="Kit com experiências científicas seguras para crianças",
                imagem_url="8.jpg"
            ),
            Brinquedo(
                nome="Pião Colorido",
                categoria="Clássicos",
                idade_recomendada="3-6 anos",
                descricao="Pião de madeira que gira rapidamente com diversas cores",
                imagem_url="9.jpg"
            ),
            Brinquedo(
                nome="Skate Infantil",
                categoria="Esportes",
                idade_recomendada="6-12 anos",
                descricao="Skate seguro e leve, ideal para iniciantes",
                imagem_url="10.jpg"
            )
        ]
        for brinquedo in brinquedos:
            db.session.add(brinquedo)
        db.session.commit()
