const boton = document.getElementById("boton");
const contenido = document.getElementById("elemento");

boton.onclick = repeticion;

function borrarElemento(elemento){
	elemento.remove();
}

function repeticion() {
	setInterval(insertarGlobos,1000);
}

function insertarGlobos() {
	boton.remove();
	contenido.remove();
	const globos = document.createElement('div');
	globos.classList.add('globo');
	globos.innerHTML = "🎈";
	globos.style.left = Math.random() * 100 + "vh";
	globos.style.animationDuration = Math.random() * 2 +3+"s";
	document.body.appendChild(globos);
	setTimeout(borrarElemento, 4000, globos);

}




