import { getLocalStorage, showElement, hideElement } from "../timer-setting/timerSetting.js";
import { setButtonState, setTimerTextUI, setActionButtonDesign, actionBtn, resetBtn } from "./timer-button/timerButton.js";
import { renderProgressBar, resetProgressBar } from "./progress-bar/progressBar.js";
import { changeColorSnippet } from "/src/utils/changeTheme.js";

const clock = document.querySelector(".timer__clock");
const session = document.querySelector(".timer__session");
const prevArrow = document.querySelector(".arrow__prev");
const audio = document.querySelector(".timer__audio");
const progressBar = document.querySelector(".timer__progress-bar");
const progressSpinners = document.querySelectorAll(".loader-spinner");

let timerSettingInfo, minutes, seconds, timerId, currentRepeat;
let progressValue, maxProgressValue;


/** 타이머 리셋 */
const handleResetBtn = () => {
	// 타이머 관련 변수 초기화
	minutes = 0;
	seconds = 0;
	timerId = null;
	currentRepeat = 1;

	// Action 버튼 활성화
	if (actionBtn.classList.contains("disabled")) {
		showElement(prevArrow);// Timer-setting으로 넘어가는 화살표 활성화
		setActionButtonDesign("pause"); // pause에서 start로 변경
		setButtonState(actionBtn, "active");

	}

	// clock text를 rest에서 focus 모드로 변환
	if (clock.classList.contains("rest")) {

		setTimerTextUI(clock, "focus");
		setTimerTextUI(session, "focus");
	}

	progressValue = 0; // progress bar 값 초기화

	// 종료 시 버튼 UI
	resetBtn.style.backgroundColor = "#9e9e9e";
	changeColorSnippet(actionBtn, "backgroundColor", "main");

	showElement(progressBar);
	resetProgressBar();
	initializeTimer();
};


/** 타이머가 00:00일 때의 동작 */
const handleTimerEnd = () => {
	const { focus, rest, iteration } = timerSettingInfo;
	const timeEnd = minutes === 0 && seconds === 0;

	if (timeEnd && currentRepeat === parseInt(iteration)) {
		// 설정 반복 횟수 모두 달성한 경우
		clock.textContent = "Congratulations!";
		session.textContent = "-The End-";
		audio.src = `src/res/audio/Finish_sound.mp3`;
		audio.play();

		hideElement(progressBar);
		setButtonState(actionBtn, "disabled");
		setButtonState(resetBtn, "active");
		clearInterval(timerId); // 타이머 종료

		// 종료 시 버튼 UI
		actionBtn.style.backgroundColor = "#9e9e9e";
		changeColorSnippet(resetBtn, "backgroundColor", "sub");

	} else if (timeEnd) {
		if (!clock.classList.contains("rest")) {
			// focus에서 timeEnd인 경우
			minutes = rest;
			progressValue = 0;

			// rest 시작 사운드 재생
			audio.src = `src/res/audio/Rest_sound.mp3`;
			audio.play();

			progressSpinners.forEach(spinner => spinner.style.border = "5px solid #cdcfcee1");

			setTimerTextUI(clock, "rest");
			setTimerTextUI(session, "rest");
			resetProgressBar();

		} else {
			// rest에서 timeEnd인 경우
			minutes = focus;
			currentRepeat++;
			progressValue = 0; // progress bar 값 초기화
			session.textContent = `${currentRepeat} / ${iteration}`;

			// focus 시작 사운드 재생
			audio.src = `src/res/audio/Start_sound.mp3`;
			audio.play();

			progressSpinners.forEach(spinner => changeColorSnippet(spinner, "border-color", "main"));  // progress bar 색상

			setTimerTextUI(clock, "focus");
			setTimerTextUI(session, "focus");
			resetProgressBar();
		}
	}
};


/** 타이머 시작 */
const startTimer = () => {
	// 최초 시작 시, focus 사운드 재생
	if (!timerId) {
		audio.src = `src/res/audio/Start_sound.mp3`;
		audio.play();
	}

	// Timer 동작
	timerId = setInterval(() => {
		seconds--;
		progressValue += 1;

		if (seconds < 0) {
			minutes--;
			seconds = 59; // seconds 초기화
		}

		// timer clock 텍스트 설정 ... 2자리
		clock.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

		renderProgressBar(progressValue, maxProgressValue);
		handleTimerEnd();
	}, 1000);
};


/** 버튼의 UI를 변경하고 타이머 동작 컨트롤 */
const handleActionBtn = (e) => {
	const buttonText = e.target.textContent;

	if (buttonText === "start") {
		// action ~ start 버튼을 누른 경우
		hideElement(prevArrow); // 화살표 비활성화
		setActionButtonDesign(buttonText);
		setButtonState(resetBtn, "disabled");
		startTimer(); // 타이머 시작

	} else {
		// action ~ pause 버튼을 누른 경우
		showElement(prevArrow); // 화살표 활성화
		setActionButtonDesign(buttonText);
		setButtonState(resetBtn, "active");
		clearInterval(timerId); // 타이머 일시정지

		// 일시정지 상태 버튼 활성화 UI
		changeColorSnippet(actionBtn, "backgroundColor", "main");
		changeColorSnippet(resetBtn, "backgroundColor", "sub");
	}
};


/** 저장된 값으로 타이머 상태를 초기화 */
const initializeTimer = () => {
	const { focus, iteration } = timerSettingInfo;

	// timer 관련 변수 초기화
	minutes = 0;
	seconds = 0;
	timerId = null;
	currentRepeat = 1;

	clock.textContent = `${focus.padStart(2, '0')}:00`;
	session.textContent = `${currentRepeat} / ${iteration}`;
	minutes = focus; // 시간의 '분'을 focus 값으로 초기화

	progressValue = 0; // progress bar 값 초기화
	maxProgressValue = minutes * 60 + seconds; // 설정 시간에 따른 progress bar max값 설정

	setButtonState(resetBtn, "disabled");
	resetProgressBar();
};


/** Timer 컴포넌트에서, 저장된 값으로 타이머를 컨트롤한다. */
export default function loadTimer() {
	timerSettingInfo = getLocalStorage(); // localStorage에서 값 호출

	if (timerSettingInfo) {
		initializeTimer(); // 초기화
	}

	// 초기 상태 resetBtn 비활성화 UI
	if (resetBtn.classList.contains("disabled")) {
		resetBtn.style.backgroundColor = "#9e9e9e";
	}

	// 버튼(start, pause / reset)에 click 이벤트 할당
	actionBtn.addEventListener("click", handleActionBtn);
	resetBtn.addEventListener("click", handleResetBtn);
}