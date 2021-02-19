boton.onclick = insertarTexto;
let MiArray = [];

function insertarTexto(){

const boton = document.getElementById("boton");
const nombre = document.getElementById("Nombre");
const apellidos = document.getElementById("Apellidos");
const dni = document.getElementById("DNI");
const situacionLaboral = document.getElementById("Select");
const hobby = document.getElementsByName("Hobby");
const fecha = document.getElementById("Date");
const condiciones = document.getElementById("Condiciones");
let resultado = document.getElementById("resultado");
const textarea = document.getElementById("textarea");


let hobbyElegido = "";
let aceptaCondiciones = "No";


	for (let i = 0, length = hobby.length; i < length; i++) {
		if (hobby[i].checked) {
			hobbyElegido = hobby[i];
			break;
		}
	}

	if (condiciones.checked){
		aceptaCondiciones = "Si";
	}

	textarea.style.display = "block";

resultado.value = "Nombre: " + nombre.value + 
", Apellido: " + apellidos.value + 
", DNI: " + dni.value + 
", Ocupacion: " + situacionLaboral.value + 
", Hobby: " + hobbyElegido.value + 
", Fecha de nacimiento: " + fecha.value + 
" y ¿acepta condiciones? " + aceptaCondiciones;

MiArray.push(resultado.value);
console.log(MiArray); 

return false;

}



