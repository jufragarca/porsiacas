import { API_URL } from "../auth/authConstants";

interface Cargo {
  id: number;
  nombre: string;
  id_area: number;
  id_empresa: number;
}

export const obtenerCargos = async (
  idEmpresa: number
): Promise<Cargo[] | null> => {
  const requestData = { id_empresa: idEmpresa };
  const jsonString = JSON.stringify(requestData);

  try {
    const response = await fetch(`${API_URL}/ListarCargos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    });

    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data.cargos) ? data.cargos : [];
    } else {
      console.error("Error al cargar los cargos.");
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud de cargos:", error);
    return null;
  }
};
