import React, { useState } from "react"; // Paso 1: Importa React y useState para manejar el estado
import CrearEmpleado from "./Empleados"; // Paso 1: Importa el componente CrearEmpleado
import Cargos from "../routes/Cargos"; // Paso 1: Importa el componente Cargos
import ListarCargos from "../routes/ListarCargos"; // Paso 1: Importa el componente ListarCargos
import CrearArea from "../routes/CrearAreas"; // Paso 1: Importa el componente CrearArea
import ListarAreas from "../routes/ListarAreas"; // Paso 1: Importa el componente ListarAreas
import DefaultLayout from "../layout/DefaultLayout"; // Paso 1: Importa el layout principal para el dashboard

const Dashboard = () => { // Paso 2: Definir el componente Dashboard
  const [isCrearEmpleadoVisible, setIsCrearEmpleadoVisible] = useState(false); // Paso 2.1: Estado para mostrar/ocultar CrearEmpleado
  const [isCargosVisible, setIsCargosVisible] = useState(false); // Paso 2.2: Estado para mostrar/ocultar Cargos
  const [isAreasVisible, setIsAreasVisible] = useState(false); // Paso 2.3: Estado para mostrar/ocultar Áreas
  const [isCargarCargosVisible, setIsCargarCargosVisible] = useState(false); // Paso 2.4: Estado para mostrar/ocultar Cargar Cargos
  const [isListarCargosVisible, setIsListarCargosVisible] = useState(false); // Paso 2.5: Estado para mostrar/ocultar Listar Cargos
  const [isCargarAreasVisible, setIsCargarAreasVisible] = useState(false); // Paso 2.6: Estado para mostrar/ocultar Cargar Áreas
  const [isListarAreasVisible, setIsListarAreasVisible] = useState(false); // Paso 2.7: Estado para mostrar/ocultar Listar Áreas

  // Paso 3: Crear las funciones que alternan la visibilidad de los componentes
  const toggleCrearEmpleado = () => { // Paso 3.1: Función para alternar la visibilidad de CrearEmpleado
    setIsCrearEmpleadoVisible(!isCrearEmpleadoVisible); // Cambia el estado a su valor opuesto
  };

  const toggleCargos = () => { // Paso 3.2: Función para alternar la visibilidad de Cargos
    setIsCargosVisible(!isCargosVisible); // Cambia el estado a su valor opuesto
  };

  const toggleAreas = () => { // Paso 3.3: Función para alternar la visibilidad de Áreas
    setIsAreasVisible(!isAreasVisible); // Cambia el estado a su valor opuesto
  };

  const toggleCargarCargos = () => { // Paso 3.4: Función para alternar la visibilidad de Cargar Cargos
    setIsCargarCargosVisible(!isCargarCargosVisible); // Cambia el estado a su valor opuesto
  };

  const toggleListarCargos = () => { // Paso 3.5: Función para alternar la visibilidad de Listar Cargos
    setIsListarCargosVisible(!isListarCargosVisible); // Cambia el estado a su valor opuesto
  };

  const toggleCrearAreas = () => { // Paso 3.6: Función para alternar la visibilidad de Cargar Áreas
    setIsCargarAreasVisible(!isCargarAreasVisible); // Cambia el estado a su valor opuesto
  };

  const toggleMostrarAreas = () => { // Paso 3.7: Función para alternar la visibilidad de Listar Áreas
    setIsListarAreasVisible(!isListarAreasVisible); // Cambia el estado a su valor opuesto
  };

  // Paso 4: Retornar el JSX con los botones y componentes visibles según el estado
  return ( // Paso 4: Retorna el JSX que se va a renderizar
    <DefaultLayout> {/* Paso 4.1: Envuelve todo en el layout principal */}
      <div className="dashboard-container"> {/* Paso 4.2: Contenedor principal del Dashboard */}
        <h1>Bienvenido al Dashboard</h1> {/* Paso 4.3: Título principal */}

        {/* Paso 4.4: Contenedor para los botones en grupo */}
        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
          <button
            type="button"
            className={`btn ${isCargosVisible ? "btn-success" : "btn-danger"}`} // Paso 4.5: Botón para mostrar/ocultar Cargos
            onClick={toggleCargos} // Paso 4.6: Llama a toggleCargos al hacer clic
          >
            {isCargosVisible ? "Ocultar Cargos" : "Cargos"} {/* Paso 4.7: Texto del botón */}
          </button>

          <button
            type="button"
            className={`btn ${isAreasVisible ? "btn-success" : "btn-warning"}`} // Paso 4.8: Botón para mostrar/ocultar Áreas
            onClick={toggleAreas} // Paso 4.9: Llama a toggleAreas al hacer clic
          >
            {isAreasVisible ? "Ocultar Áreas" : "Áreas"} {/* Paso 4.10: Texto del botón */}
          </button>

          <button
            type="button"
            className={`btn ${isCrearEmpleadoVisible ? "btn-success" : "btn-danger"}`} // Paso 4.11: Botón para mostrar/ocultar CrearEmpleado
            onClick={toggleCrearEmpleado} // Paso 4.12: Llama a toggleCrearEmpleado al hacer clic
          >
            {isCrearEmpleadoVisible ? "Ocultar Crear Empleado" : "Crear Empleado"} {/* Paso 4.13: Texto del botón */}
          </button>
        </div>

        <div> {/* Paso 4.14: Contenedor para los componentes */}
          <h1>Resto de la aplicación</h1> {/* Paso 4.15: Título para el resto de la aplicación */}

          {/* Paso 4.16: Mostrar los componentes de Cargos si isCargosVisible es true */}
          {isCargosVisible && (
            <div> {/* Paso 4.17: Contenedor para los botones de Cargos */}
              <button
                type="button"
                className="btn btn-success"
                onClick={toggleCargarCargos} // Paso 4.18: Llama a toggleCargarCargos al hacer clic
              >
                Cargar Cargos {/* Paso 4.19: Texto del botón */}
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={toggleListarCargos} // Paso 4.20: Llama a toggleListarCargos al hacer clic
              >
                Listar Cargos {/* Paso 4.21: Texto del botón */}
              </button>

              {/* Paso 4.22: Mostrar Cargar Cargos si isCargarCargosVisible es true */}
              {isCargarCargosVisible && <Cargos />} {/* Paso 4.23: Renderiza el componente Cargos */}
              {/* Paso 4.24: Mostrar Listar Cargos si isListarCargosVisible es true */}
              {isListarCargosVisible && <ListarCargos />} {/* Paso 4.25: Renderiza el componente ListarCargos */}
            </div>
          )}

          {/* Paso 4.26: Mostrar los componentes de Áreas si isAreasVisible es true */}
          {isAreasVisible && (
            <div> {/* Paso 4.27: Contenedor para los botones de Áreas */}
              <button
                type="button"
                className="btn btn-success"
                onClick={toggleCrearAreas} // Paso 4.28: Llama a toggleCrearAreas al hacer clic
              >
                Cargar Áreas {/* Paso 4.29: Texto del botón */}
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={toggleMostrarAreas} // Paso 4.30: Llama a toggleMostrarAreas al hacer clic
              >
                Listar Áreas {/* Paso 4.31: Texto del botón */}
              </button>

              {/* Paso 4.32: Mostrar CrearArea si isCargarAreasVisible es true */}
              {isCargarAreasVisible && <CrearArea />} {/* Paso 4.33: Renderiza el componente CrearArea */}
              {/* Paso 4.34: Mostrar ListarAreas si isListarAreasVisible es true */}
              {isListarAreasVisible && <ListarAreas />} {/* Paso 4.35: Renderiza el componente ListarAreas */}
            </div>
          )}

          {/* Paso 4.36: Mostrar CrearEmpleado si isCrearEmpleadoVisible es true */}
          {isCrearEmpleadoVisible && (
            <div> {/* Paso 4.37: Contenedor para el componente CrearEmpleado */}
              <CrearEmpleado /> {/* Paso 4.38: Renderiza el componente CrearEmpleado */}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout> // Paso 4.39: Cierra el layout principal
  );
};

export default Dashboard; // Paso 5: Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
