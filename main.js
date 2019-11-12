
var totalSeats = 0;


function cargarJSON() {

    // Creo el objeto que hara la llamada
    let llamada = new XMLHttpRequest();

    // Ruta de donde esta el fichero
    let url = "data/data.json";

    // Indico que debo hacer cuando reciba una respuesta
    llamada.onreadystatechange = function () {
        // Si todo esta bien
        if (this.readyState == 4 && this.status == 200) {

            // Parseo la informacion y la muestro
            console.log("Recibida la informacion del fichero");
            let datos = JSON.parse(this.responseText);
            console.log(datos);
            showPoliticalParties(datos);
        }
    }

    console.log("Se envia la peticion");

    // Abro la llamada o peticion
    llamada.open("GET", url, true);
    // lanzo la peticion
    llamada.send();

}

function showPoliticalParties(politicalParties) {

    let divPolitical = document.getElementById("political-parties");

    politicalParties.forEach(polPart => {

        let div = document.createElement("div");

        div.addEventListener("click", function () {


            let divExist = document.getElementById(polPart.name);

            if (divExist) {

                totalSeats -= polPart.seats;

                div.setAttribute("class", "political-party");

                divExist.remove();
            } else {
                let divPercent = document.createElement("div");
                divPercent.setAttribute("id", polPart.name);

                div.setAttribute("class", "political-party active");

                divPercent.setAttribute("style", "width: " + ((polPart.seats * 100) / 350) + "%;background-color: " + polPart.color);

                let barra = document.getElementById("barra");
                barra.appendChild(divPercent);

                totalSeats += polPart.seats;
            }

            document.getElementById("total-seats").innerHTML = totalSeats

        });

        div.setAttribute("class", "political-party");
        div.setAttribute("style", "border-left: 10px solid " + polPart.color)
        let name = document.createElement("span");
        let nameText = document.createTextNode(polPart.name);

        name.appendChild(nameText);

        let seats = document.createElement("span");
        let seatsText = document.createTextNode(polPart.seats);

        seats.appendChild(seatsText);

        div.appendChild(name);
        div.appendChild(seats);

        divPolitical.appendChild(div);

    });



}



window.onload = cargarJSON;