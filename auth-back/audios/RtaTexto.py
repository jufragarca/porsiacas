import json

json_respuesta = '''
{
    "id_usuario": 270,
    "audios": [
        {"id_audio": 1, "nombre_archivo": "audio1.mp3"},
        {"id_audio": 2, "nombre_archivo": "audio2.mp3"}
    ]
}
'''

respuesta_diccionario = json.loads(json_respuesta)

id_usuario = respuesta_diccionario["id_usuario"]
audios = respuesta_diccionario["audios"]

print(f"ID de usuario en auth-back/audios/RtaTexto.py: {id_usuario}")
for audio in audios:
    print(f"ID del audio: {audio['id_audio']}, Nombre del archivo: {audio['nombre_archivo']}")
