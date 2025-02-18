import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { obtenerCargos } from "../rutasController/ListarCargos";
import { obtenerAreas } from "../rutasController/ListarAreas";
import { ModificarCargos } from "../rutasController/ModificarCargos";

const ListarCargos = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialIdEmpresa = queryParams.get("id");

  const [idEmpresa, setIdEmpresa] = useState<number | null>(
    initialIdEmpresa ? parseInt(initialIdEmpresa) : null
  );
  const [mensaje, setMensaje] = useState<string>("");
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cargoSeleccionado, setCargoSeleccionado] = useState<Cargo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const openModal = (cargo: Cargo) => {
    setCargoSeleccionado(cargo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!idEmpresa) return;

    const fetchCargosYAreas = async () => {
      setLoading(true);
      try {
        const cargosData = await obtenerCargos(idEmpresa);
        const areasData = await obtenerAreas(idEmpresa);

        setCargos(cargosData || []);
        setAreas(areasData || []);
        setMensaje("Cargos y áreas cargados correctamente.");
      } catch (error) {
        setMensaje("Error al cargar los datos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCargosYAreas();
  }, [idEmpresa]);

  return (
    <>
      <div className="card-body">
        {loading && <div>Loading...</div>}
        {mensaje && <div>{mensaje}</div>}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Área</th>
              <th>IdEmpresa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargos.map((cargo) => (
              <tr key={cargo.id}>
                <td>{cargo.id}</td>
                <td>{cargo.nombre}</td>
                <td>{areas.find((area) => area.id === cargo.id_area.toString())?.nombre || "Sin área"}</td>
                <td>{cargo.id_empresa}</td>
                <td>
                  <button onClick={() => openModal(cargo)} className="btn btn-info">
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Modificar Cargo</h2>
        {cargoSeleccionado && (
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={cargoSeleccionado.id}
                readOnly
                className="form-control"
              />
              <input
                type="text"
                value={cargoSeleccionado.nombre}
                onChange={(e) =>
                  setCargoSeleccionado({ ...cargoSeleccionado, nombre: e.target.value })
                }
              />
              <select
                value={cargoSeleccionado.id_area}
                onChange={(e) =>
                  setCargoSeleccionado({ ...cargoSeleccionado, id_area: parseInt(e.target.value) })
                }
              >
                <option value="">Seleccionar Área</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.nombre}>
                    {area.nombre}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => ModificarCargos(cargoSeleccionado, setLoading, setMensaje)}
                className="btn btn-primary"
              >
                Guardar Cambios
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="btn btn-secondary"
              >
                Cerrar
              </button>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ListarCargos;
