import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { API_URL } from "../auth/authConstants";
import Modal from 'react-modal';
// En el archivo donde la usas

import { Link } from "react-router-dom";




// Ahora puedes usar isValidJson sin problemas


// Tipos de datos
type Cargo = { id: string; nombre: string };
type Jefe = { id: string; nombre: string };
type Empleado = { id_empresa: string; id: string; nombre: string; correo: string; id_cargo: string; jefe: string };

export default function CrearEmpleado() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idEmpresa = queryParams.get("id");

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ id_empresa: "", nombre: "", correo: "", id_cargo: "", jefe: "" });
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [jefes, setJefes] = useState<Jefe[]>([]);
  const [empleadosCargados, setEmpleadosCargados] = useState<Empleado[]>([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] =  useState({ id: "",id_empresa: "", nombre: "", correo: "", id_cargo: "", jefe: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mostrarEmpleados, setMostrarEmpleados] = useState(false);

  // Función para alternar la visibilidad de los empleados
  const toggleEmpleados = async () => {
    if (!mostrarEmpleados) {
      await cargarEmpleados(); // Cargar empleados solo cuando se va a mostrar la lista
    }
    setMostrarEmpleados(!mostrarEmpleados); // Alternar la visibilidad
  };

  // Funciones de manejo de modal
  const openModal = (empleado: Empleado) => {
    console.log("Empleado seleccionado:", empleado);
    setEmpleadoSeleccionado(empleado);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };
  
  
  
  const ModificarEmpleados = async () => {
    if (empleadoSeleccionado) {
      // Creamos el objeto empleadoModificar con los datos del empleado seleccionado
      const empleadoModificar = {
        id: empleadoSeleccionado.id,               // Primero el id
        nombre: empleadoSeleccionado.nombre,       // Luego el nombre
        id_empresa: empleadoSeleccionado.id_empresa, // Después id_empresa
        correo: empleadoSeleccionado.correo,       // Luego correo
        id_cargo: empleadoSeleccionado.id_cargo,   // Después id_cargo
        jefe: empleadoSeleccionado.jefe            // Finalmente jefe
      };
  
      console.log("Datos a modificar:", empleadoModificar);
  
      setLoading(true); // Inicia el estado de carga
      console.log("Datos enviados al backend:", empleadoModificar); // Verifica los datos enviados
  
      try {
        const response = await fetch(`${API_URL}/actualizarEmpleados`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(empleadoModificar), // Convierte el objeto a JSON
        });
  
        console.log("Respuesta completa del backend:", response);
  
        if (response.ok) {
          // Parsear la respuesta como JSON
          const jsonData = await response.json();
          console.log("Respuesta en formato JSON:", jsonData);
  
          // Manejar los datos recibidos
          if (jsonData.resultado) {
            setMensaje(jsonData.mensaje || "Datos modificados exitosamente.");
          } else {
            setMensaje("La operación no se completó correctamente.");
          }
  
          // Retornar una promesa resuelta
          return Promise.resolve(jsonData);
        } else {
          // Si hay un error, manejarlo
          const errorText = await response.text();
          console.error("Error en la respuesta del servidor:", response.status, errorText);
          setMensaje("Hubo un error al modificar los empleados.");
          return Promise.reject(`Error en la respuesta del servidor: ${response.status}`);
        }
      } catch (error) {
        console.error("Error al modificar el empleado:", error);
        setMensaje("No se pudo conectar con el servidor.");
        return Promise.reject(error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    }
  };
    
  // Función para cargar empleados
  const cargarEmpleados = async () => {
    setLoading(true); // Activa el estado de carga
  
    try {
      // Realiza la solicitud al servidor
      const response = await fetch(`${API_URL}/empleados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_empresa: idEmpresa }), // Envia el id_empresa en el cuerpo de la solicitud
      });
  
      if (response.ok) {
        // Si la respuesta es exitosa, intenta parsear como JSON
        const data = await response.json();
        setEmpleadosCargados(data.data.user || []); // Actualiza el estado con los empleados cargados
        console.log("Estos son los empleados cargados:", data); // Imprime la respuesta en consola
      } else {
        // Si la respuesta no es exitosa, intenta parsear el error
        const errorData = await response.json();
        setMensaje(errorData.body?.error || "Error al cargar empleados."); // Muestra el mensaje de error
        console.error("Error al cargar empleados, detalles:", errorData); // Imprime el error en consola
      }
    } catch (error) {
      // Captura errores relacionados con la conexión
      console.error("Error al cargar empleados:", error);
      setMensaje("No se pudo conectar con el servidor."); // Muestra un mensaje de error
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };
  
  // Cargar cargos
  useEffect(() => {
    if (!idEmpresa) return;

    const fetchCargos = async () => {
      try {
        const response = await fetch(`${API_URL}/cargos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_empresa: idEmpresa }),
        });

        if (response.ok) {
          const data = await response.json();
          setCargos(data.data.cargos || []);
        } else {
          console.error("Error al cargar cargos.");
        }
      } catch (error) {
        console.error("Error al cargar cargos:", error);
      }
    };

    fetchCargos();
  }, [idEmpresa]);

  // Cargar jefes
  useEffect(() => {
    const fetchJefes = async () => {
      try {
        const bodyData = { id_empresa: idEmpresa };
        const response = await fetch(`${API_URL}/jefes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          const data = await response.json();
          setJefes(data.data.jefes || []);
        } else {
          console.error("Error al cargar jefes.");
        }
      } catch (error) {
        console.error("Error al cargar jefes:", error);
      }
    };

    fetchJefes();
  }, [idEmpresa]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const datosEnviados = { ...nuevoEmpleado, id_empresa: idEmpresa };

    try {
      const datosEnviados = { ...nuevoEmpleado, id_empresa: idEmpresa, jefe: Number(nuevoEmpleado.jefe) };
      
      console.log("Esto es lo que se envía al backend:", datosEnviados);

      try {
        JSON.stringify(datosEnviados);
        console.log("Es un JSON válido");
      } catch (error) {
        console.log("No es un JSON válido");
        return;
      }

      const response = await fetch(`${API_URL}/crearEmpleado`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosEnviados),
      });

      if (response.ok) {
        const data = await response.json();
        setEmpleados((prev) => [...prev, data.data]);
        setMensaje("Empleado creado exitosamente.");
        setNuevoEmpleado({ id_empresa: "", nombre: "", correo: "", id_cargo: "", jefe: "" });
        setShowForm(false);
      } else {
        const errorData = await response.json();
        setMensaje(errorData.body?.error || "Error al crear empleado.");
      }
    } catch (error) {
      console.error("Error al crear empleado:", error);
      setMensaje("Error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idEmpresa) cargarEmpleados();
  }, [idEmpresa]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  
  if (!idEmpresa) {
    return <p>Falta el ID de la empresa en los parámetros de la URL.</p>;
  }

  return (
    <>

      <div className="card text-center">
        <div className="container mt-3">
          <button onClick={() => setShowForm(!showForm)} className="btn btn-success mb-3">
            Agregar Empleado
          </button>

          <button onClick={toggleEmpleados} className="btn btn-primary mb-3">
            {mostrarEmpleados ? "Ocultar Empleados" : "Listar Empleados"}
          </button>
        </div>

        <div className="card-header">
          {showForm && (
            <div className="container mt-3">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="nombre"
                  value={nuevoEmpleado.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  required
                />
                <input
                  type="email"
                  name="correo"
                  value={nuevoEmpleado.correo}
                  onChange={handleInputChange}
                  placeholder="Correo"
                  required
                />
                <select name="id_cargo" value={nuevoEmpleado.id_cargo} onChange={handleInputChange}>
                  <option value="">Seleccionar Cargo</option>
                  {cargos.map((cargo) => (
                    <option key={cargo.id} value={cargo.id}>
                      {cargo.nombre}
                    </option>
                  ))}
                </select>
                <select name="jefe" value={nuevoEmpleado.jefe} onChange={handleInputChange}>
                  <option value="">Seleccionar Jefe</option>
                  {jefes.map((jefe) => (
                    <option key={jefe.id} value={jefe.id}>
                      {jefe.nombre}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn btn-success">Crear Empleado</button>
              </form>
            </div>
          )}
        </div>

        <div className="card-body">
          {mostrarEmpleados && (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Cargo</th>
                  <th>Jefe</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleadosCargados.map((empleadosCargados) => (
                  <tr key={empleadosCargados.id}>
                    <td>{empleadosCargados.nombre}</td>
                    <td>{empleadosCargados.correo}</td>


                    <td>{empleadosCargados.id_cargo}
                      


                    </td>
                    <td>{empleadosCargados.jefe}</td>
                    <td>
                      <button onClick={() => openModal(empleadosCargados)} className="btn btn-info">Modificar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
  <h2>Modificar Empleado</h2>
  {empleadoSeleccionado && (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Mostrar el ID, solo lectura */}
        <input
  type="text"
  value={empleadoSeleccionado.id}  // Muestra el id del empleado
  onChange={(e) => setEmpleadoSeleccionado({ ...empleadoSeleccionado, id: e.target.value })}  
  readOnly// Permite modificar el id
  className="form-control"
/>


        {/* Campo para modificar el nombre */}
        <input
          type="text"
          value={empleadoSeleccionado.nombre}
          onChange={(e) => setEmpleadoSeleccionado({ ...empleadoSeleccionado, nombre: e.target.value })}
        />

        {/* Campo para modificar el correo */}
        <input
          type="email"
          value={empleadoSeleccionado.correo}
          onChange={(e) => setEmpleadoSeleccionado({ ...empleadoSeleccionado, correo: e.target.value })}
        />

        {/* Selección de cargo */}
        <select
          value={empleadoSeleccionado.id_cargo}
          onChange={(e) => setEmpleadoSeleccionado({ ...empleadoSeleccionado, id_cargo: e.target.value })}
        >
          <option value="">Seleccionar Cargo</option>
          {cargos.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.nombre}
            </option>
          ))}
        </select>

        {/* Selección de jefe */}
        <select
          value={empleadoSeleccionado.jefe}
          onChange={(e) => setEmpleadoSeleccionado({ ...empleadoSeleccionado, jefe: e.target.value })}
        >
          <option value="">Seleccionar Jefe</option>
          {jefes.map((jefe) => (
            <option key={jefe.id} value={jefe.id}>
              {jefe.nombre}
            </option>
          ))}
        </select>

        {/* Botón para guardar los cambios */}
        <button
          type="button"
          onClick={() => {
            ModificarEmpleados(empleadoSeleccionado);  // Pasamos el empleadoSeleccionado con el id
            closeModal();  // Cerramos el modal después de guardar los cambios
          }}
          className="btn btn-primary"
        >
          Guardar Cambios
        </button>

        {/* Botón para cerrar el modal */}
        <button
          type="button"
          onClick={closeModal}  // Llama a closeModal para cerrar el modal
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
}
