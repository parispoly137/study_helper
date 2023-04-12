import { getLocalStorage, showElement, hideElement } from "../timer-setting/timer-setting.js";

const clock = document.querySelector(".timer__clock");
const session = document.querySelector(".timer__session");
const [actionBtn, resetBtn] = document.querySelectorAll(".timer__button");
const prevArrow = document.querySelector(".arrow__prev");
const audio = document.querySelector(".timer__audio");
const progressBar = document.querySelector(".timer__progress-bar");
const progressSpinners = document.querySelectorAll(".loader-spinner");

let timerSettingInfo, minutes, seconds, timerId, currentRepeat;

let progressValue, maxProgressValue;


/** 타이머 리셋 */
const resetTimer = () => {
	// 타이머 관련 변수 초기화
	minutes = 0;
	seconds = 0;
	timerId = null;
	currentRepeat = 1;

	if (actionBtn.classList.contains("disabled")) {
		showElement(prevArrow);// Timer-setting으로 넘어가는 화살표 활성화
		setActionButtonDesign("pause"); // pause에서 start로 변경
		setButtonState(actionBtn, "active");

	} else if (clock.classList.contains("rest")) {
		setTimerTextUI(clock, "focus");
		setTimerTextUI(session, "focus");
	}

	progressValue = 0; // progress bar 값 초기화

	showElement(progressBar);
	resetProgressBar();
	initializeTimer();
};


/** Timer의 텍스트(clock, session) UI 변경 */
const setTimerTextUI = (textName, targetState) => {
	const isRest = targetState === "rest";

	textName.classList.toggle("rest", isRest);
	textName.style.color = isRest ? "white" : "black";
};


/** 현재 시간 진행도에 따른 progress bar 렌더링*/
const renderProgressBar = () => {
	let percentage, progressIndex, angle = 0;

	progressValue += 1;
	percentage = (progressValue * 100) / maxProgressValue;
	progressIndex = Math.floor(percentage / 25) - Math.floor(percentage / 100);
	angle = -90 + (((percentage - (25 * progressIndex)) / 100)) * 360;

	// angle 반영하여 progress bar 진행 UI 적용
	const spinner = document.querySelectorAll(".spinner-holder-two")[progressIndex]; // caching
	spinner.style.transform = `rotate(${angle}deg)`;

	if (progressIndex !== 0) {
		const prevSpinner = document.querySelectorAll(".spinner-holder-two")[progressIndex - 1];
		prevSpinner.style.transform = "rotate(0deg)";
	}
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

			progressSpinners.forEach(spinner => spinner.style.border = "5px solid #00b050");  // progress bar 색상

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

		if (seconds < 0) {
			minutes--;
			seconds = 59; // seconds 초기화
		}

		// timer clock 텍스트 설정 ... 2자리
		clock.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

		renderProgressBar();
		handleTimerEnd();
	}, 1000);
};


/** action button의 UI 변경 ... (arg: currentText) */
const setActionButtonDesign = (buttonText) => {
	const isStart = buttonText === "start";

	actionBtn.textContent = isStart ? "pause" : "start";
	actionBtn.style.backgroundColor = isStart ? "#ffc56c" : "#00b050";
};


/** 버튼의 UI를 변경하고 타이머 동작 컨트롤 */
const handleButton = (e) => {
	const buttonText = e.target.textContent;

	if (buttonText === "start") {
		hideElement(prevArrow); // 화살표 비활성화
		setActionButtonDesign(buttonText);
		setButtonState(resetBtn, "disabled");
		startTimer(); // 타이머 시작

	} else {
		showElement(prevArrow); // 화살표 활성화
		setActionButtonDesign(buttonText);
		setButtonState(resetBtn, "active");
		clearInterval(timerId); // 타이머 일시정지
	}
};


/** progress bar를 초기화*/
const resetProgressBar = () => {
	const spinners = [...document.querySelectorAll(".spinner-holder-two")];
	spinners.forEach(spinner => spinner.style.transform = "rotate(90deg)");
};


/** 버튼(action, reset)의 상태 변경 */
const setButtonState = (buttonName, targetState) => {
	if (targetState === "disabled") {
		// button 기능 및 UI 비활성화
		buttonName.setAttribute("disabled", "disabled");
		buttonName.classList.add("disabled");

	} else if (targetState === "active") {
		// button 기능 및 UI 활성화
		buttonName.removeAttribute("disabled");
		buttonName.classList.remove("disabled");
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

	// 버튼(start, pause / reset)에 click 이벤트 할당
	actionBtn.addEventListener("click", handleButton);
	resetBtn.addEventListener("click", resetTimer);
}