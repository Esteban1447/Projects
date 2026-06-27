document.addEventListener ('DOMContentLoaded', function(){
    const input = document.getElementById ('name');
    const letter = document.getElementById ('letter');
    const showBtn = document.getElementById('showBtn');
    const clearBtn = document.getElementById('clearBtn');
    const output = document.getElementById('output');
    const count = document.getElementById('count');
    const count2 = document.getElementById('count2');



    //  La funcion \s busca los espacios en el texto, la funcion /g es la que le dice que lo haga en todo el texto, se usa el .remplace para que cuando los busque e encuentre los replace

  function updateCount() {
    const textWithoutSpaces = input.value.replace(/\s/g, '');
    count.textContent = 'Caracteres: ' + textWithoutSpaces.length;
  }

  showBtn.addEventListener('click', function (){
    output.textContent = input.value || 'No escribiste nada.';
  });
 
 
  function updateCountA() {
    const letter2 = letter.value.toLowerCase();
    const text = input.value.toLowerCase();

    const aCount = [...text]
      .filter(char => char === letter2)
      .length;

    count2.textContent = letter.value ? `${letter.value.toUpperCase()}: ${aCount}` : '';
  }

  // Esta funcion junta las funciones que se repetian muchas veces para no copiar el mismo codigo en diferentes lugares

  function actualizarTodo(){
    updateCount();
    updateCountA();

    output.textContent = input.value
      ? input.value
      : 'Aqui aparecerá tu texto.';
  }

    //Reemplaza el contenido del texto a '' (o sea nada) y pone el texto original   

  clearBtn.addEventListener('click',
    function (){
    input.value = '';
    letter.value = '';

    actualizarTodo();
    });

    // Esta funcion actualiza el contador e el output cada que se copie u quite una letra en el cuadro de texto
    // Ahora que lo pienso esta funcion le quita la funcion al boton de show, ahora solo siver para decir 'No escribiste nada.' xd

    input.addEventListener('input', actualizarTodo);

    letter.addEventListener('input', updateCountA);

    actualizarTodo();

})

// Bug a corregir, el css de el texto re escrito se sale xd