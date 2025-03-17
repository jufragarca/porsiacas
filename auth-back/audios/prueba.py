#auth-back/audios/prueba.py
# auth-back/audios/prueba.py
import sys
import asyncio
from index import recibir_id_usuario  # Importa la función asincrónica

# Obtener el id_usuario desde los argumentos de la línea de comandos
if len(sys.argv) < 2:
    print("ERROR: Se esperaba un id_usuario como argumento.")  # Si no se pasa el id_usuario, muestra un error
    sys.exit(1)  # Sale del script si no se pasa el id_usuario

# Convertir el argumento a un entero y asignarlo a id_usuario
id_usuario = int(sys.argv[1])  # Convirtiendo el id_usuario recibido en un entero

# Imprimir el id_usuario recibido
print(f"ID de usuario recibido en auth-back/audios/prueba.py: {id_usuario}")

# Ejecutar la función asincrónica correctamente
async def main():
    await recibir_id_usuario(id_usuario)  # Ejecuta la función correctamente

asyncio.run(main())  # Ejecuta la función asincrónica
