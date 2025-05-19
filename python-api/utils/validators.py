import re
from datetime import datetime

class ValidationError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


def validar_email(email: str):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(pattern, email):
        raise ValidationError("Email inválido.")


def validar_senha(senha: str, min_len=6):
    if len(senha) < min_len:
        raise ValidationError(f"A senha deve ter pelo menos {min_len} caracteres.")


def validar_data_iso(data_str: str):
    try:
        return datetime.strptime(data_str, "%Y-%m-%d")
    except ValueError:
        raise ValidationError("Data inválida. Use o formato YYYY-MM-DD.")


def validar_campos_obrigatorios(data: dict, campos: list):
    for campo in campos:
        if campo not in data or data[campo] is None or data[campo] == "":
            raise ValidationError(f"O campo '{campo}' é obrigatório.")
