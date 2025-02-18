// Definir las interfaces para los datos de la empresa y la respuesta de autenticación
//auth-front/src/types/types.ts
export interface AuthResponse {///ESTO ESTA RELACIONADO CON LE JSON RESPNSE DE NODE JS
  body: {
    user: User;  // Información del usuario autenticado
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthResponseError {//esta funcion la estoy llamando en singup.tsx
  body: {
    error: string;  // Mensaje de error en caso de fallo
  };
}

// Modificar la interfaz User para que refleje los campos de tu tabla empresas
export interface User {
  id: string;  // El ID de la empresa
  nit: string;  // Número de identificación tributaria
  nombre_empresa: string;  // Nombre de la empresa
  correo_empresa: string;  // Correo de la empresa
  nombre_contacto: string;  // Nombre del contacto en la empresa
  celular_contacto: string;  // Celular del contacto
  
}

