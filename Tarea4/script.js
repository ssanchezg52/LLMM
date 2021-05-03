const parteIzquierda = document.getElementById("parteIzquierda");
const parteArriba = document.getElementById("parteArriba");
const parteAbajo = document.getElementById("parteAbajo");
const url = "https://raw.githubusercontent.com/ssanchezg52/LLMM/main/informacionTiempo.json";

async function fetchJSON(url) {
	const respuesta = await fetch(url);
	const data = await respuesta.json();
	return data;
}

fetchJSON(url)
	.then(json => {
		const tiempoHoy = json.TiempoCiudad[0];

		parteIzquierda.innerHTML = 
			`
			<img src=${tiempoHoy.EstadoDelDia.icono} class="img-dia-actual">
			<h3 class="temperatura-dia-actual"> ${tiempoHoy.Temperatura}</h3>
			<h2 class="estado-nombre"> ${tiempoHoy.EstadoDelDia.nombre}</h2>
			<h2 class="ciudad"> ${json.NombreCiudad} </h2>
			`
			;

		for (const tiempo of json.TiempoCiudad) {
			if (tiempo != tiempoHoy) {
				const diaSiguiente = document.createElement("div");
				diaSiguiente.classList.add("diaUno");
				diaSiguiente.innerHTML = 
			`
			<div> <h2> Dia ${tiempo.Dia} </h2> </div>
			<img src=${tiempo.EstadoDelDia.icono} class="img-iconosSiguientes">
			<div> <h3> ${tiempo.Temperatura} </h3>			
			`
			;
			parteArriba.appendChild(diaSiguiente);
			}
		}

		parteAbajo.innerHTML = 
			`
			<div class="viento">
				<div> <h1> Viento  </h1> </div>
				<div> <h1> ${tiempoHoy.Viento + tiempoHoy.UnidadDeMedida} </h1> </div>
			</div>
			<div class="humedad">
				<div> <h1> Humedad </h1> </div>
				<div> <h1> ${tiempoHoy.Humedad} </h1> </div>		
			</div>
			`
			;


	});
	