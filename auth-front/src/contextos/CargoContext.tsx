import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { API_URL } from "../auth/authConstants";

// Definir el tipo de los datos que vamos a manejar en el contexto
interface CargoData {
  nombre: string;
  idArea: string;
  idEmpresa: string;
}

// Definir el tipo de los empleados que vamos a manejar
interface Empleado {
  id: string;
  nombre: string;
  cargo: string;
  // Otros campos según sea necesario
}

// Crear el contexto con valores predeterminados
const CargoContext = createContext<{
  cargoData: CargoData | null;
  setCargoData: (data: CargoData) => void;
  cargosCargados: Empleado[];
  setCargosCargados: (empleados: Empleado[]) => void;
  loading: boolean;
  mensaje: string;
  setLoading: (loading: boolean) => void;
  setMensaje: (mensaje: string) => void;
  DatosConCargosALaApiCrearCargos: () => Promise<void>;
}>({
  cargoData: null,
  setCargoData: () => {},
  cargosCargados: [],
  setCargosCargados: () => {},
  loading: false,
  mensaje: "",
  setLoading: () => {},
  setMensaje: () => {},
  DatosConCargosALaApiCrearCargos: async () => {},
});

// Definir el tipo de las propiedades del proveedor, incluyendo 'children'
interface CargoProviderProps {
  children: ReactNode;
}

// Crear un proveedor del contexto para envolver la aplicación
export const CargoProvider: React.FC<CargoProviderProps> = ({ children }) => {
  const [cargoData, setCargoData] = useState<CargoData | null>(null);
  const [cargosCargados, setCargosCargados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Función para actualizar los datos del contexto y mostrar en consola
  const updateCargoData = (data: CargoData) => {
    console.log("Datos recibidos en el contexto:", data);
    setCargoData(data); // Actualiza el estado del contexto con los nuevos datos
  };

  // Función para cargar empleados
  const DatosConCargosALaApiCrearCargos = async () => {
    setLoading(true); // Activa el estado de carga

    try {
      // Realiza la solicitud al servidor
      const response = await fetch(`${API_URL}/cargosConsultaCrear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cargoData: cargoData }), // Envia el id_empresa en el cuerpo de la solicitud
      });

      if (response.ok) {
        // Si la respuesta es exitosa, intenta parsear como JSON
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        // Actualiza el estado con los cargos creados
        setCargosCargados(data.datos || []); // Actualiza el estado con los cargos creados
        console.log("Estos son los cargos cargados:", data.datos); // Imprime la respuesta en consola

        // Mostrar un alert con los datos cargados
        setMensaje(`Cargos cargados correctamente: ${JSON.stringify(data.datos || [])}`); // Pasa el mensaje con los datos
      } else {
        // Si la respuesta no es exitosa, intenta parsear el error
        const errorData = await response.json();
        setMensaje(errorData.body?.error || "Error al cargar los cargos.");
        console.error("Error al cargar cargos, detalles:", errorData);

        // Mostrar un alert con el error
        alert("Error al cargar los cargos: " + (errorData.body?.error || "Error desconocido"));
      }
    } catch (error) {
      // Captura errores relacionados con la conexión
      console.error("Error al cargar empleados:", error);
      setMensaje("No se pudo conectar con el servidor.");

      // Mostrar un alert con el error de conexión
      alert("Error de conexión: No se pudo conectar con el servidor.");
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  // Usar un useEffect para cargar los empleados cuando cargoData cambie
  useEffect(() => {
    if (cargoData) {
      DatosConCargosALaApiCrearCargos();
    }
  }, [cargoData]); // Este efecto se ejecuta cuando cargoData cambia

  // Componente de Alerta
  const Alert: React.FC<{ type: "success" | "error"; message: string; onClose: () => void }> = ({ type, message, onClose }) => {
    return (
      <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
        <h4 className="alert-heading">¡Bien hecho!</h4>
        <p>{message}</p>
        <hr />
        <p className="mb-0">Cuando lo necesites, puedes usar utilidades de margen para mantener todo ordenado.</p>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  };

  return (
    <CargoContext.Provider
      value={{
        cargoData,
        setCargoData: updateCargoData,
        cargosCargados,
        setCargosCargados,
        loading,
        mensaje,
        setLoading,
        setMensaje,
        DatosConCargosALaApiCrearCargos,
      }}
    >
      {children}

      {/* Mostrar el mensaje solo si existe */}
      {mensaje && (
        <Alert
          type={mensaje.includes("Error") ? "error" : "success"} // Determinar el tipo de alerta según el mensaje
          message={mensaje}
          onClose={() => setMensaje("")} // Limpiar el mensaje cuando se cierre la alerta
        />
      )}
    </CargoContext.Provider>
  );
};

// Hook para acceder al contexto
export const useCargo = () => useContext(CargoContext);
