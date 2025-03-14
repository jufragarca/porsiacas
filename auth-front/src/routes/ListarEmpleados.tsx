import React, { useEffect, useState } from "react";
import { API_URL } from "../auth/authConstants";

export interface Empleado {
  id_empleado: number;
  nombre: string;
  correo: string;
  telefono: string;
  id_cargo: number;
  jefe: string;
}

interface Props {
  id_empresa: number;
}

const ListarEmpleados: React.FC<Props> = ({ id_empresa }) => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [mensaje, setMensaje] = useState<string>("");

  useEffect(() => {
    console.log("useEffect ejecutado - ID Empresa:", id_empresa);
    cargarEmpleados();
  }, [id_empresa]);

  const cargarEmpleados = async () => {
    try {
      const url = `${API_URL}/empleados`;
      console.log("Haciendo petición POST a:", url);
      console.log("Enviando datos:", { id_empresa });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_empresa }),
      });

      console.log("Respuesta recibida:", response);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Convertimos la respuesta en JSON
      const jsonResponse = await response.json();
      console.log("JSON completo recibido:", jsonResponse);

      // Extraemos la lista de empleados de jsonResponse.data.user
      if (jsonResponse.data && Array.isArray(jsonResponse.data.user)) {
        console.log("Datos de empleados extraídos:", jsonResponse.data.user);
        setEmpleados(jsonResponse.data.user);
      } else {
        console.error("Error: La respuesta no contiene empleados válidos.");
        setMensaje("Error al cargar los empleados.");
      }
    } catch (error) {
      console.error("Error al cargar los empleados:", error);
      setMensaje("Error al cargar los empleados.");
    }
  };

  return (
    <div className="mt-4">
      <h3>Lista de Empleados</h3>
      {mensaje && <div className="alert alert-danger">{mensaje}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Cargo</th>
            <th>Jefe</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((empleado, index) => (
              <tr key={empleado.id_empleado || `empleado-${index}`}>
                <td>{empleado.id_empleado}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.correo}</td>
                <td>{empleado.telefono}</td>
                <td>{empleado.id_cargo}</td>
                <td>{empleado.jefe}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No hay empleados disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListarEmpleados;
