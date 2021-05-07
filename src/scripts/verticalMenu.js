const menu = document.querySelector('.menu');
const burgerBtn = document.querySelector('.burger');
const menuDirect = document.querySelectorAll('.menu__link');
const mainContent = document.querySelector('.main-content');

function overlayActive(){
	menu.classList.toggle('active');
	burgerBtn.classList.toggle('active');
	mainContent.classList.toggle('hidden');
};

burgerBtn.addEventListener("click", e => {
	overlayActive()
});

menuDirect.forEach(el => {
	el.addEventListener('click', e => {
		if (menu.classList.contains('active')) {
			overlayActive();
		} 
	});
});




