import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Empleados from "./Empleados";
import ListarEmpleados from "./ListarEmpleados";
import Cargos from "./Cargos";
import ListarCargos from "./ListarCargos";
import CrearArea from "./CrearAreas";
import ListarAreas from "./ListarAreas";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [id, setId] = useState<number | null>(null);

  // Estados para las secciones
  const [activeSection, setActiveSection] = useState<"areas" | "cargos" | "empleados" | null>("areas");

  // Estados internos de cada sección
  const [isCargarAreasVisible, setIsCargarAreasVisible] = useState(false);
  const [isListarAreasVisible, setIsListarAreasVisible] = useState(false);

  const [isCargarCargosVisible, setIsCargarCargosVisible] = useState(false);
  const [isListarCargosVisible, setIsListarCargosVisible] = useState(false);

  const [isCargarEmpleadosVisible, setIsCargarEmpleadosVisible] = useState(false);
  const [isListarEmpleadosVisible, setIsListarEmpleadosVisible] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("id_empresa") || sessionStorage.getItem("id_empresa");
    if (storedId) {
      const parsedId = Number(storedId);
      if (!isNaN(parsedId)) {
        console.log("✅ [Dashboard] ID cargado desde storage:", parsedId);
        setId(parsedId);
      } else {
        console.error("⚠️ [Dashboard] El ID no es válido:", storedId);
      }
    } else {
      console.error("⚠️ [Dashboard] No se encontró un ID en storage");
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Cambiar de sección
  const toggleSection = (section: "areas" | "cargos" | "empleados") => {
    setActiveSection(activeSection === section ? null : section);

    // Resetear los estados internos al cambiar de sección
    if (section !== "areas") {
      setIsCargarAreasVisible(false);
      setIsListarAreasVisible(false);
    }
    if (section !== "cargos") {
      setIsCargarCargosVisible(false);
      setIsListarCargosVisible(false);
    }
    if (section !== "empleados") {
      setIsCargarEmpleadosVisible(false);
      setIsListarEmpleadosVisible(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="dashboard-container">
        <h1>Bienvenido al Dashboard</h1>
        <h3>ID: {id ? id : "No disponible"}</h3>

        {/* Botones principales */}
        <div className="btn-group">
          <button
            className={`btn ${activeSection === "areas" ? "btn-success" : "btn-warning"}`}
            onClick={() => toggleSection("areas")}
          >
            {activeSection === "areas" ? "Ocultar Áreas" : "Áreas"}
          </button>
          <button
            className={`btn ${activeSection === "cargos" ? "btn-success" : "btn-danger"}`}
            onClick={() => toggleSection("cargos")}
          >
            {activeSection === "cargos" ? "Ocultar Cargos" : "Cargos"}
          </button>
          <button
            className={`btn ${activeSection === "empleados" ? "btn-success" : "btn-danger"}`}
            onClick={() => toggleSection("empleados")}
          >
            {activeSection === "empleados" ? "Ocultar Empleados" : "Empleados"}
          </button>
        </div>

        {/* Sección de Áreas */}
        {activeSection === "areas" && (
          <div>
            <button className="btn btn-info" onClick={() => setIsCargarAreasVisible(!isCargarAreasVisible)}>
              {isCargarAreasVisible ? "Ocultar Crear Áreas" : "Crear Áreas"}
            </button>
            <button className="btn btn-info" onClick={() => setIsListarAreasVisible(!isListarAreasVisible)}>
              {isListarAreasVisible ? "Ocultar Listar Áreas" : "Listar Áreas"}
            </button>
            {isCargarAreasVisible && id && <CrearArea id_empresa={id} />}
            {isListarAreasVisible && id && <ListarAreas id_empresa={id} />}
          </div>
        )}

        {/* Sección de Cargos */}
        {activeSection === "cargos" && (
          <div>
            <button className="btn btn-info" onClick={() => setIsCargarCargosVisible(!isCargarCargosVisible)}>
              {isCargarCargosVisible ? "Ocultar Crear Cargos" : "Crear Cargos"}
            </button>
            <button className="btn btn-info" onClick={() => setIsListarCargosVisible(!isListarCargosVisible)}>
              {isListarCargosVisible ? "Ocultar Listar Cargos" : "Listar Cargos"}
            </button>
            {isCargarCargosVisible && id && <Cargos id_empresa={id} />}
            {isListarCargosVisible && id && <ListarCargos id_empresa={id} />}
          </div>
        )}

        {/* Sección de Empleados */}
        {activeSection === "empleados" && (
          <div>
            <button className="btn btn-info" onClick={() => setIsCargarEmpleadosVisible(!isCargarEmpleadosVisible)}>
              {isCargarEmpleadosVisible ? "Ocultar Crear Empleados" : "Crear Empleados"}
            </button>
            <button className="btn btn-info" onClick={() => setIsListarEmpleadosVisible(!isListarEmpleadosVisible)}>
              {isListarEmpleadosVisible ? "Ocultar Listar Empleados" : "Listar Empleados"}
            </button>
            {isCargarEmpleadosVisible && id && <Empleados id_empresa={id} />}
            {isListarEmpleadosVisible && id && <ListarEmpleados id_empresa={id} />}
          </div>
        )}

        <button className="btn btn-danger" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
