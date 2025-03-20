# auth-back/audios/index.py

import asyncio
from conexion import obtener_conexion  # Importa la función para obtener la conexión a la base de datos
from consultas import obtener_audios  # Importa la función para obtener los audios

# Función para recibir el id_usuario
async def recibir_id_usuario(id_usuario):
    print(f"ID de usuario recibido en auth-back/audios/index.py: {id_usuario}")
    await obtener_audios_usuario(id_usuario)  # Llama a la función asincrónica para obtener los audios del usuario

# Función asincrónica para obtener audios de un usuario
async def obtener_audios_usuario(id_usuario):
    conexion = obtener_conexion()  # Obtén la conexión aquí
    print(f"Conexión obtenida: {conexion}")  # Verifica que la conexión no sea None
    try:
        # Aquí pasas la conexión a la función obtener_audios
        await obtener_audios(id_usuario, conexion)  # Llamada a obtener_audios con la conexión
    except Exception as e:
        print(f"Error al obtener audios del usuario {id_usuario}: {e}")
    finally:
        conexion.close()  # Asegúrate de cerrar la conexión para evitar fugas
