import os
import io  # Manejo de flujos de datos en memoria
from pydub import AudioSegment
from pydub.utils import mediainfo
import speech_recognition as SR
from conexion import obtener_conexion
from consultas import obtener_audios
id_usuario = 270


def procesar_audios(id_usuario):
    """
    Procesa los audios de un usuario y realiza reconocimiento de voz.
    
    Parámetros:
        id_usuario (int): ID del usuario cuyos audios se van a procesar.
    """
    conexion = obtener_conexion()
    try:
        audios = obtener_audios(id_usuario, conexion)  # Obtiene los audios del usuario

        for id_audio, audio_filename in audios:
            print(f"\nProcesando audio con ID: {id_audio}...")

            # Construye la ruta completa del archivo de audio
            audio_path = os.path.join(
                os.getcwd(),
                'auth-back/audios/archivos_audios',
                audio_filename.decode('utf-8')
            )

            print(f"📂 Buscando archivo en: {audio_path}")

            if not os.path.exists(audio_path):
                print(f"⚠️ ERROR: No se encontró el archivo {audio_path}")
                continue

            try:
                print("Obteniendo información del archivo de audio...")
                audio_info = mediainfo(audio_path)
                formato = audio_info.get('format_name', 'desconocido')
                print(f"🎵 Formato detectado: {formato}")

                print("Intentando cargar el audio con pydub...")
                audio_segment = AudioSegment.from_file(audio_path)

                print("Exportando audio a WAV en memoria...")
                wav_file = io.BytesIO()
                audio_segment.export(wav_file, format="wav")
                wav_file.seek(0)

                print("Procesando reconocimiento de voz...")
                r = SR.Recognizer()
                with SR.AudioFile(wav_file) as source:
                    audio_data = r.record(source)

                    try:
                        print("Reconociendo el audio con Google Speech Recognition...")
                        text = r.recognize_google(audio_data, language='es-ES')
                        print(f"📝 Texto reconocido: {text}")
                    except SR.UnknownValueError:
                        print("⚠️ No se pudo reconocer el audio.")
                    except SR.RequestError as e:
                        print(f"❌ Error en la solicitud de reconocimiento de voz: {e}")

            except Exception as e:
                print(f"⚠️ Error al procesar el archivo de audio: {e}")

    finally:
        print("Cerrando conexión con la base de datos...")
        conexion.close()

    print("✅ Proceso completado.")
