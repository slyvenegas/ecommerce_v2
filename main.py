from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Configurar la base de datos SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Definir el modelo de usuario
class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)

# Crear la base de datos y las tablas
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Modelo para recibir datos del formulario de registro
class UserCreate(BaseModel):
    username: str
    password: str

# Ruta para el registro de usuarios
@app.post("/register")
async def register(user: UserCreate):
    db = SessionLocal()
    # Verificar si el usuario ya existe en la base de datos
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        return {"message": "El usuario ya está registrado"}
    # Crear una instancia del modelo User con los datos recibidos del formulario
    db_user = User(username=user.username, password=user.password)
    # Agregar el usuario a la base de datos
    db.add(db_user)
    db.commit()
    db.close()
    return {"message": "Registro exitoso"}

# Ruta para el inicio de sesión de usuarios
@app.post("/login")
async def login(username: str, password: str):
    # Lógica para verificar las credenciales del usuario y realizar el inicio de sesión
    return {"message": "Inicio de sesión exitoso"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
