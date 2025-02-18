import React, { useEffect, useState } from "react";
import { useCargo } from "../contextos/CargoContext"; // Importamos el hook para acceder al contexto
import CargarAreasParaCargos from "../rutasController/CargarAreas"; // Importamos la función para cargar áreas
import { useLocation } from "react-router-dom"; // Asegúrate de importar useLocation

const Cargos = () => {
  const { setCargoData } = useCargo(); // Accedemos a la función para establecer los datos en el contexto
  const [nombre, setNombre] = useState("");
  const [idArea, setIdArea] = useState<number | "">(""); // Cambié el tipo de idArea a number o "" (vacío)
  const [areas, setAreas] = useState<{ id_area: number; nombre_area: string }[]>([]); // Cambié el tipo de id_area a number

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idEmpresa = queryParams.get("id") || ""; // Capturamos el idEmpresa de la URL, y si no existe, lo dejamos vacío

  // Cargar las áreas al montar el componente
  useEffect(() => {
    const fetchAreas = async () => {
      const areasCargadas = await CargarAreasParaCargos();
      console.log("Áreas cargadas:", areasCargadas);
      setAreas(areasCargadas?.map((area) => ({
        id_area: area.id_area, // Aquí ya es number, por lo que no se necesita conversión
        nombre_area: area.nombre_area,
      })) || []); // Maneja el caso donde sea null
    };

    fetchAreas();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Crear un objeto con los datos del cargo
    const newCargoData = { nombre, idArea, idEmpresa };
    setCargoData(newCargoData); // Enviar los datos al contexto
    console.log("Datos enviados:", newCargoData);
  };

  return (
    <div>
      <h1>Gestión de Cargos</h1>
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
            onChange={(e) => setIdArea(Number(e.target.value) || "")} // Convertir el valor a número
            required
          >
            <option value="">Seleccione un área</option>
            {areas.length > 0 ? (
              areas.map((area) => (
                <option key={area.id_area} value={area.id_area}>
                  {area.nombre_area}
                </option>
              ))
            ) : (
              <option value="" disabled>Cargando áreas...</option>
            )}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Crear Cargo</button>
      </form>
    </div>
  );
};

export default Cargos;
