// auth-front/src/types/typesUsuario.ts
// auth-front/src/types/typesUsuario.ts

export interface Empleado {
  id: number;
  id_cargo: number;
  id_empresa: number;
  jefe: number;
  nombre: string;
  correo: string;
  telefono: string;
  PASSWORD: string;
}


export interface AuthResponse {
  status: number;
  mensaje: string;
  resultado: Empleado[]; // Asegúrate de que 'resultado' es un array de 'Empleado'
}