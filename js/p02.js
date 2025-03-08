const escribePais = document.getElementById("txtBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("btnLimpiar");
const mensaje = document.getElementById('mensaje');
const cardBody = document.getElementById("cardBody");
const url = "https://restcountries.com/v3.1/name/";

btnBuscar.addEventListener("click", () => {
    fetch(url + escribePais.value)
        .then(response => {
            if (!response.ok) {
                alert("Fallo al cargar el pais, codigo de error: " + response.status);
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const pais = data[0];

                cardBody.innerHTML = "";

                let card = document.createElement("div"); // Definir la variable card
                card.className = 'card';

                let capitalPais = document.createElement("p");
                capitalPais.innerHTML = `<strong>Capital:</strong> <br> ${pais.capital[0]}`;
                card.appendChild(capitalPais);

                let lenguaPais = document.createElement("p");
                lenguaPais.innerHTML = `<strong>Lenguajes:</strong> <br> ${Object.values(pais.languages).join(', ')}`;
                lenguaPais.className = 'text-center fs-4 no-margin';
                card.appendChild(lenguaPais);

                cardBody.appendChild(card);
            } else {
                console.error("No se encontraron datos");
            }
        })
        .catch(error => {
            console.error(error);
        });
});

btnLimpiar.addEventListener("click", () => {
    escribePais.value = "";
    cardBody.innerHTML = "";
});
