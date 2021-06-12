let menu = document.querySelector(".menu_navegacion");

window.addEventListener("scroll", () => {
	cambiarColorMenu();
});

function cambiarColorMenu() {
	if (window.scrollY != 0) {
		menu.style.backgroundColor = '#0B0B0A';
	}else {
		menu.style.backgroundColor = 'transparent';
       
	}
}
	

