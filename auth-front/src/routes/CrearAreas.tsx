import React, { useState } from "react";
import { crearArea } from "../rutasController/CrearAreasController";
import "bootstrap/dist/css/bootstrap.min.css";
import ListarAreas from "../routes/ListarAreas"; 

interface Area {
  id_area: number;
  nombre_area: string;
  id_empresa: number;
}

interface Props {
  id_empresa: number;
}

const CrearAreas: React.FC<Props> = ({ id_empresa }) => {
  console.log("📌 [CrearAreas] id_empresa recibido:", id_empresa);

  const [mensaje, setMensaje] = useState<string>("");
  const [nombreArea, setNombreArea] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [actualizarLista, setActualizarLista] = useState<boolean>(false);

  const handleCrearAreas = async () => {
    if (!nombreArea.trim()) {
      setMensaje("El nombre del área no puede estar vacío.");
      return;
    }

    console.log("📤 [CrearAreas] id_empresa enviado:", id_empresa);
    setLoading(true);

    try {
      const nuevaArea = await crearArea({ nombre_area: nombreArea, id_empresa });

      if (nuevaArea) {
        setMensaje("Área creada correctamente.");
        setNombreArea("");
        setActualizarLista(true); // ✅ Activa la actualización de ListarAreas
      } else {
        setMensaje("Error al crear el área.");
      }
    } catch (error) {
      setMensaje("Hubo un error al crear el área.");
      console.error("❌ Error al crear el área:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Área</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <div className="mb-3">
        <label className="form-label">Nombre del Área</label>
        <input
          type="text"
          className="form-control"
          value={nombreArea}
          onChange={(e) => setNombreArea(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleCrearAreas} disabled={loading}>
        {loading ? "Creando..." : "Crear Área"}
      </button>

      {/* 🔹 Se pasa `onAreaCreada` para actualizar la lista solo cuando se cree un área */}
      {actualizarLista && (
        <ListarAreas 
          id_empresa={id_empresa} 
          onAreaCreada={() => setActualizarLista(false)} 
        />
      )}
    </div>
  );
};

export default CrearAreas;
