document.addEventListener ('DOMContentLoaded', function(){
    const input = document.getElementById ('name');
    const showBtn = document.getElementById('showBtn');
    const clearBtn = document.getElementById('clearBtn');
    const output = document.getElementById('output');
    const count = document.getElementById('count');


    //  La funcion \s busca los espacios en el texto, la funcion /g es la que le dice que lo haga en todo el texto, se usa el .remplace para que cuando los busque e encuentre los replace

  function updateCount() {
    const textWithoutSpaces = input.value.replace(/\s/g, '');
    count.textContent = 'Caracteres: ' + textWithoutSpaces.length;
  }
  showBtn.addEventListener('click', function (){
    output.textContent = input.value || 'No escribiste nada.';
  });
 
    //Reemplaza el contenido del texto a '' (o sea nada) y pone el texto original   

  clearBtn.addEventListener('click',
    function (){
    input.value = '';
    output.textContent = 'Aquí aparecera tu texto.'
    updateCount();
    });

    // Esta funcion actualiza el contador e el output cada que se copie u quite una letra en el cuadro de texto
    // Ahora que lo pienso esta funcion le quita la funcion al boton de show, ahora solo siver para decir 'No escribiste nada.' xd

    input.addEventListener( 'input', function(){
     updateCount();
     output.textContent = input.value ? input.value: 'Aqui aparecerá tu texto.'
    });

    updateCount

})