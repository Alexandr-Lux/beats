const tabs = document.querySelectorAll('.tabs__text-block');
const tabsList = document.querySelector('.tabs__list');

tabsList.addEventListener('click', (e) => {

	for (tab of tabs) {
		if (e.target === tab || tab.parentNode.classList.contains('active')) {
			tab.parentNode.classList.toggle('active');
		}
	}
});


