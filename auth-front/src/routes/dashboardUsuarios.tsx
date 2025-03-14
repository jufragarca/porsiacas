import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthEmpleado } from '../auth/AuthProviderUsuario';
import { API_URL } from "../auth/authConstants";
import '../App.css';
import Estrellas from '../layout/estrellas';

const DashboardUsuarios = () => {
  const navigate = useNavigate();
  const { userEmpleado, logout } = useAuthEmpleado();
  const [score, setScore] = useState(0);
  const [audio, setAudio] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingIndicator, setRecordingIndicator] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // ✅ Restaurar sesión desde localStorage
  useEffect(() => {
    if (!userEmpleado) {
      const savedUser = localStorage.getItem('userEmpleado');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        console.log("ID del usuario logueado:", parsedUser.id);
      } else {
        console.log("No hay usuario autenticado, redirigiendo...");
        navigate("/login-usuario");
      }
    }
  }, [userEmpleado, navigate]);

  // ✅ Guardar usuario en localStorage cuando cambia
  useEffect(() => {
    if (userEmpleado) {
      localStorage.setItem('userEmpleado', JSON.stringify(userEmpleado));
    }
  }, [userEmpleado]);

  // ✅ Monitorear cambios en `score`
  useEffect(() => {
    if (score > 0) {
      console.log("Score actualizado:", score);
    }
  }, [score]);

  const handleStarSelect = (newScore: number) => {
    setScore(newScore);
  };

  // ✅ Iniciar grabación de audio
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          setAudio(audioBlob);
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
  };

  // ✅ Detener grabación de audio
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingIndicator(false);
    }
  };

  // ✅ Enviar audio con `id_usuario` y `score` al backend
  const sendAudio = async () => {
    if (!audio) {
      alert("Por favor graba un audio antes de enviarlo.");
      return;
    }
  
    const formData = new FormData();
    formData.append('audio', audio);
    formData.append('score', score.toString());
  
    // 🚨 Asegurar que userEmpleado.id se envía correctamente
    if (userEmpleado?.id) {
      formData.append('id_usuario', userEmpleado.id.toString());
      console.log("✅ ID del usuario enviado:", userEmpleado.id);
    } else {
      console.error("❌ ERROR: No se encontró el ID del usuario.");
      alert("No se encontró el ID del usuario. Intenta cerrar sesión y volver a iniciar.");
      return; // Detener envío si no hay ID
    }
  
    console.log("🔍 Datos enviados al backend:");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    try {
      const response = await fetch(`${API_URL}/RecibeAudios`, { // 🔹 Asegúrate de que sea "RecibeAudios"
        method: "POST",
        body: formData
      });
      
  
      if (response.ok) {
        alert('✅ Audio enviado correctamente');
      } else {
        alert('❌ Error al enviar el audio');
      }
    } catch (error) {
      console.error('❌ Error al enviar el audio:', error);
      alert('Hubo un error al enviar el audio');
    }
  };
  

  // ✅ Cerrar sesión
  const handleLogout = () => {
    logout();
    localStorage.removeItem('userEmpleado');
    navigate("/login-usuario");
  };

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
          <h5>Dashboard de Usuarios</h5>
          <p>ID del usuario: {userEmpleado?.id}</p>
        </div>

        <div className="card-body">
          <div className="d-flex flex-column align-items-center">
            <h1 className='texto-centrado'>
              Para responder esta pregunta, ten en cuenta variables como Apoyo y Desarrollo del Liderazgo...
            </h1>
            <Estrellas score={score} onSelect={handleStarSelect} />
          </div>

          <label htmlFor="audio" className="form-label">
            ¿Recomendarías a un amigo o familiar trabajar en esta empresa?
          </label>

          {audio && (
            <div className="mt-3">
              <audio controls>
                <source src={URL.createObjectURL(audio)} type="audio/wav" />
                Tu navegador no soporta el reproductor de audio.
              </audio>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-primary" onClick={startRecording} disabled={isRecording}>
              Grabar
            </button>
            <button className="btn btn-danger" onClick={stopRecording} disabled={!isRecording}>
              Detener
            </button>
            {recordingIndicator && <span className="text-danger ms-3">Grabando...</span>}
          </div>

          <button className="btn btn-success mt-3" onClick={sendAudio}>
            Enviar Audio
          </button>
        </div>
      </div>

      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Cerrar sesión
      </button>
    </div>
  );
};

export default DashboardUsuarios;
