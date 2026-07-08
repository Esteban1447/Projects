from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/procesar", methods=["POST"])
def procesar():
    payload = request.get_json(silent=True) or {}

    values = payload.get("values", "")

    number1 = values.get("number1")
    number2 = values.get("number2")

    suma = number1 + number2

    return jsonify({
        "message": "Datos sumados",

        "summary": {
            "suma" : suma
        },
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)