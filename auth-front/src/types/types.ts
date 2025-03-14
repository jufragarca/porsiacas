// Definir las interfaces para los datos de la empresa y la respuesta de autenticación

export interface AuthResponse { // Esta es la respuesta que espera tu API
  body: {
    user: User;  // Información del usuario autenticado
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthResponseError { // Esta es la respuesta cuando ocurre un error
  body: {
    error: string;  // Mensaje de error en caso de fallo
  };
}

// Modificar la interfaz User para que refleje los campos de tu tabla de empresas
export interface User {
  id_empresa: number;  // Asegúrate de que el tipo sea 'number'
  nombre: string;
  correo: string;
  // Otras propiedades que pueda tener el User
}
