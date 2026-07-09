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
    operator = values.get("operator")

    print(operator)
    resultado = 0
    
    try:
        number1 = float(number1)
        number2 = float(number2)
    except (TypeError, ValueError):
        return jsonify({
            "summary": {
                "resultado": "Digite dos números"
            }
        })


    match operator:
        case "+":
            resultado = number1 + number2            
        case "-":
            resultado = number1 - number2            
        case "*":
            resultado = number1 * number2            
        case "/":
            resultado = "El divisor no puede ser 0" if number2 == 0 else number1 / number2 
        case _:
            resultado = "Operador no valido"


    

    return jsonify({
        "message": "Datos sumados",

        "summary": {
            "resultado": resultado
        },
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)