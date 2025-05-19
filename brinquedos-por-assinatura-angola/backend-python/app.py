from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import jwt
import datetime
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure SQLite database
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'brinquedos.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'sua_chave_secreta_muito_segura'

# Initialize database
db = SQLAlchemy(app)

# Models
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    senha = db.Column(db.String(100), nullable=False)
    subscricoes = db.relationship('Subscricao', backref='usuario', lazy=True)

class Plano(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.String(200), nullable=False)
    preco = db.Column(db.Float, nullable=False)
    quantidade_brinquedos = db.Column(db.Integer, nullable=False)
    subscricoes = db.relationship('Subscricao', backref='plano', lazy=True)

class Brinquedo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    idade_recomendada = db.Column(db.String(20), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    disponivel = db.Column(db.Boolean, default=True)
    imagem_url = db.Column(db.String(200))
    subscricoes = db.relationship('BrinquedoSubscricao', backref='brinquedo', lazy=True)

class Subscricao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    plano_id = db.Column(db.Integer, db.ForeignKey('plano.id'), nullable=False)
    data_inicio = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    data_fim = db.Column(db.DateTime)
    ativa = db.Column(db.Boolean, default=True)
    brinquedos = db.relationship('BrinquedoSubscricao', backref='subscricao', lazy=True)

class BrinquedoSubscricao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brinquedo_id = db.Column(db.Integer, db.ForeignKey('brinquedo.id'), nullable=False)
    subscricao_id = db.Column(db.Integer, db.ForeignKey('subscricao.id'), nullable=False)
    data_emprestimo = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    data_devolucao = db.Column(db.DateTime)
    devolvido = db.Column(db.Boolean, default=False)

# Helper functions
def gerar_token(usuario_id):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': usuario_id
    }
    return jwt.encode(
        payload,
        app.config.get('SECRET_KEY'),
        algorithm='HS256'
    )

def decode_token(token):
    try:
        payload = jwt.decode(token, app.config.get('SECRET_KEY'), algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Token expirado. Por favor, entre novamente.'
    except jwt.InvalidTokenError:
        return 'Token inválido. Por favor, entre novamente.'

# Routes
@app.route('/api/registar', methods=['POST'])
def registar():
    data = request.get_json()
    
    # Check if user already exists
    usuario_existente = Usuario.query.filter_by(email=data['email']).first()
    if usuario_existente:
        return jsonify({'mensagem': 'Email já registado'}), 400
    
    # Create new user
    novo_usuario = Usuario(
        nome=data['nome'],
        email=data['email'],
        telefone=data['telefone'],
        senha=data['password']  # In production, hash the password!
    )
    
    db.session.add(novo_usuario)
    db.session.commit()
    
    token = gerar_token(novo_usuario.id)
    
    return jsonify({
        'token': token,
        'user': {
            'id': novo_usuario.id,
            'nome': novo_usuario.nome,
            'email': novo_usuario.email,
            'telefone': novo_usuario.telefone
        }
    }), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Find user
    usuario = Usuario.query.filter_by(email=data['email']).first()
    
    if usuario and usuario.senha == data['password']:  # In production, verify hashed password!
        token = gerar_token(usuario.id)
        
        return jsonify({
            'token': token,
            'user': {
                'id': usuario.id,
                'nome': usuario.nome,
                'email': usuario.email,
                'telefone': usuario.telefone
            }
        }), 200
    
    return jsonify({'mensagem': 'Email ou senha incorretos'}), 401

@app.route('/api/planos', methods=['GET'])
def obter_planos():
    planos = Plano.query.all()
    resultado = []
    
    for plano in planos:
        resultado.append({
            'id': plano.id,
            'nome': plano.nome,
            'descricao': plano.descricao,
            'preco': plano.preco,
            'quantidade_brinquedos': plano.quantidade_brinquedos
        })
    
    return jsonify(resultado), 200

@app.route('/api/brinquedos', methods=['GET'])
def obter_brinquedos():
    brinquedos = Brinquedo.query.filter_by(disponivel=True).all()
    resultado = []
    
    for brinquedo in brinquedos:
        resultado.append({
            'id': brinquedo.id,
            'nome': brinquedo.nome,
            'categoria': brinquedo.categoria,
            'idade_recomendada': brinquedo.idade_recomendada,
            'descricao': brinquedo.descricao,
            'imagem_url': brinquedo.imagem_url
        })
    
    return jsonify(resultado), 200

@app.route('/api/perfil', methods=['GET'])
def obter_perfil():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        return jsonify({'mensagem': 'Token não fornecido'}), 401
    
    token = auth_header.split(' ')[1]
    usuario_id = decode_token(token)
    
    if isinstance(usuario_id, str):
        return jsonify({'mensagem': usuario_id}), 401
    
    usuario = Usuario.query.filter_by(id=usuario_id).first()
    
    if not usuario:
        return jsonify({'mensagem': 'Usuário não encontrado'}), 404
    
    subscricoes = Subscricao.query.filter_by(usuario_id=usuario.id, ativa=True).all()
    subs_data = []
    
    for sub in subscricoes:
        plano = Plano.query.filter_by(id=sub.plano_id).first()
        brinquedos_subs = BrinquedoSubscricao.query.filter_by(subscricao_id=sub.id, devolvido=False).all()
        brinquedos_data = []
        
        for bs in brinquedos_subs:
            brinquedo = Brinquedo.query.filter_by(id=bs.brinquedo_id).first()
            brinquedos_data.append({
                'id': brinquedo.id,
                'nome': brinquedo.nome,
                'data_emprestimo': bs.data_emprestimo.strftime('%d/%m/%Y'),
                'data_devolucao': bs.data_devolucao.strftime('%d/%m/%Y') if bs.data_devolucao else None
            })
        
        subs_data.append({
            'id': sub.id,
            'plano': {
                'id': plano.id,
                'nome': plano.nome,
                'quantidade_brinquedos': plano.quantidade_brinquedos
            },
            'data_inicio': sub.data_inicio.strftime('%d/%m/%Y'),
            'data_fim': sub.data_fim.strftime('%d/%m/%Y') if sub.data_fim else None,
            'brinquedos': brinquedos_data
        })
    
    return jsonify({
        'id': usuario.id,
        'nome': usuario.nome,
        'email': usuario.email,
        'telefone': usuario.telefone,
        'subscricoes': subs_data
    }), 200

@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        return jsonify({'mensagem': 'Token não fornecido'}), 401
    
    token = auth_header.split(' ')[1]
    usuario_id = decode_token(token)
    
    if isinstance(usuario_id, str):
        return jsonify({'mensagem': usuario_id}), 401
    
    plano = Plano.query.filter_by(id=data['plano_id']).first()
    
    if not plano:
        return jsonify({'mensagem': 'Plano não encontrado'}), 404
    
    # Create subscription
    data_fim = datetime.datetime.utcnow() + datetime.timedelta(days=30)
    nova_subscricao = Subscricao(
        usuario_id=usuario_id,
        plano_id=plano.id,
        data_inicio=datetime.datetime.utcnow(),
        data_fim=data_fim,
        ativa=True
    )
    
    db.session.add(nova_subscricao)
    db.session.commit()
    
    return jsonify({
        'mensagem': 'Subscricao ativada com sucesso',
        'subscricao': {
            'id': nova_subscricao.id,
            'plano': {
                'id': plano.id,
                'nome': plano.nome
            },
            'data_inicio': nova_subscricao.data_inicio.strftime('%d/%m/%Y'),
            'data_fim': nova_subscricao.data_fim.strftime('%d/%m/%Y')
        }
    }), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Check if we already have data
        if Plano.query.count() == 0:
            # Add plans
            planos = [
                Plano(nome="Básico", descricao="2 brinquedos por mês", preco=4900, quantidade_brinquedos=2),
                Plano(nome="Padrão", descricao="4 brinquedos por mês", preco=7900, quantidade_brinquedos=4),
                Plano(nome="Premium", descricao="6 brinquedos por mês", preco=11900, quantidade_brinquedos=6)
            ]
            
            for plano in planos:
                db.session.add(plano)
            
            # Add toys
            brinquedos = [
                Brinquedo(nome="Boneca Interativa", categoria="Bonecas", idade_recomendada="3-6 anos", 
                         descricao="Boneca que fala e canta músicas em português", imagem_url="/brinquedos/boneca.jpg"),
                Brinquedo(nome="Carro de Controle Remoto", categoria="Veículos", idade_recomendada="5-10 anos", 
                         descricao="Carro 4x4 de controle remoto todo-terreno", imagem_url="/brinquedos/carro.jpg"),
                Brinquedo(nome="Blocos de Construção", categoria="Educativo", idade_recomendada="2-7 anos", 
                         descricao="Conjunto de 100 blocos coloridos para construir", imagem_url="/brinquedos/blocos.jpg"),
                Brinquedo(nome="Jogo de Tabuleiro Família", categoria="Jogos", idade_recomendada="6+ anos", 
                         descricao="Jogo divertido para toda a família", imagem_url="/brinquedos/tabuleiro.jpg"),
                Brinquedo(nome="Kit de Ciências", categoria="Educativo", idade_recomendada="8-12 anos", 
                         descricao="Kit para realizar 20 experiências científicas", imagem_url="/brinquedos/ciencias.jpg"),
                Brinquedo(nome="Quebra-Cabeça 100 peças", categoria="Puzzles", idade_recomendada="5-10 anos", 
                         descricao="Quebra-cabeça com tema de animais de Angola", imagem_url="/brinquedos/quebracabeca.jpg"),
                Brinquedo(nome="Bola de Futebol", categoria="Esportes", idade_recomendada="4+ anos", 
                         descricao="Bola de futebol oficial tamanho 4", imagem_url="/brinquedos/bola.jpg"),
                Brinquedo(nome="Instrumento Musical", categoria="Música", idade_recomendada="3-8 anos", 
                         descricao="Kit com diversos instrumentos musicais infantis", imagem_url="/brinquedos/musica.jpg")
            ]
            
            for brinquedo in brinquedos:
                db.session.add(brinquedo)
            
            db.session.commit()
    
    app.run(debug=True, port=5000)
