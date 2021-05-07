const form = document.querySelector('.form');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal__text');
const modalBtn = document.querySelector('.modal__btn');

form.addEventListener('submit', e => {

	e.preventDefault();
	
	if (validateForm(form)) {
		const data = {
			name: form.elements.name.value,
			phone: form.elements.phone.value,
			street: form.elements.street.value,
			houseNum: form.elements.houseNum.value,
			apartmant: form.elements.apartmant.value,
			comment: form.elements.comment.value,
			to: 'test@mail.ru'
		}
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('post', 'https://webdev-api.loftschool.com/sendmail');
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.send(JSON.stringify(data));
		xhr.addEventListener('load', () => {
			modal.classList.add('active');
			modalText.textContent = xhr.response.message;
			if (xhr.response.status) {
				modalText.style.color = 'inherit';
			} else {
				modalText.style.color = '#E01F3D';
			};
		})
	};

	function validateForm(form) {
		let valid = true;
		 
		if (!validateField(form.elements.name)) {
			valid = false;
		}
		 
		if (!validateField(form.elements.phone)) {
			valid = false;
		}
		 
		if (!validateField(form.elements.street)) {
			valid = false;
		}
		 
		if (!validateField(form.elements.houseNum)) {
			valid = false;
		}
		 
		if (!validateField(form.elements.apartmant)) {
			valid = false;
		}

		if (!validateField(form.elements.comment)) {
			valid = false;
		}
		 
		return valid;
	};

	function validateField(field) {
		if (!field.checkValidity()) {
			field.style.border = '3px solid red'
			return false;
		} else {
			field.style.border = 'none'
			return true;
		}
	}
});

modalBtn.addEventListener('click', e => {
	e.preventDefault();
	modal.classList.remove('active')
})


