import React, { useState, useEffect } from "react";
import { crearEmpleado } from "../rutasController/CrearEmpleadoController";
import { obtenerCargos } from "../rutasController/ListarCargosParaCargos";
import ListarEmpleados from "./ListarEmpleados";//estoe s para listar los empleados despues de crarlos 
import "bootstrap/dist/css/bootstrap.min.css";

interface Empleado {
  id: number;
  nombre: string;
}

interface Props {
  id_empresa: number;
}

const Empleados: React.FC<Props> = ({ id_empresa }) => {
  const [cargos, setCargos] = useState<Empleado[]>([]);
  const [jefes, setJefes] = useState<Empleado[]>([]); // ✅ Se mantiene el estado para los jefes
  const [mensaje, setMensaje] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [empleadoCreado, setEmpleadoCreado] = useState<boolean>(false); // ✅ Controla si se muestra la tabla

  // Estados del formulario
  const [nombre, setNombre] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [idCargo, setIdCargo] = useState<number | "">("");
  const [jefe, setJefe] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [PASSWORD, setPASSWORD] = useState<string>("");

  useEffect(() => {
    if (id_empresa) {
      cargarCargos();
      cargarJefes(); // ✅ Se mantiene la carga de jefes
    }
  }, [id_empresa]);

  const cargarCargos = async () => {
    try {
      const dataCargos = await obtenerCargos(id_empresa);
      setCargos(dataCargos);
    } catch (error) {
      setMensaje("Error al cargar los cargos.");
    }
  };

  const cargarJefes = async () => {
    try {
      const dataJefes = await obtenerCargos(id_empresa); // ✅ Se usa la misma función porque no me diste otra
      setJefes(dataJefes);
    } catch (error) {
      setMensaje("Error al cargar los jefes.");
    }
  };

  const handleCrearEmpleado = async () => {
    if (!nombre || !correo || !idCargo || !jefe || !telefono || !PASSWORD) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }
  
    const empleadoData = {
      nombre,
      id_empresa: String(id_empresa),
      correo,
      id_cargo: Number(idCargo),
      jefe,
      telefono,
      PASSWORD,
    };
  
    console.log("Datos enviados a la API:", empleadoData); // 🔹 Se muestra lo que se envía
  
    setLoading(true);
    try {
      const nuevoEmpleado = await crearEmpleado(empleadoData);
  
      if (nuevoEmpleado) {
        setMensaje("Empleado creado correctamente.");
        setNombre("");
        setCorreo("");
        setIdCargo("");
        setJefe("");
        setTelefono("");
        setPASSWORD("");
  
        setEmpleadoCreado(true); // ✅ Ahora se muestra la tabla
      } else {
        setMensaje("Error al crear el empleado.");
      }
    } catch (error) {
      setMensaje("Hubo un error al crear el empleado.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>Gestión de Empleados</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {/* Formulario para crear empleado */}
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Cargo</label>
        <select className="form-control" value={idCargo} onChange={(e) => setIdCargo(Number(e.target.value))}>
          <option value="">Seleccione un cargo</option>
          {cargos.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Selector de Jefe */}
      <div className="mb-3">
        <label className="form-label">Jefe</label>
        <select className="form-control" value={jefe} onChange={(e) => setJefe(e.target.value)}>
          <option value="">Seleccione un jefe</option>
          {jefes.map((j) => (
            <option key={j.id} value={j.id}>

              {j.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" value={PASSWORD} onChange={(e) => setPASSWORD(e.target.value)} />
      </div>

      {/* 🔹 Botón para crear empleado */}
      <button className="btn btn-primary" onClick={handleCrearEmpleado} disabled={loading}>
        {loading ? "Creando..." : "Crear Empleado"}
      </button>

      {/* ✅ La tabla solo se muestra después de crear un empleado */}
      {empleadoCreado && <ListarEmpleados id_empresa={id_empresa} />}///para eso llama eta funcion 
    </div>
  );
};

export default Empleados;
