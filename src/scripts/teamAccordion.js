const teamName = document.querySelectorAll('.team-card__name');
const teamArea = document.querySelector('.team__list');

teamArea.addEventListener('click', (e) => {
	for (btn of teamName) {
		if (e.target === btn || btn.parentNode.classList.contains('active')) {
			btn.parentNode.classList.toggle('active');
		}
	}
});