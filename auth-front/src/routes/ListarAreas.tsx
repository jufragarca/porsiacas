import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { obtenerAreas } from "../rutasController/ListarAreasController";
import { ModificarAreas } from "../rutasController/ModificarAreas";

interface Area {
  id_area: number;
  nombre_area: string;
  id_empresa: number;
}

const ListarAreas: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialIdEmpresa = queryParams.get("id");
  console.log("ID Empresa extraído:", initialIdEmpresa);  // Agrega este log
  const defaultIdEmpresa = 1;

  const [idEmpresa, setIdEmpresa] = useState<number | null>(initialIdEmpresa ? parseInt(initialIdEmpresa) : defaultIdEmpresa);
  const [mensaje, setMensaje] = useState<string>("");
  const [areas, setAreas] = useState<Area[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [areaSeleccionada, setAreaSeleccionada] = useState<Area | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [nombreArea, setNombreArea] = useState<string>("");

  const openModal = (area: Area) => {
    setAreaSeleccionada(area);
    setNombreArea(area.nombre_area);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (areaSeleccionada) {
      console.log("Área seleccionada actualizada:", areaSeleccionada);
    }
  }, [areaSeleccionada]);  // Este useEffect se ejecutará cada vez que areaSeleccionada cambie
  

  useEffect(() => {
    console.log("idEmpresa ha cambiado:", idEmpresa);  // Agrega este log
    if (!idEmpresa) return;

    const fetchAreas = async () => {
      setLoading(true);
      try {
        const areasData = await obtenerAreas(idEmpresa);
        console.log("Áreas obtenidas:", areasData);  // Agrega este log
        setAreas(areasData || []);
        setMensaje("Áreas cargadas correctamente.");
      } catch (error) {
        setMensaje("Error al cargar las áreas.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, [idEmpresa]);

  const handleModificarArea = async () => {
    if (areaSeleccionada) {
      setLoading(true);
      try {
        // Actualizar la variable areaSeleccionada con el nuevo nombre
        const updatedArea = { ...areaSeleccionada, nombre_area: nombreArea }; // Aquí actualizamos el nombre del área
        setAreaSeleccionada(updatedArea);  // Actualizamos el estado de areaSeleccionada
  
        // Luego, puedes llamar a la función para modificar el área en el backend
        await ModificarAreas(updatedArea, setLoading, setMensaje);
  
        setMensaje("Área modificada correctamente.");
      } catch (error) {
        setMensaje("Hubo un error al modificar el área.");
        console.error(error);
      } finally {
        setLoading(false);
        closeModal();  // Cerrar el modal después de guardar los cambios
      }
    }
  };
  

  return (
    <>
      <div className="card-body">
        {loading && <div>Loading...</div>}
        {mensaje && <div>{mensaje}</div>}
        <table className="table table-bordered">
          <thead>
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
                  <button onClick={() => openModal(area)} className="btn btn-info">
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para modificar el área */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Modificar Área</h2>
        {areaSeleccionada && (
          <div>
            <div>
              <label>ID Área:</label>
              <input
                type="text"
                value={areaSeleccionada.id_area}
                disabled
                className="form-control"
              />
            </div>
            <div>
              <label>Nombre Área:</label>
              <input
                type="text"
                value={nombreArea}
                onChange={(e) => setNombreArea(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label>ID Empresa:</label>
              <input
                type="text"
                value={areaSeleccionada.id_empresa}
                disabled
                className="form-control"
              />
            </div>
            <button onClick={handleModificarArea} className="btn btn-primary">
              Guardar Cambios
            </button>
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Cerrar
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ListarAreas;
