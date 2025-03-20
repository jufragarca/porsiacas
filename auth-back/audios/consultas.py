import os
import io
import json
from flask import Flask, jsonify
from pydub import AudioSegment
from pydub.utils import mediainfo
import speech_recognition as SR

app = Flask(__name__)

# Lista en memoria para almacenar los resultados
resultados_transcripcion = []

import requests

import requests

def jsonEnvia(resultado):
    """Guarda en memoria y envía automáticamente a Node.js."""
    print("Entrando a jsonEnvia()")
    resultados_transcripcion.append(resultado)
    print(f"Resultados actuales en memoria: {resultados_transcripcion}")

    url_node = "http://localhost:3001/api/intermedioAudios"


    try:
        print(f"Enviando a Node.js: {resultado}")  # <-- Mensaje de confirmación
        response = requests.post(url_node, json=resultado)
        print(f"Respuesta de Node.js: {response.status_code}, {response.text}")  # <-- Ver qué responde Node.js
    except Exception as e:
        print(f"Error al enviar a Node.js: {e}")  # <-- Si hay error, verlo

@app.route('/resultados', methods=['GET'])
def obtener_resultados():
    """API para obtener los resultados almacenados en memoria."""
    return jsonify(resultados_transcripcion)

def procesar_audios(audio_filename, id_audio):
    print("Entre a procesar_audios")
    
    audio_path = os.path.join(os.getcwd(), 'audios/archivos_audios', audio_filename)
    print(f"Ruta completa del archivo de audio: {audio_path}")

    if not os.path.exists(audio_path):  
        print(f"ERROR: No se encontró el archivo en la ruta {audio_path}")
        return {"id_audio": id_audio, "texto_reconocido": None}
    
    try:
        audio_info = mediainfo(audio_path)
        formato = audio_info.get('format_name', 'desconocido')
        print(f"Formato detectado: {formato}")

        audio_segment = AudioSegment.from_file(audio_path)
        
        wav_file = io.BytesIO()
        audio_segment.export(wav_file, format="wav")
        wav_file.seek(0)
        
        r = SR.Recognizer()
        with SR.AudioFile(wav_file) as source:
            audio_data = r.record(source)
            
            try:
                text = r.recognize_google(audio_data, language='es-ES')
                print(f"Texto reconocido: {text}")

                resultado = {"id_audio": id_audio, "texto_reconocido": text}
                jsonEnvia(resultado)  # Guarda en memoria

                return resultado
            except SR.UnknownValueError:
                print("No se pudo reconocer el audio.")
            except SR.RequestError as e:
                print(f"Error en la solicitud de reconocimiento de voz: {e}")

    except Exception as e:
        print(f"Error al procesar el archivo de audio: {e}")

    return {"id_audio": id_audio, "texto_reconocido": None}

async def obtener_audios(id_usuario, conexion):
    print(f"\nID de usuario recibido: {id_usuario}")

    try:
        cur = conexion.cursor()
        cur.execute('SELECT id, audio FROM audios WHERE id_usuario = %s', (id_usuario,))
        audios = cur.fetchall()

        print(f"Datos obtenidos de la BD: {audios}")

        resultados = []

        for audio in audios:
            id_audio = audio[0]
            audio_filename = audio[1].decode()
            print(f"Procesando audio con id: {id_audio} y archivo: {audio_filename}")
            resultado = procesar_audios(audio_filename, id_audio)
            resultados.append(resultado)
            print(f"Resultado para el audio con ID {id_audio}: {resultado}")

        print("\nResultados completos:")
        print(resultados)

        return resultados

    except Exception as e:
        error_respuesta = {"error": f"Error al obtener audios del usuario {id_usuario}: {str(e)}"}
        return error_respuesta

if __name__ == '__main__':
    app.run(debug=True, port=3001)  # Flask se ejecuta en el puerto 3001
