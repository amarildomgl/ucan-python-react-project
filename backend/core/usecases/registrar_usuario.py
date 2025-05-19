from utils.validators import validar_email, validar_senha, validar_campos_obrigatorios

class RegistrarUsuario:
    def __init__(self, usuario_repo, plano_repo):
        self.usuario_repo = usuario_repo
        self.plano_repo = plano_repo

    def executar(self, data):
        validar_campos_obrigatorios(data, ['email', 'senha', 'plano_id'])
        validar_email(data['email'])
        validar_senha(data['senha'])

        if self.usuario_repo.buscar_por_email(data['email']):
            raise Exception("Já existe um usuário com este e-mail.")

        plano = self.plano_repo.buscar_por_id(data['plano_id'])
        if not plano:
            raise Exception("Plano informado não existe.")

        return self.usuario_repo.criar(data['email'], data['senha'], plano.id)
