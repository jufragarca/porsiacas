import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { enviarDatos } from "../rutasController/CrearAreasController";

const CrearAreas = () => {
  const [nombre_area, setNombreArea] = useState(""); // Estado para el nombre del área
  const [id_empresa, setIdEmpresa] = useState(""); // Estado para el ID de la empresa
  const [mensajeExito, setMensajeExito] = useState<string | null>(null); // Estado para el mensaje de éxito
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const id_empresa_from_url = queryParams.get("id");

  useEffect(() => {
    if (id_empresa_from_url) {
      setIdEmpresa(id_empresa_from_url);
    }
  }, [id_empresa_from_url]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAreaData = { id_Empresa: id_empresa, nombre_area };
  
    try {
      const response = await enviarDatos(newAreaData);
  
      console.log("🔍 Respuesta completa del backend:", response); // ✅ Depuración
  
      if (!response || typeof response !== "object") {
        throw new Error("La respuesta del servidor no es válida.");
      }
  
      // 📌 Si `nombre_area` no existe en la respuesta, mostrar un mensaje genérico
      const areaCreada = response.nombre_area || "Área creada correctamente";
      setMensajeExito(`✅ ${areaCreada}`);
  
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setMensajeExito(null);
        setNombreArea("");
      }, 10000);
    } catch (error) {
      console.error("❌ Error al enviar los datos:", error);
      alert("❌ Error al crear el área. Intente nuevamente.");
    }
  };
  
  return (
    <div>
      <h1>Gestión de Áreas</h1>

      {/* Mostrar mensaje de éxito si existe */}
      {mensajeExito && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">¡Éxito!</h4>
          <p>{mensajeExito}</p>
          <hr />
          <p className="mb-0">Se ha registrado el área correctamente.</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombreArea" className="form-label">Nombre del Área</label>
          <input
            type="text"
            className="form-control"
            id="nombreArea"
            value={nombre_area}
            onChange={(e) => setNombreArea(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Área</button>
      </form>
    </div>
  );
};

export default CrearAreas;
