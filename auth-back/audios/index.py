import asyncio
from conexion import obtener_conexion  # Importa la conexión desde conexion.py
from consultas import obtener_audios  # Importa la función correctamente

# Función para recibir el id_usuario
async def recibir_id_usuario(id_usuario):
    print(f"ID de usuario recibido en auth-back/audios/index.py: {id_usuario}")
    await obtener_audios_usuario(id_usuario)  # Llama a la función sin esperar respuesta

# Función asincrónica para obtener audios de un usuario
async def obtener_audios_usuario(id_usuario):
    conexion = obtener_conexion()  # Se obtiene la conexión antes de pasarla
    try:
        obtener_audios(id_usuario, conexion)  # Se pasa id_usuario y la conexión
    except Exception as e:
        print(f"Error al obtener audios del usuario {id_usuario}: {e}")
    finally:
        conexion.close()  # Se cierra la conexión para evitar fugas
