import React, { useEffect, useState } from "react";
import CargarAreasParaCargos from "../rutasController/CargarAreas";
import { enviarDatos } from "../rutasController/guardarCargo";
import ListarCargos from "../routes/ListarCargos";

interface Area {
  id_area: number;
  nombre_area: string;
  id_empresa: number;
}

interface Props {
  id_empresa: number;
}

const Cargos: React.FC<Props> = ({ id_empresa }) => {
  console.log("📌 [Cargos] id_empresa recibido:", id_empresa);

  const [nombre, setNombre] = useState("");
  const [idArea, setIdArea] = useState<number>(0);
  const [areas, setAreas] = useState<Area[]>([]);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [cargoGuardado, setCargoGuardado] = useState(false); // 🔄 Estado de control: Se inicializa en false porque la lista de cargos no debe mostrarse al inicio.

  useEffect(() => {
    if (id_empresa) {
      const fetchAreas = async () => {
        try {
          const areasCargadas = await CargarAreasParaCargos(id_empresa);
          setAreas(areasCargadas || []);
        } catch (error) {
          console.error("❌ [Cargos] Error al cargar áreas:", error);
        }
      };
      fetchAreas();
    }
  }, [id_empresa]);
  //1️⃣ Se define actualizarCargos:
//Esta función cambia el estado cargoGuardado a true (mostrando la lista de cargos) y 
// //luego lo vuelve a false después de 10 segundos.
  const actualizarCargos = () => {
    setCargoGuardado(true); // ✅ Activa cargoGuardado en true → Esto muestra la lista de cargos.
    setTimeout(() => setCargoGuardado(false), 10000); // 🔄 Usa setTimeout para volver cargoGuardado a false después de 10 segundos → La lista se oculta automáticamente.
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idArea) {
      setMensajeError("❌ Debes seleccionar un área.");
      return;
    }

    const newCargoData = { nombre, id_area: idArea, id_empresa };

    try {
      console.log("📤 Enviando datos del cargo:", newCargoData);
      await enviarDatos(
        newCargoData,
        actualizarCargos, // ✅ Llama a enviarDatos y le pasa actualizarCargos como callback.
        //En handleSubmit, cuando enviamos los datos del nuevo cargo, llamamos a enviarDatos y le pasamos actualizarCargos:
        setMensajeExito,
        setMensajeError,
        setNombre,
        setIdArea
      );
      console.log("✅ Cargo enviado correctamente");
    } catch (error) {
      console.error("❌ [Cargos] Error en el handleSubmit:", error);
    }
  };

  return (
    <div>
      <h1>Crear un cargo</h1>
      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombreCargo" className="form-label">Nombre del Cargo</label>
          <input
            type="text"
            className="form-control"
            id="nombreCargo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="areaCargo" className="form-label">Área</label>
          <select
            className="form-select"
            id="areaCargo"
            value={idArea}
            onChange={(e) => setIdArea(Number(e.target.value))}
            required
          >
            <option value={0}>Seleccione un área</option>
            {areas.length > 0 ? (
              areas.map((area) => (
                <option key={area.id_area} value={area.id_area}>
                  {area.nombre_area}
                </option>
              ))
            ) : (
              <option value={0} disabled>Cargando áreas...</option>
            )}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Crear Cargo</button>
      </form>

      {/* ✅ Solo renderiza la lista de cargos si cargoGuardado es true. */}
      {/* 🔄 Gracias a setTimeout, la lista se oculta automáticamente después de 10 segundos. */}
      {cargoGuardado && <ListarCargos id_empresa={id_empresa} />}
    </div>
  );
};

export default Cargos;