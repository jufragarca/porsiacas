import React from "react";  
import { AiOutlineStar, AiFillStar } from "react-icons/ai";  // Importa los iconos de estrellas de react-icons, uno para estrella vacía (AiOutlineStar) y otro para estrella llena (AiFillStar)

interface EstrellasProps {
  score: number;  // score: Es el puntaje actual que se pasa al componente desde su componente padre. Si el puntaje es, por ejemplo, 3, las tres primeras estrellas se llenarán.
  onSelect: (score: number) => void;  // onSelect: Es una función que se ejecuta cuando el usuario hace clic en una estrella. Esta función recibirá el puntaje de la estrella seleccionada (por ejemplo, 1, 2, 3, etc.).
}

const Estrellas: React.FC<EstrellasProps> = ({ score, onSelect }) => { 
  // Esta es una función que maneja el clic en las estrellas. Recibe el índice de la estrella clickeada y pasa ese índice + 1 (porque las estrellas van del 1 al 5).
  const handleClick = (index: number) => {  
    onSelect(index + 1);  // Actualiza el puntaje con el índice + 1 (porque las estrellas empiezan de 1, no de 0)
  };

  return (
    <div>
      {/* Mapeamos las estrellas para hacerlas interactivas */}
      {new Array(10).fill(null).map((_, index) =>  
        // new Array(5): Crea un arreglo con 5 elementos (es decir, 5 "espacios" para las estrellas).
        // fill(null): Llena ese arreglo con `null`, no importa el valor, solo estamos creando 5 elementos.
        // .map: Se usa para recorrer cada elemento del arreglo y renderizar algo basado en su índice.
        //_: Este es un nombre comúnmente usado para indicar que ese parámetro no se va a utilizar en el cuerpo de la función. En este caso, el primer parámetro es el valor de cada elemento dentro del arreglo (en este caso null por cómo está definido el arreglo), pero como no nos interesa el valor de cada elemento, lo llamamos _ para indicar que no lo estamos utilizando.
//index: Este es el segundo parámetro de la función que es pasado por .map(). index es el índice del elemento actual en el que 
// estamos iterando. Es decir, si estamos recorriendo un arreglo de 5 elementos, el index tomará los valores 0, 1, 2, 3, y 4 
// a medida que va avanzando en el arreglo.
        index < score ? ( 
          // index < score: Esta es la comparación que determina si la estrella debe estar llena o vacía.
          // Si el índice de la estrella es menor que el puntaje (score), la estrella se llena (<AiFillStar />),
          // de lo contrario, la estrella aparece vacía (<AiOutlineStar />).
          <AiFillStar key={index} onClick={() => handleClick(index)} style={{ cursor: 'pointer' }} />
          // Aquí se usa el ícono de la estrella llena (AiFillStar) si la condición es verdadera.
        ) : (
          // Si la condición no se cumple (es decir, si el índice es mayor o igual que el puntaje),
          // entonces la estrella será vacía.
          <AiOutlineStar key={index} onClick={() => handleClick(index)} style={{ cursor: 'pointer' }} />
          // Aquí se usa el ícono de la estrella vacía (AiOutlineStar).
        )
      )}
    </div>
  );
};

export default Estrellas;
