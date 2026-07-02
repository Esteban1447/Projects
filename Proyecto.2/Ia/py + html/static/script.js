const input = document.getElementById("values");
const button = document.getElementById("sendBtn");
const status = document.getElementById("status");
const result = document.getElementById("result");
const cantidad = document.getElementById("cantidad");
const promedio = document.getElementById("promedio");
const minimo = document.getElementById("minimo");
const maximo = document.getElementById("maximo");
const plotImage = document.getElementById("plotImage");

button.addEventListener("click", async () => {
  const values = input.value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (values.length < 2) {
    status.textContent = "Ingresa al menos dos números.";
    return;
  }

  status.textContent = "Enviando datos al servidor...";

  try {
    const response = await fetch("/procesar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "No se pudo procesar");
    }

    cantidad.textContent = data.summary.cantidad;
    promedio.textContent = data.summary.promedio;
    minimo.textContent = data.summary.minimo;
    maximo.textContent = data.summary.maximo;
    plotImage.src = `${data.image}?v=${Date.now()}`;
    result.classList.remove("hidden");
    status.textContent = data.message;
  } catch (error) {
    status.textContent = error.message;
    result.classList.add("hidden");
  }
});
