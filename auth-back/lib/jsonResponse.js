// En resumen, la función jsonResponse crea y retorna un objeto que encapsula un código de estado 
// y un cuerpo de respuesta. Esto es útil en aplicaciones de servidor para estructurar respuestas 
// JSON de manera consistente y clara.
exports.jsonResponse = function (statuscode, body) {//
  return {
    statuscode, // Código de estado HTTP
    body: body,  // Cuerpo de la respuesta, que puede ser un objeto o mensaje
  };
};
