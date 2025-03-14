import React, { useState, useEffect } from "react";
import { obtenerAreas } from "../rutasController/ListarAreasController";
import { ModificarAreas } from "../rutasController/ModificarAreas";
import "bootstrap/dist/css/bootstrap.min.css";

interface Area {
  id_area: number;
  nombre_area: string;
  id_empresa: number;
}

interface Props {
  id_empresa: number;
  onAreaCreada: () => void; // ✅ Se ejecutará solo cuando se cree un área
}

const ListarAreas: React.FC<Props> = ({ id_empresa, onAreaCreada }) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [mensaje, setMensaje] = useState<string>("");
  const [areaSeleccionada, setAreaSeleccionada] = useState<Area | null>(null);
  const [nombreArea, setNombreArea] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAreas = async () => {
    try {
      const areasData = await obtenerAreas(id_empresa);
      setAreas(areasData || []);
      setMensaje("Áreas cargadas correctamente.");
    } catch (error) {
      setMensaje("Error al cargar las áreas.");
      console.error(error);
    }
  };

  // ✅ Solo se carga una vez al montar el componente
  useEffect(() => {
    fetchAreas();
  }, []);

  // ✅ Esta función se expone a `CrearAreas.tsx`
  const actualizarLista = () => {
    fetchAreas();
    onAreaCreada(); // 🔹 Notifica que se actualizó la lista
  };

  const handleModificarArea = async () => {
    if (areaSeleccionada) {
      setLoading(true);
      try {
        const updatedArea = { ...areaSeleccionada, nombre_area: nombreArea };
        await ModificarAreas(updatedArea, setLoading, setMensaje, fetchAreas);
        setMensaje("Área modificada correctamente.");
        setAreas((prev) =>
          prev.map((area) =>
            area.id_area === updatedArea.id_area ? updatedArea : area
          )
        );
      } catch (error) {
        setMensaje("Hubo un error al modificar el área.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Listado de Áreas</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID Área</th>
            <th>Nombre Área</th>
            <th>ID Empresa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => (
            <tr key={area.id_area}>
              <td>{area.id_area}</td>
              <td>{area.nombre_area}</td>
              <td>{area.id_empresa}</td>
              <td>
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalModificar"
                  onClick={() => {
                    setAreaSeleccionada(area);
                    setNombreArea(area.nombre_area);
                  }}
                >
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarAreas;
