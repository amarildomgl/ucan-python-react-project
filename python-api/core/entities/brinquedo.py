class Brinquedo:
    def __init__(self, nome: str, descricao: str = "", disponivel: bool = True):
        self.nome = nome
        self.descricao = descricao
        self.disponivel = disponivel
