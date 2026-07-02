from flask import Flask, render_template, request, jsonify
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

app = Flask(__name__, template_folder="templates", static_folder="static")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/procesar", methods=["POST"])
def procesar():
    payload = request.get_json(silent=True) or {}
    raw_values = payload.get("values", "")

    if isinstance(raw_values, str):
        raw_values = raw_values.split(",")

    values = []
    for item in raw_values:
        try:
            values.append(float(str(item).strip()))
        except (TypeError, ValueError):
            continue

    if len(values) < 2:
        return jsonify({"error": "Ingresa al menos dos números válidos"}), 400

    promedio = sum(values) / len(values)
    minimo = min(values)
    maximo = max(values)

    output_dir = os.path.join(app.static_folder, "generated")
    os.makedirs(output_dir, exist_ok=True)
    image_path = os.path.join(output_dir, "plot.png")

    fig, ax = plt.subplots(figsize=(6, 4))
    x = list(range(1, len(values) + 1))
    ax.plot(x, values, marker="o", color="#4f46e5", linewidth=2)
    ax.axhline(promedio, color="#ef4444", linestyle="--", label=f"Promedio: {promedio:.2f}")
    ax.set_title("Gráfico generado con Python")
    ax.set_xlabel("Índice")
    ax.set_ylabel("Valor")
    ax.grid(alpha=0.3)
    ax.legend()
    fig.tight_layout()
    fig.savefig(image_path, dpi=160)
    plt.close(fig)

    return jsonify({
        "message": "Datos procesados correctamente",
        "summary": {
            "cantidad": len(values),
            "promedio": round(promedio, 2),
            "minimo": round(minimo, 2),
            "maximo": round(maximo, 2),
        },
        "image": "/static/generated/plot.png",
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
