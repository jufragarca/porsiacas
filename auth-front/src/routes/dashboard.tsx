import React, { useState } from "react";
import CrearEmpleado from "./Empleados";
import Cargos from "../routes/Cargos";
import ListarCargos from "../routes/ListarCargos";
import CrearArea from "../routes/CrearAreas";
import ListarAreas from "../routes/ListarAreas";
import DefaultLayout from "../layout/DefaultLayout";

const Dashboard = () => {
  const [isCrearEmpleadoVisible, setIsCrearEmpleadoVisible] = useState(false);
  const [isCargosVisible, setIsCargosVisible] = useState(false);
  const [isAreasVisible, setIsAreasVisible] = useState(false);
  const [isCargarCargosVisible, setIsCargarCargosVisible] = useState(false);
  const [isListarCargosVisible, setIsListarCargosVisible] = useState(false);
  const [isCargarAreasVisible, setIsCargarAreasVisible] = useState(false);//estos dos son los que estan relacionadas con areas
  const [isListarAreasVisible, setIsListarAreasVisible] = useState(false);//estos dos son los que estan relacionadas con areas

  // Funciones de alternancia, asegurando que solo uno esté activo
  const toggleAreas = () => {
    setIsAreasVisible(!isAreasVisible);
    setIsCargosVisible(false);
    setIsCrearEmpleadoVisible(false);
  };

  const toggleCrearEmpleado = () => {
    setIsCrearEmpleadoVisible(!isCrearEmpleadoVisible);
    setIsAreasVisible(false);
    setIsCargosVisible(false);
  };

  const toggleCargos = () => {
    setIsCargosVisible(!isCargosVisible);
    setIsAreasVisible(false);
    setIsCrearEmpleadoVisible(false);
  };

  const toggleCargarCargos = () => {
    setIsCargarCargosVisible(!isCargarCargosVisible);
    setIsListarCargosVisible(false);
  };

  const toggleListarCargos = () => {
    setIsListarCargosVisible(!isListarCargosVisible);
    setIsCargarCargosVisible(false);
  };

  const toggleCrearAreas = () => {
    setIsCargarAreasVisible(!isCargarAreasVisible);
    setIsListarAreasVisible(false);
  };

  const toggleMostrarAreas = () => {
    setIsListarAreasVisible(!isListarAreasVisible);
    setIsCargarAreasVisible(false);
  };

  return (
    <DefaultLayout>
      <div className="dashboard-container">
        <h1>Bienvenido al Dashboard</h1>

        <div className="btn-group" role="group" aria-label="Opciones">
          <button
            type="button"
            className={`btn ${isCargosVisible ? "btn-success" : "btn-danger"}`}
            onClick={toggleCargos}
          >
            {isCargosVisible ? "Ocultar Cargos" : "Cargos"}
          </button>

          <button
            type="button"
            className={`btn ${isAreasVisible ? "btn-success" : "btn-warning"}`}
            onClick={toggleAreas}
          >
            {isAreasVisible ? "Ocultar Áreas" : "Áreas"}
          </button>

          <button
            type="button"
            className={`btn ${isCrearEmpleadoVisible ? "btn-success" : "btn-danger"}`}
            onClick={toggleCrearEmpleado}
          >
            {isCrearEmpleadoVisible ? "Ocultar Crear Empleado" : "Crear Empleado"}
          </button>
        </div>

        <div>
          {isCargosVisible && (
            <div>
              <button className="btn btn-success" onClick={toggleCargarCargos}>
                Cargar Cargos
              </button>
              <button className="btn btn-success" onClick={toggleListarCargos}>
                Listar Cargos
              </button>

              {isCargarCargosVisible && <Cargos />}
              {isListarCargosVisible && <ListarCargos />}
            </div>
          )}

          {isAreasVisible && (
            <div>
              <button className="btn btn-success" onClick={toggleCrearAreas}>
                Crear Áreas
              </button>
              <button className="btn btn-success" onClick={toggleMostrarAreas}>
                Listar Áreas
              </button>

              {isCargarAreasVisible && <CrearArea />} {/* 🔴 **Aquí se usa `CrearArea`** */}
              {isListarAreasVisible && <ListarAreas />} {/* 🔴 **Aquí se usa `ListarAreas`** */}
              {/* 🔴 Esto significa que cuando isCargarAreasVisible es true, el componente CrearArea se renderiza en la pantalla.*/}

            </div>
          )}

          {isCrearEmpleadoVisible && <CrearEmpleado />}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
