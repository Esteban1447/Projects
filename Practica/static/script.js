document.addEventListener("DOMContentLoaded", () => {

    const number1 = document.getElementById("number1");
    const number2 = document.getElementById("number2");
    const button = document.getElementById("bton");
    const answerd = document.getElementById("answerd")

    button.addEventListener("click", async () => {
        let number11 = Number(number1.value);
        let number22 = Number(number2.value);

        console.log(number11);
        console.log(number22);
        console.log(number11 + number22)

    const values = {
        number1: number11,
        number2: number22
    };


        try {

            const response = await fetch("/procesar", {
            method: "POST",
            headers: 
            {"Content-Type": "application/json"

            },
            body: JSON.stringify({values}),
        })

        const data = await response.json();
        answerd.textContent = data.summary.suma;

        console.log(data)
        }catch (error) {
            status.textContent = error.message;
        }
    });
});