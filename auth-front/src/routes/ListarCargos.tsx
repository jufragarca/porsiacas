import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { obtenerCargos } from "../rutasController/ListarCargosParaCargos";
import { obtenerAreas } from "../rutasController/ListarAreasParaCargos";
import { ModificarCargos } from "../rutasController/ModificarCargos";

// Definimos los tipos para Cargo y Area
interface Cargo {
  id: number;
  nombre: string;
  id_area: number;
  id_empresa: number;
}

interface Area {
  id: string;
  nombre: string;
}

interface Props {
  id_empresa: number; // id_empresa se pasa como una prop
}

const ListarCargos = ({ id_empresa }: Props) => {
  console.log("id_empresa en ListarCargos", id_empresa);
  const [mensaje, setMensaje] = useState<string>("");
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cargoSeleccionado, setCargoSeleccionado] = useState<Cargo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id_empresa !== null) {
      fetchCargosYAreas();
    }
  }, [id_empresa]);

  const fetchCargosYAreas = async () => {
    if (id_empresa === null) return; // Asegúrate de que id_empresa no sea null

    setLoading(true);
    try {
      const cargosData = await obtenerCargos(id_empresa);
      const areasData = await obtenerAreas({ id_empresa }); // Pasar id_empresa correctamente

      if (!Array.isArray(areasData)) {
        console.error("❌ Error: áreasData no es un array válido.");
        return;
      }

      const areasTransformadas: Area[] = areasData.map((area) => ({
        id: area.id_area,
        nombre: area.nombre,
      }));

      setCargos(cargosData || []);
      setAreas(areasTransformadas);
      setMensaje("✅ Cargos y áreas cargados correctamente.");
    } catch (error) {
      setMensaje("❌ Error al cargar los datos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (cargo: Cargo) => {
    setCargoSeleccionado(cargo);
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    if (id_empresa !== null) {
      setLoading(true);
      await fetchCargosYAreas(); // 🔹 Recargar lista al cerrar el modal
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card-body">
        {loading && <div>Cargando...</div>}
        {mensaje && <div>{mensaje}</div>}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Área</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargos.map((cargo) => (
              <tr key={cargo.id}>
                <td>{cargo.id}</td>
                <td>{cargo.nombre}</td>
                <td>
                  {
                    areas.find((area) => area.id === cargo.id_area.toString())?.nombre ||
                    "Sin área"
                  }
                </td>
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
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" value={cargoSeleccionado.id} readOnly className="form-control" />
            <input
              type="text"
              value={cargoSeleccionado.nombre}
              onChange={(e) =>
                setCargoSeleccionado({
                  ...cargoSeleccionado,
                  nombre: e.target.value,
                })
              }
              className="form-control"
            />
            <select
              value={cargoSeleccionado.id_area}
              onChange={(e) =>
                setCargoSeleccionado({
                  ...cargoSeleccionado,
                  id_area: parseInt(e.target.value),
                })
              }
              className="form-control"
            >
              <option value="">Seleccionar Área</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.nombre}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={async () => {
                if (cargoSeleccionado) {
                  await ModificarCargos(
                    cargoSeleccionado,
                    setLoading,
                    setMensaje,
                    setCargos,
                    id_empresa
                  );
                  closeModal();
                }
              }}
              className="btn btn-primary"
            >
              Guardar Cambios
            </button>
            <button type="button" onClick={closeModal} className="btn btn-secondary">
              Cerrar
            </button>
          </form>
        )}
      </Modal>
    </>
  );
};

export default ListarCargos;
