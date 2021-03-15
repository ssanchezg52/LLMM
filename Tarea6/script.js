const parteCentral = document.getElementById("parteCentro");
const tendenciaUno = document.getElementById("tendencia");
const tendenciaDos = document.getElementById("tendenciaDos");
const parteDerecha = document.getElementById("parteDerecha");

var openFile = function(event){
	var input = event.target;
	var reader =new FileReader();

	reader.onload = function(event){
		var text = reader.result;
		var XMLdocument = removeWhiteSpace(text);

		getDocumentXML(XMLdocument);
	};

	reader.readAsText(input.files[0]);

};

function getDocumentXML(xmlDocument){
	var parser = new DOMParser();
	var xmlDOM = parser.parseFromString(xmlDocument, "text/xml");
	addTweets(xmlDOM);
	addTendencia(xmlDOM);
	addSuggestions(xmlDOM);
}

function addTweets(xmlDoc){

		var listaTweets = xmlDoc.getElementsByTagName("tweet");

		for (var tweet = 0; tweet < listaTweets.length; tweet++) {

			var currentTweet = listaTweets[tweet];

			var miTweet = document.createElement("div");
			miTweet.classList.add("tweet");

			var user = document.createElement("div"); 
			user.classList.add("nombre");
			user.innerText = currentTweet.childNodes[0].firstChild.nodeValue;

			var username = document.createElement("div");
			username.classList.add("nombreUsuario");
			username.innerText = currentTweet.childNodes[1].firstChild.nodeValue;

			var text = document.createElement("div");
			text.classList.add("contenido");
			text.innerText = currentTweet.childNodes[2].firstChild.nodeValue;

			var contenedorImagen = document.createElement("div");
			contenedorImagen.classList.add("imagenTweet");

				var img = document.createElement("img");
				img.classList.add("imagen");
				if (currentTweet.childNodes[3].firstChild.nodeValue != "Vacio") {
					img.src = currentTweet.childNodes[3].firstChild.nodeValue;
				}

			miTweet.appendChild(user);
			miTweet.appendChild(username);
			miTweet.appendChild(text);
			contenedorImagen.appendChild(img);
			miTweet.appendChild(contenedorImagen);			

			parteCentral.appendChild(miTweet);

		}
}

function addTendencia(xmlDoc){

	var listaTendencia = xmlDoc.getElementsByTagName("tendencias");
	tendenciaUno.style.display = 'flex';

	for (var tendencias = 0; tendencias < listaTendencia.length; tendencias++) {
		
		var currentTendencia = listaTendencia[tendencias];

		var titleTendencia = document.createElement("div");
		titleTendencia.classList.add("tituloTendencia");
		titleTendencia.innerText = currentTendencia.childNodes[0].firstChild.nodeValue;

		var contenedorImagen = document.createElement("div");
		contenedorImagen.classList.add("imagenTendencia");

			var img = document.createElement("img");
			img.classList.add("imagenParteDerecha-tendencia");

			if (currentTendencia.childNodes[1].firstChild.nodeValue != "Vacio") {
				img.src = currentTendencia.childNodes[1].firstChild.nodeValue;
			}else{
				contenedorImagen.style.display = "none";
			}

		contenedorImagen.appendChild(img);
		if (tendencias !=0) {
			tendenciaDos.appendChild(titleTendencia);
			tendenciaDos.appendChild(contenedorImagen);

			tendenciaDos.style.display = 'flex';
		}else{
			tendenciaUno.appendChild(titleTendencia);
			tendenciaUno.appendChild(contenedorImagen);
		}
	

	}
}

function addSuggestions(xmlDoc){

	var listaSugerencia = xmlDoc.getElementsByTagName("sugerencia");

	for (var sugerencia = 0; sugerencia < listaSugerencia.length; sugerencia++) {
		
		var currentSugerencia = listaSugerencia[sugerencia];

		var miSugerencia = document.createElement("div");
		miSugerencia.classList.add("sugerencia");
		miSugerencia.style.display = 'flex';

		var contenedorImagen = document.createElement("div");
		contenedorImagen.classList.add("parteIzquierda-sugerencia");

			var img = document.createElement("img");
			img.classList.add("imagenPerfil");

			if (currentSugerencia.childNodes[0].firstChild.nodeValue != "Vacio") {
				img.src = currentSugerencia.childNodes[0].firstChild.nodeValue;
			}else{
				img.src = "imagenTwitter.PNG";
			}

		var contenedorUsuario = document.createElement("div");
		contenedorUsuario.classList.add("parteCentro-sugerencia");

			var user = document.createElement("div"); 
			user.classList.add("usuarioSugerencia");
			user.innerText = currentSugerencia.childNodes[1].firstChild.nodeValue;
 
 			var username = document.createElement("div");
 			username.classList.add("nombreUsuarioSugerencia");
 			username.innerText = currentSugerencia.childNodes[2].firstChild.nodeValue;

 			var contenedorBotonSeguir = document.createElement("div");
 			contenedorBotonSeguir.classList.add("parteDerecha-sugerencia");

 				var botonSeguir = document.createElement("a");
 				botonSeguir.href = "index.html";

 				var imagenBotonSeguir = document.createElement("img");
 				imagenBotonSeguir.classList.add("imagenParteDerecha");
 				imagenBotonSeguir.src = "SeguirTwitter.PNG";

 		contenedorImagen.appendChild(img);
 		contenedorUsuario.appendChild(user);
 		contenedorUsuario.appendChild(username);
 		botonSeguir.appendChild(imagenBotonSeguir);
 		contenedorBotonSeguir.appendChild(botonSeguir);
 		miSugerencia.appendChild(contenedorImagen);
 		miSugerencia.appendChild(contenedorUsuario);
 		miSugerencia.appendChild(contenedorBotonSeguir);

 		parteDerecha.appendChild(miSugerencia);
	}

}

function removeWhiteSpace(xmlDoc){
	xmlDoc = xmlDoc.replace(/>\s*/g, '>');  // Reemplaza el signo y todos los espacios en blanco a continuación "> " por ">" 
	xmlDoc = xmlDoc.replace(/\s*</g, '<');  // Reemplaza lo mismo pero con el otro signo "< " por "<"
	return xmlDoc;
}
