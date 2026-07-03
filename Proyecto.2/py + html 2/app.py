from flask import Flask, render_template, request, jsonify
import os
import matplotlib

# Le dice a matplotlib:
# "No intentes abrir ventanas ni pantallas, solo crea imágenes"
matplotlib.use("Agg")

import matplotlib.pyplot as plt

# Crea la app y le dice dónde buscar:
# templates = HTML
# static = imágenes, css, js y cosas públicas
app = Flask(__name__, template_folder="templates", static_folder="static")


# Cuando alguien entra a la página principal
@app.route("/")
def index():

    # Busca index.html dentro de templates
    return render_template("index.html")


# Endpoint que recibe datos enviados desde JS
@app.route("/procesar", methods=["POST"])
def procesar():

    # Intenta leer JSON.
    # Si llega algo raro o vacío usa {}
    payload = request.get_json(silent=True) or {}

    # Busca "values"
    # Si no existe usa ""
    raw_values = payload.get("values", "")

    # Si llegó texto:
    # "10,20,30"
    # lo convierte a:
    # ["10","20","30"]
    if isinstance(raw_values, str):
        raw_values = raw_values.split(",")

    values = []

    # Recorre uno por uno
    for item in raw_values:
        try:

            # Intenta convertir a número
            # quita espacios y guarda si sirve
            values.append(float(str(item).strip()))

        # Si llega basura tipo:
        # "hola", None, etc...
        # lo ignora y sigue
        except (TypeError, ValueError):
            continue

    # Verifica mínimo dos números válidos
    if len(values) < 2:
        return jsonify({
            "error": "Ingresa al menos dos numeros validos"
        }), 400


    # Calcula datos básicos
    promedio = sum(values) / len(values)
    minimo = min(values)
    maximo = max(values)


    # Crea:
    # static/generated
    output_dir = os.path.join(app.static_folder, "generated")

    # Si ya existe no pasa nada
    os.makedirs(output_dir, exist_ok=True)

    # Ruta donde se guardará la imagen
    image_path = os.path.join(output_dir, "plot.png")


    # Crea la imagen y la zona donde se dibuja
    fig, ax = plt.subplots(figsize=(6,4))


    # Crea números:
    # [1,2,3,4...]
    # para ubicar los datos
    x = list(range(1, len(values) + 1))


    # Dibuja la gráfica usando:
    # posición y valor
    ax.plot(x, values,
            marker="o",
            color="#4f46e5",
            linewidth=2)


    # Dibuja una línea con el promedio
    ax.axhline(
        promedio,
        color="#ef4444",
        linestyle="--",
        label=f"Promedio: {promedio:.2f}"
    )

    # Solo texto visual
    ax.set_title("Gráfico generado con Python")
    ax.set_xlabel("Índice")
    ax.set_ylabel("Valor")
    ax.grid(alpha=0.3)
    ax.legend()

    # Acomoda elementos automáticamente
    fig.tight_layout()

    # Guarda la imagen
    fig.savefig(image_path, dpi=160)

    # Libera memoria
    plt.close(fig)


    # Devuelve información al frontend
    return jsonify({

        "message": "Datos procesados correctamente",

        "summary": {

            # Cuenta cuántos datos hay
            "cantidad": len(values),

            "promedio": round(promedio,2),
            "minimo": round(minimo,2),
            "maximo": round(maximo,2)
        },

        # Dirección donde quedó la imagen
        "image": "/static/generated/plot.png",
    })


# Inicia el servidor
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)