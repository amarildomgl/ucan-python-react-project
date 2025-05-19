from utils.validators import validar_campos_obrigatorios

class AutenticarUsuario:
    def __init__(self, usuario_repo):
        self.usuario_repo = usuario_repo

    def executar(self, data):
        validar_campos_obrigatorios(data, ['email', 'senha'])

        usuario = self.usuario_repo.buscar_por_email(data['email'])
        if not usuario or not usuario.verificar_senha(data['senha']):
            raise Exception("Credenciais inválidas.")

        return usuario
