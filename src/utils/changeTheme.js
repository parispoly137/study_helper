const body = document.body;
const headerBtns = document.querySelectorAll(".header__btn");
const changeThemeButton = document.querySelector(".header__btn-theme");

// Pomodoro 관련 DOM
const pomodoroSlides = document.querySelectorAll(".pomodoro__slide");
const pomodoroConfirmedTexts = document.querySelectorAll(".timer-setting__confirm-text");
const progressBars = document.querySelectorAll(".loader-spinner");
const timerSettingBtns = document.querySelectorAll(".timer-setting__button");
const timerBtns = document.querySelectorAll(".timer__button");

// To Do List 관련 DOM
const toDoList = document.querySelector(".todolist");

// Brainwave 관련 DOM
const brainwaveButtons = document.querySelectorAll(".brainwave__button");


// 테마 색상 객체
const themeColor = {
	green: {
		main: "#00b050",
		sub: "#92d050",
		header: "#a8e088"
	},
	aqua: {
		main: "#0070c0",
		sub: "#2c7cd4",
		header: "#82bae0"
	},
	deepBlue: {
		main: "#1f4e79",
		sub: "#203864",
		header: "#252525"
	},
};

const theme = Object.keys(themeColor); // 테마 배열
const themeCommonProps = Object.keys(themeColor.green); // 테마 상세 특성

let themeIndex = 0; // 테마 인덱스


/** 색상 변경 snippet */
const changeColorSnippet = (element, target, changeTo) => {
	element.style[target] = themeColor[theme[themeIndex]][changeTo];
};


/** 이미지 변경 snippet */
const changeImageSnippet = (element, target) => {
	element.style.backgroundImage = `url('/src/res/imgs/${target}_${themeIndex + 1}.jpg')`;
};


/** 컴포넌트의 텍스트 색상 변경 */
const changeTextColor = () => {
	// header ~ buttons
	headerBtns.forEach(btn => {
		if (themeIndex !== 2) {
			btn.style.color = "black";
		} else {
			btn.style.color = "#bfbfbf";
		}
	});

	// timer setting ~ confirmed texts
	pomodoroConfirmedTexts.forEach(text => changeColorSnippet(text, "color", "main"));

	// brainwave ~ buttons
	brainwaveButtons.forEach(btn => {
		if (!btn.classList.contains("active")) {
			changeColorSnippet(btn, "color", "main");
		}
	});
};


/** 요소의 배경색 변경 */
const changeBackgroundColor = () => {
	// header ~ buttons
	headerBtns.forEach(btn => {
		changeColorSnippet(btn, "backgroundColor", "header");
		btn.style.border = themeIndex !== 2 ? null : "1px solid #e6e2e1";
	});

	// timer setting ~ buttons
	timerSettingBtns.forEach((btn, i) => {
		if (!btn.classList.contains("disabled")) {
			changeColorSnippet(btn, "backgroundColor", themeCommonProps[i]);
		} else {
			btn.style.backgroundColor = "#9e9e9e";
		}
	});

	// timer ~ progress bar
	progressBars.forEach(bar => {
		changeColorSnippet(bar, "border-color", "main");
	});


	// timer ~ buttons
	timerBtns.forEach((btn, i) => {
		if (!btn.classList.contains("disabled")) {
			changeColorSnippet(btn, "backgroundColor", themeCommonProps[i]);
		} else {
			btn.style.backgroundColor = "#9e9e9e";
		}
	});

	// brainwave ~ buttons
	brainwaveButtons.forEach(btn => {
		if (btn.classList.contains("active")) {
			changeColorSnippet(btn, "backgroundColor", "main");
		}
	});
};


/** theme index에 맞춰 Image 변경 */
const changeBackgroundImages = () => {
	// body
	changeImageSnippet(body, "main-bg");

	// pomodoro
	pomodoroSlides.forEach(slide => {
		changeImageSnippet(slide, "pomodoro-bg");
	});

	// toDoList
	changeImageSnippet(toDoList, "todolist-bg");
};


/** change theme 버튼 클릭 시 실행 */
const handleChangeTheme = (e) => {
	e.preventDefault();

	// 클릭 시 테마 인덱스 증가 - 조건부 초기화
	themeIndex = themeIndex < 2 ? themeIndex + 1 : 0;

	changeBackgroundImages();
	changeBackgroundColor();
	changeTextColor();
};


/** change theme */
function loadChangeTheme() {
	changeThemeButton.addEventListener("click", handleChangeTheme);
}


loadChangeTheme();


export { themeColor, themeIndex, changeColorSnippet };