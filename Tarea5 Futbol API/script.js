let parteIzquierdaMenu = document.getElementById("parteIzquierda");
let parteDerecha = document.getElementById("parteDerecha");
let menuLiga = document.getElementById("menuLiga");
let flecha = document.getElementById("Flecha");
let bloqueUno = document.getElementById("bloqueUno");
let contenedorBuscador = document.getElementById("contenedorBuscador");
let buscador = document.querySelector(".buscador");
let lupa = document.querySelector(".contenedorIcono");
let heightScreen = window.innerHeight - 200;
let contenedorLigas = document.getElementById("contenedorLigas");
let url = "https://www.scorebat.com/video-api/v1/";
let vectorLigas = [];
let igual = false;

window.onload = cambiarFlecha;

async function fetchJSON(url) {
	const respuesta = await fetch(url);
	const data = await respuesta.json();
	return data;
}

fetchJSON(url)
	.then(json => {
		for (const competiciones of json) {
			let LigaCompeticion = competiciones.competition.name;
			
			igual = isRepetido(LigaCompeticion);

			if (igual == false) {
			vectorLigas.push(LigaCompeticion);
			let liga = document.createElement("div");
			liga.classList.add("tipoLigas");
			
			liga.innerHTML = 
			`
			<a href="#${LigaCompeticion}"> <h4> ${LigaCompeticion} </h4> </a>
			`	
			; 
			
			contenedorLigas.appendChild(liga);
			
			let contenedorPartidos = document.createElement("div");
			contenedorPartidos.classList.add("contenedorPartidos");
			contenedorPartidos.innerHTML = 
			`
			<div class="liga" id="${LigaCompeticion}"> 
				<h1> ${LigaCompeticion} </h1> 
			</div> 
			<div class="partidos">

			</div>
			`
			bloqueUno.appendChild(contenedorPartidos);
			}
			igual = false;	
		}
	
		let contenedorPartidos = document.getElementsByClassName("contenedorPartidos");
		for(const partidos of json) {
			for (var i = 0; i < contenedorPartidos.length; i++) {
				if (partidos.competition.name == contenedorPartidos[i].getElementsByClassName("liga")[0].outerText) {
					let conjuntoPartidos = contenedorPartidos[i].getElementsByClassName("partidos")[0];
					let tarjetaPartido = document.createElement("div");
					let cadenaFechaYHora = partidos.date;
					let fecha = cadenaFechaYHora.substring(0, 10);
					let hora = cadenaFechaYHora.substring(11, 16);
					tarjetaPartido.classList.add("cartaPartido");
					tarjetaPartido.innerHTML = 
					`
					<div class="ContenedorFechaHora">
						<div class="fecha"> 
							<h6> ${fecha} </h6> 
						</div> 
						<div class="hora"> 
							<h6> ${hora} </h6> 
						</div>
					</div>
					<div class="equipoLocal">
						<a href="${partidos.side1.url}" target="_blank"> <h5> ${partidos.side1.name} </h5> </a>
					</div>
					<div class="InfoResultado">
						<div class="InfoPartido">
							<h5> ${isEnVivo(partidos)} </h5>
						 </div>
						 <div class="resultado">
						 	<a href="${partidos.url}" target="_blank"> <h5> Estadisticas </h5> </a> 
						 </div>
					</div>
					<div class="equipoVisitante">
						<a href="${partidos.side2.url}" target="_blank"> <h5> ${partidos.side2.name} </h5> </a>
					</div>
					`
					;
					contenedorPartidos[i].appendChild(tarjetaPartido);
					conjuntoPartidos.appendChild(tarjetaPartido);
				}
			}
			
		}

	});

function isRepetido(liga) {
	for (var i = 0; i < vectorLigas.length && igual == false; i++) {
		if (liga == vectorLigas[i]) {
			igual = true;
		}	
	}
	return igual;
}

function isEnVivo(partido) {
	for(const infoPartido of partido.videos) {
		if (infoPartido.title == "Highlights") {
		return "Finalizado"
		}
	}
	return "En Vivo";
	
}

contenedorBuscador.addEventListener('submit', function(event) {
	event.preventDefault();
	
	buscarEquipoDeseado();
});

lupa.addEventListener('onclick', function(event) {
	event.preventDefault();
	
	buscarEquipoDeseado();
});
/*
buscador.addEventListener('keydown', () =>  {
	
	buscarEquipoDeseado();
})
*/
function buscarEquipoDeseado() {
	fetchJSON(url).then(json => {
		let contenedorPartidos = document.getElementsByClassName("contenedorPartidos");
		
		for (var i = 0; i < contenedorPartidos.length; i++) {
			
			let cartasPartido = contenedorPartidos[i].getElementsByClassName("partidos")[0].getElementsByClassName("cartaPartido");
			
				for (var j = 0; j < cartasPartido.length; j++) {
					let equipoLocal = cartasPartido[j].getElementsByClassName("equipoLocal")[0].innerText;
					let equipoVisitante = cartasPartido[j].getElementsByClassName("equipoVisitante")[0].innerText;
					
					if (buscador.value == "") {
						contenedorPartidos[i].style.display = 'block';
						cartasPartido[j].style.display = 'flex';
					}
					else{
						if (equipoLocal.toLowerCase().trim() == buscador.value.toLowerCase() || equipoVisitante.toLowerCase().trim() == buscador.value.toLowerCase()) {
							cartasPartido[j].style.display = 'flex';
						}else{
							cartasPartido[j].style.display = 'none';
						}
				}
				
			}
			if (!thereIsFlex(cartasPartido)) {
					contenedorPartidos[i].style.display = 'none';
				}else{
					contenedorPartidos[i].style.display = 'block';
				}
		}
		
	});
}

function thereIsFlex(cartasPartido){
	let resultado = false;
	for (var i = 0; i < cartasPartido.length && resultado == false; i++) {
		if (cartasPartido[i].style.display == 'flex') {
			resultado = true;
		}
	}
	return resultado;
}

window.addEventListener('scroll', () => {
		if (window.scrollY >= heightScreen ) {
			parteIzquierdaMenu.style.display = 'flex';
			if (menuLiga.style.display == 'none') {
				contenedorBuscador.style.display = 'flex';
			}
			if (window.innerWidth <= '850') {
				bloqueUno.style.marginLeft = '0%';
			}else{
				bloqueUno.style.marginLeft = '15%';
			}
			if (isCambioflecha()) {
				cambioPosicionFlechaRightLeft();
			}
		}else{
			parteIzquierdaMenu.style.display = 'none';
			contenedorBuscador.style.display = 'none';
			menuLiga.style.display = 'none';
			parteDerecha.style.marginLeft = "0%";
			bloqueUno.style.marginLeft = '0%';

			if (menuLiga.style.display == 'none') {
				flecha.innerHTML = " ▶ ";
			}

			if (isCambioflecha()) {
				cambioPosicionFlechaUpDown();
			}
		}
	});

window.addEventListener('resize', () => {
	if (window.innerWidth > '850' && window.scrollY >= heightScreen) {
		parteIzquierdaMenu.style.display = 'flex';
		bloqueUno.style.marginLeft = '15%';
		if (isCambioflecha()) {
			cambioPosicionFlechaRightLeft();
		}
	}
	else if (window.innerWidth <= '850' && window.scrollY >= heightScreen)  {
		parteIzquierdaMenu.style.display = 'flex';
		bloqueUno.style.marginLeft = '0%';
		if (isCambioflecha()) {
			cambioPosicionFlechaUpDown();
		}
	}
	
});


function isCambioflecha() {
	if (window.innerWidth > '850') {
		if (flecha.innerText == "▶" || flecha.innerText == "◀") {
			return false;
		}else{
			return true
		}
	}else{
		if (flecha.innerText == "▼" || flecha.innerText == "▲") {
			return false;
		}else{
			return true
		}
	}
}

function cambioPosicionFlechaRightLeft() {
	if (menuLiga.style.display == 'flex') {
		flecha.innerText = "▶";
	}else{
		flecha.innerText = "◀";
	}
	
}

function cambioPosicionFlechaUpDown() {
	if (menuLiga.style.display == 'flex') {
		flecha.innerText = "▲";
	}else{
		flecha.innerText = "▼";
	}
}

function mostrarUOcultarMenuLigas() {
	if (menuLiga.style.display == "flex") {
		menuLiga.style.display = 'none';
		contenedorBuscador.style.display = 'flex';
		cambiarFlecha();
	}else {
		menuLiga.style.display = 'flex';
		contenedorBuscador.style.display = 'none';
		cambiarFlecha();
	}
};

function cambiarFlecha() {
	if (window.innerWidth > '850') {
		if (flecha.innerText == "▶") {
			flecha.innerText = "◀";
		}else{
			flecha.innerText = "▶";
		}
	}else{
		if (flecha.innerText == "▲") {
			flecha.innerText = "▼";
		}else{
			flecha.innerText = "▲";
		}
	}		
	
}






	
