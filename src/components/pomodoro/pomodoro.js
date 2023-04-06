import loadSetTimer from "./timer-setting/timer-setting.js";
import loadTimer from "./timer/timer.js";

const slider = document.querySelector(".pomodoro__slider");
const sliderBtns = document.querySelectorAll(".pomodoro__arrow");

const handleSlide = (e) => {
	e.preventDefault();
	sliderBtns.forEach(btn => btn.classList.remove("hidden"));

	const sliderBtn = e.target;

	// 화살표 버튼에 따른 기능(슬라이더)
	if (sliderBtn.classList.contains("arrow__next")) {
		slider.style.transform = "translate(-500px)";
	} else {
		slider.style.transform = "translate(0px)";
	}
	sliderBtn.classList.add("hidden");

};

// 화살표 버튼들에 이벤트리스너 할당
sliderBtns.forEach(btn => btn.addEventListener("click", handleSlide));

// 새로고침 시, 경고창
window.onbeforeunload = function (e) {
	e.preventDefault();
	return;
};

loadSetTimer(); // timer-setting 컴포넌트 로드
loadTimer(); // timer 컴포넌트 로드
