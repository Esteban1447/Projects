from flask import Flask, render_template, request, jsonify
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/procesar", methods=["POST"])
def procesar():

    # Intenta leer JSON
    payload = request.get_json(silent=True) or {}

    # Obtiene lista de tareas
    tareas = payload.get("tareas", [])


    # Cuenta total
    total_tareas = len(tareas)


    # Cuenta completadas
    completadas = 0

    for item in tareas:

        if item.get("completed", False):
            completadas += 1


    # Calcula pendientes
    pendientes = total_tareas - completadas


    # Carpeta donde irá imagen
    output_dir = os.path.join(
        app.static_folder,
        "generated"
    )

    os.makedirs(output_dir, exist_ok=True)

    image_path = os.path.join(
        output_dir,
        "plot.png"
    )


    # Crea gráfica
    fig, ax = plt.subplots(figsize=(6,4))


    # Evita error cuando no hay tareas
    if total_tareas > 0:

        ax.pie(
            [completadas, pendientes],
            labels=["Completadas","Pendientes"],
            autopct="%1.1f%%"
        )

    else:

        ax.text(
            0.5,
            0.5,
            "No hay tareas",
            ha="center",
            va="center"
        )


    ax.set_title("Estado de tareas")

    fig.tight_layout()

    fig.savefig(
        image_path,
        dpi=160
    )

    plt.close(fig)


    return jsonify({

        "message":"Datos procesados",

        "summary":{

            "total_tareas": total_tareas,
            "completadas": completadas,
            "pendientes": pendientes

        },

        "image":"/static/generated/plot.png"

    })


if __name__ == "__main__":
    app.run(debug=True)