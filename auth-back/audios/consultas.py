#auth-back/audios/consultas.py
from conexion import obtener_conexion  # 📌 Importa la conexión desde conexion.py

def obtener_audios(id_usuario, conexion):

    """
    Obtiene los nombres de los archivos de audio de un usuario.

    Parámetros:
        id_usuario (int): ID del usuario en la base de datos.

    Retorna:
        list: Lista de tuplas con (id_audio, nombre_archivo).
    """
    conexion = obtener_conexion()  # 🔗 Llama a la función de conexion.py para obtener la conexión.

    try:
        cur = conexion.cursor()  # Crea un cursor para ejecutar la consulta
        cur.execute('SELECT id, audio FROM audios WHERE id_usuario = %s', (id_usuario,))  # Ejecuta la consulta SQL
        audios = cur.fetchall()  # Obtiene los resultados de la consulta
        return audios  # 📌 Esta lista será utilizada en index.py para procesar los audios.
    except Exception as e:
        print(f"❌ Error al obtener audios: {e}")  # Mensaje de error si la consulta falla
        return []
    finally:
        conexion.close()  # 🔗 Cierra la conexión con MySQL cuando termina la consulta.
