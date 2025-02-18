import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from "../auth/authConstants";

const DashboardUsuarios = () => {
  // Obtención de parámetros de la URL (en este caso, el 'id' del usuario)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  // Verificación del 'id' para asegurarse de que no esté vacío
  useEffect(() => {
    if (!id) {
      console.log("id vacío");
    } else {
      console.log("id", id);
    }
  }, [id]);

  // Estado para almacenar los audios grabados
  const [audio1, setAudio1] = useState<Blob | null>(null);
  const [audio2, setAudio2] = useState<Blob | null>(null);
  const [audio3, setAudio3] = useState<Blob | null>(null);

  // Estado para manejar la grabación
  const [isRecording, setIsRecording] = useState(false);
  const [recordingIndicator, setRecordingIndicator] = useState(false);

  // Referencia para el MediaRecorder y los fragmentos de audio grabados
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Función para iniciar la grabación de un audio específico
  const startRecording = (audioNumber: number) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          // Almacena los fragmentos de audio a medida que se graban
          mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };

          // Al detener la grabación, crea un Blob y asigna el audio al estado correspondiente
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            switch (audioNumber) {
              case 1:
                setAudio1(audioBlob);
                break;
              case 2:
                setAudio2(audioBlob);
                break;
              case 3:
                setAudio3(audioBlob);
                break;
              default:
                break;
            }
            audioChunksRef.current = [];
            setRecordingIndicator(false);
          };

          mediaRecorder.start();
          setIsRecording(true);
          setRecordingIndicator(true);
        })
        .catch((err) => {
          console.error("Error al acceder al micrófono", err);
        });
    } else {
      console.error('El navegador no soporta grabación de audio.');
    }
  };

  // Función para detener la grabación
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingIndicator(false); // Actualiza el indicador de grabación
    }
  };

  
  
    // Asegúrate de declarar formData solo una vez
  const formData = new FormData();
    
    // Función para enviar los audios al backend
    const sendAudios = async () => {
      console.log("sendAudios");
    
      // Asegúrate de declarar formData solo una vez
      
      const archivosEnviados: string[] = [];
      const tiposDeArchivo: string[] = [];
    
      // Función para validar antes de enviar
      const validarEnvio = () => {
        if (!audio1 && !audio2 && !audio3) {
          alert("Por favor graba al menos un audio.");
          return false; // Evitar el envío si no hay audios
        }
        return true;
      };
    
      // Verificar si se puede enviar
      if (!validarEnvio()) {
        return; // Si no es válido, no continúa
      }
    
      // Agregar audios al FormData
      if (audio1) {
        formData.append('audio1', audio1);
        archivosEnviados.push('audio1');
        tiposDeArchivo.push(audio1.type);
      }
    
      if (audio2) {
        formData.append('audio2', audio2);
        archivosEnviados.push('audio2');
        tiposDeArchivo.push(audio2.type);
      }
    
      if (audio3) {
        formData.append('audio3', audio3);
        archivosEnviados.push('audio3');
        tiposDeArchivo.push(audio3.type);
      }
    
      // Agregar el 'id' del usuario al FormData
      if (id) formData.append('id', id);
    
      console.log("FormData antes de enviar:", formData);
      console.log("Archivos enviados:", archivosEnviados);
      console.log("Tipos de archivo:", tiposDeArchivo);
    
      try {
        // Envío de los audios al backend
        const response = await fetch(`${API_URL}/RecibeAudios`, {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          alert(`Audios enviados correctamente:\nArchivos: ${archivosEnviados.join(', ')}\nTipos: ${tiposDeArchivo.join(', ')}`);
        } else {
          alert('Error al enviar los audios');
        }
      } catch (error) {
        console.error('Error al enviar los audios:', error);
        alert('Hubo un error al enviar los audios');
      }
    };
    
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
          <h5>Dashboard de Usuarios</h5>
          <p>ID del usuario: {id}</p>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => { e.preventDefault(); sendAudios(); }}>
            {/* Pregunta 1: ¿Cómo estás? */}
            <div className="mb-4">
              <label htmlFor="audio1" className="form-label">¿Cómo estás?</label>
              <div className="d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-primary" onClick={() => startRecording(1)} disabled={isRecording}>
                  Grabar
                </button>
                <button type="button" className="btn btn-danger" onClick={stopRecording} disabled={!isRecording}>
                  Detener
                </button>
                {recordingIndicator && <span className="text-danger ms-3">Grabando...</span>}
              </div>
              {audio1 && (
                <div className="mt-3">
                  <audio controls>
                    <source src={URL.createObjectURL(audio1)} type="audio/wav" />
                    Tu navegador no soporta el reproductor de audio.
                  </audio>
                </div>
              )}
            </div>

            {/* Pregunta 2: ¿Cómo te va? */}
            <div className="mb-4">
              <label htmlFor="audio2" className="form-label">¿Cómo te va?</label>
              <div className="d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-primary" onClick={() => startRecording(2)} disabled={isRecording}>
                  Grabar
                </button>
                <button type="button" className="btn btn-danger" onClick={stopRecording} disabled={!isRecording}>
                  Detener
                </button>
                {recordingIndicator && <span className="text-danger ms-3">Grabando...</span>}
              </div>
              {audio2 && (
                <div className="mt-3">
                  <audio controls>
                    <source src={URL.createObjectURL(audio2)} type="audio/wav" />
                    Tu navegador no soporta el reproductor de audio.
                  </audio>
                </div>
              )}
            </div>

            {/* Pregunta 3: ¿Qué haces? */}
            <div className="mb-4">
              <label htmlFor="audio3" className="form-label">¿Qué haces?</label>
              <div className="d-flex justify-content-between align-items-center">
                <button type="button" className="btn btn-primary" onClick={() => startRecording(3)} disabled={isRecording}>
                  Grabar
                </button>
                <button type="button" className="btn btn-danger" onClick={stopRecording} disabled={!isRecording}>
                  Detener
                </button>
                {recordingIndicator && <span className="text-danger ms-3">Grabando...</span>}
              </div>
              {audio3 && (
                <div className="mt-3">
                  <audio controls>
                    <source src={URL.createObjectURL(audio3)} type="audio/wav" />
                    Tu navegador no soporta el reproductor de audio.
                  </audio>
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-success">Enviar Audios</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsuarios;
