import json

def enviar_json(json_data):
    print("\nJSON enviado automáticamente:")
    print(" Tipo de json_data:", type(json_data))  # Tipo de dato
    print(json_data)  # JSON crudo

def obtener_audios(id_usuario, conexion):
    print(f"\nID de usuario recibido: {id_usuario}")  # Verificar que el ID llega

    try:
        cur = conexion.cursor()
        cur.execute('SELECT id, audio FROM audios WHERE id_usuario = %s', (id_usuario,))
        audios = cur.fetchall()

        print(f"Datos obtenidos de la BD en auth-back/audios/consultas.py: {audios}")  # Verificar lo que devuelve la BD

        respuesta = {
            "id_usuario": id_usuario,
            "audios": [{"id_audio": audio[0], "nombre_archivo": audio[1]} for audio in audios]
        }

        json_respuesta = json.dumps(respuesta, ensure_ascii=False)
        
        print("\n"
        "JSON Generado:")
        print(json_respuesta)  # Mostrar JSON antes de enviarlo

        enviar_json(json_respuesta)
        return json_respuesta

    except Exception as e:
        error_respuesta = {
            "error": f"Error al obtener audios del usuario {id_usuario}: {str(e)}"
        }
        return json.dumps(error_respuesta, ensure_ascii=False)

    finally:
        cur.close()
