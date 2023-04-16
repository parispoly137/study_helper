const body = document.body;
const changeThemeButton = document.querySelector(".header__btn-theme");

let num = 1;

const changeTheme = (e) => {
	e.preventDefault();

	if (num !== 3) {
		num = (num + 1) % 4;
	} else {
		num = 1;
	}

	body.style.backgroundImage = ` url('/src/res/imgs/background_0${num}.jpg')`;

};

function loadChangeTheme() {
	changeThemeButton.addEventListener("click", changeTheme);
}

loadChangeTheme();