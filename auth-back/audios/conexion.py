#auth-back/audios/conexion.py
import pymysql  # Importa la librería para conectar con MySQL

def obtener_conexion():
    """
    Establece y devuelve una conexión a la base de datos MySQL.

    Retorna:
        connection: Objeto de conexión a la base de datos.
    """
    print("Conectando a la base de datos...")  # Mensaje informativo
    connection = pymysql.connect(
        host='localhost',  # Dirección del servidor MySQL
        user='root',  # Usuario de MySQL
        password='',  # Contraseña vacía en este caso
        database='feedback'  # Nombre de la base de datos
    )
    return connection
