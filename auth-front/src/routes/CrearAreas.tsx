import { useState } from "react";
import { useLocation } from "react-router-dom"; // Asegúrate de importar useLocation
import { enviarDatos } from "../rutasController/CrearAreasController"; // Paso 1: Importamos la función para enviar los datos

const CrearAreas = () => {
  const [nombre_area, setNombreArea] = useState(""); // Paso 2: Estado para el nombre del área
  const [id_empresa, setIdEmpresa] = useState(""); // Paso 3: Estado para el ID de la empresa

  const location = useLocation(); // Usamos useLocation para acceder a los parámetros de la URL
  const queryParams = new URLSearchParams(location.search); // Parseamos los parámetros de la URL
  const id_empresa_from_url = queryParams.get("id"); // Obtenemos el id de la empresa desde la URL

  // Actualizamos el estado con el id de la empresa desde la URL (si existe)
  if (id_empresa_from_url && !id_empresa) {//si la primera condicion tiene un valor y si la segunda no tiene 
    setIdEmpresa(id_empresa_from_url);//envia el valor a  const [id_empresa, setIdEmpresa] 
  }

  // Paso 4: Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Paso 5: Creamos un objeto con los datos del área
    const newAreaData = { id_Empresa: id_empresa, nombre_area }; // Cambié id_empresa a id_Empresa
    console.log("Datos enviados:", newAreaData); // Mostramos los datos en la consola

    // Paso 6: Enviamos los datos a otro archivo (función en CargarAreas.ts)
    await enviarDatos(newAreaData);
  };

  return (
    <div>
      <h1>Gestión de Áreas</h1>
      <form onSubmit={handleSubmit}> {/* Formulario para crear el área */}
        <div className="mb-3">
          <label htmlFor="nombreArea" className="form-label">Nombre del Área</label>
          <input
            type="text"
            className="form-control"
            id="nombreArea"
            value={nombre_area} // Vinculamos el estado con el valor del input
            onChange={(e) => setNombreArea(e.target.value)} // Actualizamos el estado cuando el usuario escribe
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear Área</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
};

export default CrearAreas;
