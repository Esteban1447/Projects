// Obtiene elementos del HTML usando su id
const input = document.getElementById("values")
const button = document.getElementById("sendBtn")
const status = document.getElementById("status")
const result = document.getElementById("result")

// Estos elementos mostrarán los resultados recibidos

const cantidad = document.getElementById("cantidad")
const promedio = document.getElementById("promedio")
const minimo = document.getElementById("minimo")
const maximo = document.getElementById("maximo")
const plotImage = document.getElementById("plotImage")

// Escucha cuando el usuario hace click en el botón
button.addEventListener("click", async ()=> {

  // Obtiene el texto del input y lo procesa
  const values = input.value

    // Divide por comas
    // "10,20,30" → ["10","20","30"]
    .split(",")

    // Elimina espacios innecesarios
    // ["10"," 20","30 "] → ["10","20","30"]
    .map((item) => item.trim())

    // Elimina valores vacíos
    // ["10","","30"] → ["10","30"]
    .filter(Boolean);

  // Verifica que existan mínimo dos valores
  if (values.length < 2) {

    // Muestra mensaje al usuario
    status.textContent = "Ingresa al menos dos números";

    // Detiene la ejecución
    return;
  }

  // Mensaje temporal mientras se envían datos
  status.textContent = "Enviando datos al servidor...";

  try {

    // Envía una petición POST al servidor
    const response = await fetch("/procesar", {

      // Tipo de petición
      method: "POST",

      // Indica que se enviará JSON
      headers: {
        "Content-Type": "application/json"
      },

      // Convierte objeto JS a texto JSON
      body: JSON.stringify({ values }),
    });

    // Convierte la respuesta del servidor a objeto JS
    const data = await response.json();

    // Verifica si el servidor respondió con error
    if(!response.ok){

      // Crea un error manual

      throw new Error(
        data.error || "No se pudo procesar"
      );
    }

    // Inserta resultados recibidos en el HTML
    cantidad.textContent = data.sumary.cantidad;
    promedio.textContent = data.sumary.promedio;
    minimo.textContent = data.sumary.minimo;
    maximo.textContent = data.sumary.maximo;

    // Carga la imagen generada por Python
    // Date.now evita que el navegador use una imagen vieja guardada
    plotImage.src = `${data.image}?v=${Date.now()}`;

    // Muestra el bloque de resultados
    result.classList.remove("hidden");

    // Muestra mensaje del servidor
    status.textContent = data.message;

  } catch (error) {

    // Si ocurre cualquier error:
    // servidor caído, internet, JSON malo, etc.

    // Muestra mensaje de error
    status.textContent = error.message;

    // Oculta resultados
    result.classList.add("hidden");
  }
});