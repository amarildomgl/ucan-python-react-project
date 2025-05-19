class Usuario:
    def __init__(self, email: str, senha: str, plano_id: int):
        self.email = email
        self.senha = senha  # senha simples, deve ser criptografada no repositório
        self.plano_id = plano_id
