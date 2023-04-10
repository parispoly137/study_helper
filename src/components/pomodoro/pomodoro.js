import loadTimerSetting from "./timer-setting/timer-setting.js";
import loadTimer from "./timer/timer.js";

const slider = document.querySelector(".pomodoro__slider");
const sliderBtns = document.querySelectorAll(".pomodoro__arrow");


/** 새로고침 시, 사용자에게 경고창으로 확인 */
const confirmRefresh = () => {
	let warningDisplayed = false;

	window.onbeforeunload = function (e) {
		e.preventDefault();

		// 경고창 중복 출력 방지
		if (!warningDisplayed) {
			warningDisplayed = true;
			return "";
		}
	};
};


/** 컴포넌트 전환 (timer-setting ↔ timer) */
const handleSlide = (e) => {
	const sliderBtn = e.target;

	e.preventDefault();
	sliderBtns.forEach(btn => btn.classList.remove("hidden")); // visibility 초기화

	if (sliderBtn.classList.contains("arrow__next")) {
		slider.style.transform = "translate(-500px)"; // timer 컴포넌트로 전환
	} else {
		slider.style.transform = "translate(0px)"; // timer-setting 컴포넌트로 전환
	}
	sliderBtn.classList.add("hidden");
};

/** pomodoro 초기 시작 함수 */
function loadPomodoro() {
	sliderBtns.forEach(btn => btn.addEventListener("click", handleSlide));

	confirmRefresh();
	loadTimerSetting();
	loadTimer();
}

loadPomodoro();