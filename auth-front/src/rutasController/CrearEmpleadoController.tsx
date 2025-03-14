// auth-front/src/rutasController/CrearEmpleadoController.tsx
import { API_URL } from "../auth/authConstants";

interface CrearEmpleadoProps {
  nombre: string;
  id_empresa: string;
  correo: string;
  id_cargo: number;
  jefe: string;
  telefono: string;
  PASSWORD: string;
}

// Función para crear un empleado
export const crearEmpleado = async ({
  nombre,
  id_empresa,
  correo,
  id_cargo,
  jefe,
  telefono,
  PASSWORD,
}: CrearEmpleadoProps) => {
  try {
    // Realizamos la solicitud POST para crear el empleado
    const response = await fetch(`${API_URL}/crearEmpleado`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        id_empresa,
        correo,
        id_cargo,
        jefe,
        telefono,
        PASSWORD,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al crear el empleado. Código: ${response.status}`);
    }

    const data = await response.json();
    console.log("Empleado creado:", data);

    // Retornamos el resultado del backend, como la respuesta JSON
    return data;
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    throw error;
  }
};
