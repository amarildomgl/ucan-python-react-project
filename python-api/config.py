import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///brinquedos.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret")
    DEBUG = os.getenv("DEBUG", True)

class DevelopmentConfig(Config):
    ENV = "development"

class ProductionConfig(Config):
    ENV = "production"
    DEBUG = False

config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
}
