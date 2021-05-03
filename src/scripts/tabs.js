const tabs = document.querySelectorAll('.tabs__text-block');
const tabsList = document.querySelector('.tabs__list');
const colorsTitle = document.querySelector('.colors__title');

tabsList.addEventListener('click', (e) => {

	for (tab of tabs) {
		if (e.target === tab || e.target === tab.childNodes[1] || tab.parentNode.classList.contains('active')) {
			tab.parentNode.classList.toggle('active');
			colorsTitle.innerHTML = 'меню';
		}
	}
});


