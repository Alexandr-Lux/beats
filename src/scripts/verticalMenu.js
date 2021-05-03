const fullscreenMenu = document.querySelector('.overlay');
const menu = document.querySelector('.menu');
const burgerBtn = document.querySelector('.burger');
const menuDirect = document.querySelectorAll('.menu__link');

window.addEventListener('load', () => {
	function overlayActive(){
		fullscreenMenu.classList.toggle('active');
		menu.classList.toggle('menu_vertical');
		burgerBtn.classList.toggle('active');
	};
	
	burgerBtn.addEventListener("click", function() {
		overlayActive()
	});
	
	menuDirect.forEach(e => {
		e.addEventListener('click', function() {
			if (fullscreenMenu.classList.contains('active')) {
				overlayActive();
			}
		});
	});
})




