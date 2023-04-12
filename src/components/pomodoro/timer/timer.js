import { getLocalStorage, showElement, hideElement } from "../timer-setting/timer-setting.js";

const clock = document.querySelector(".timer__clock");
const session = document.querySelector(".timer__session");
const [actionBtn, resetBtn] = document.querySelectorAll(".timer__button");
const prevArrow = document.querySelector(".arrow__prev");
const audio = document.querySelector(".timer__audio");
const progressBar = document.querySelector(".timer__progress-bar");

const [spinnerOne, spinnerTwo, spinnerThree, spinnerFour] = document.querySelectorAll(".spinner-holder-two");

let timerInfo, minutes, seconds, timerId, nowRepeatNum;

let progressValue, maxProgressValue, percentage;


/** 타이머 리셋 */
const resetTimer = () => {
	// 타이머 관련 변수 초기화
	minutes = 0;
	seconds = 0;
	timerId = null;
	nowRepeatNum = 1;

	if (actionBtn.classList.contains("disabled")) {
		showElement(prevArrow);// Timer-setting으로 넘어가는 화살표 활성화
		setActionButtonDesign("start");
		setButtonState(actionBtn, "active");

	} else if (clock.classList.contains("rest")) {
		setTextState(clock, "focus");
		setTextState(session, "focus");
	}

	progressValue = 0; // progress bar 값 초기화

	showElement(progressBar);
	resetProgressBar();
	initializeTimer();
};


/** Timer의 텍스트(clock, session) UI 변경 */
const setTextState = (textName, targetState) => {
	if (targetState === "rest") {
		// rest UI
		textName.classList.add("rest");
		textName.style.color = "white";

	} else if (targetState === "focus") {
		// focus UI
		textName.classList.remove("rest");
		textName.style.color = "black";
	}
};


/** 현재 시간 진행도에 따른 progress bar 렌더링*/
const renderProgressBar = (percentage) => {
	let angle = 0;

	if (percentage < 25) {
		angle = -90 + (percentage / 100) * 360;

		spinnerOne.style.transform = `rotate(${angle}deg)`;

	} else if (percentage >= 25 && percentage < 50) {
		angle = -90 + ((percentage - 25) / 100) * 360;

		spinnerOne.style.transform = `rotate(0deg)`;
		spinnerTwo.style.transform = `rotate(${angle}deg)`;

	} else if (percentage >= 50 && percentage < 75) {
		angle = -90 + ((percentage - 50) / 100) * 360;

		spinnerTwo.style.transform = `rotate(0deg)`;
		spinnerThree.style.transform = `rotate(${angle}deg)`;

	} else if (percentage >= 75 && percentage <= 100) {
		angle = -90 + ((percentage - 75) / 100) * 360;

		spinnerThree.style.transform = `rotate(0deg)`;
		spinnerFour.style.transform = `rotate(${angle}deg)`;
	}
};


/** 타이머 시작 */
const startTimer = () => {
	// 최초 시작 시, focus 사운드 재생
	if (!timerId) {
		audio.src = `src/res/audio/Start_sound.mp3`;
		audio.play();
	}

	timerId = setInterval(() => {
		seconds--; // 초 감소

		if (seconds < 0) { // 초가 0보다 작아지면
			minutes--; // 분 감소
			seconds = 59; // 초를 59로 초기화
		}
		const { focus, rest, iteration } = timerInfo;
		const timeEnd = minutes === 0 && seconds === 0;

		// timer clock 텍스트 설정 ... 2자리
		clock.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

		// progress bar
		percentage = 0;

		if (progressValue < maxProgressValue) {
			progressValue += 1;
			percentage = (progressValue * 100) / maxProgressValue;
			renderProgressBar(percentage);
		}

		// 00:00일 때
		if (timeEnd && nowRepeatNum === Number(iteration)) {
			// 설정 반복 횟수 모두 달성한 경우
			clock.innerText = "Congratulations!";
			session.innerText = "-The End-";
			audio.src = `src/res/audio/Finish_sound.mp3`;
			audio.play();

			hideElement(progressBar);
			clearInterval(timerId); // 타이머 종료
			setButtonState(actionBtn, "disabled");
			setButtonState(resetBtn, "active");

		} else if (timeEnd) {
			const progressSpinners = document.querySelectorAll(".loader-spinner");

			if (!clock.classList.contains("rest")) {
				// focus에서 timeEnd인 경우
				minutes = rest;
				progressValue = 0;

				// rest 시작 사운드 재생
				audio.src = `src/res/audio/Rest_sound.mp3`;
				audio.play();

				setTextState(clock, "rest");
				setTextState(session, "rest");
				resetProgressBar();
				progressSpinners.forEach(spinner => spinner.style.border = "5px solid #cdcfcee1");

			} else {
				// rest에서 timeEnd인 경우
				minutes = focus;
				nowRepeatNum++;
				progressValue = 0; // progress bar 값 초기화
				session.innerText = `${nowRepeatNum} / ${iteration}`;

				// focus 시작 사운드 재생
				audio.src = `src/res/audio/Start_sound.mp3`;
				audio.play();

				setTextState(clock, "focus");
				setTextState(session, "focus");
				resetProgressBar();
				progressSpinners.forEach(spinner => spinner.style.border = "5px solid #00b050");  // progress bar 색상
			}
		}
	}, 1000);
};


/** action button의 UI 변경 */
const setActionButtonDesign = (targetState) => {
	if (targetState === "start") {
		// action button ... start UI
		actionBtn.style.backgroundColor = "#00b050";
		actionBtn.innerText = "start";

	} else if (targetState === "pause") {
		// action button ... pause UI
		actionBtn.style.backgroundColor = "#ffc56c";
		actionBtn.innerText = "pause";
	}
};


/** 버튼의 UI를 변경하고 타이머 동작 컨트롤 */
const handleButton = () => {
	if (actionBtn.innerText === "start") {
		hideElement(prevArrow); // 화살표 비활성화
		setActionButtonDesign("pause");
		setButtonState(resetBtn, "disabled");
		startTimer(); // 타이머 시작

	} else {
		showElement(prevArrow); // 화살표 활성화
		setActionButtonDesign("start");
		setButtonState(resetBtn, "active");
		clearInterval(timerId); // 타이머 일시정지
	}
};


/** progress bar를 초기화*/
const resetProgressBar = () => {
	spinnerOne.style.transform = `rotate(90deg)`;
	spinnerTwo.style.transform = `rotate(90deg)`;
	spinnerThree.style.transform = `rotate(90deg)`;
	spinnerFour.style.transform = `rotate(90deg)`;
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
	const { focus, iteration } = timerInfo;

	// timer 관련 변수 초기화
	minutes = 0;
	seconds = 0;
	timerId = null;
	nowRepeatNum = 1;

	clock.innerText = `${focus.padStart(2, '0')}:00`;
	session.innerText = `${nowRepeatNum} / ${iteration}`;
	minutes = focus; // 시간의 '분'을 focus 값으로 초기화

	progressValue = 0; // progress bar 값 초기화
	maxProgressValue = minutes * 60 + seconds; // 설정 시간에 따른 progress bar max값 설정

	setButtonState(resetBtn, "disabled");
	resetProgressBar();
};


/** Timer 컴포넌트에서, 저장된 값으로 타이머를 컨트롤한다. */
export default function loadTimer() {
	timerInfo = getLocalStorage(); // localStorage에서 값 호출

	if (timerInfo) {
		initializeTimer(); // 초기화
	}

	// 버튼(start, pause / reset)에 click 이벤트 할당
	actionBtn.addEventListener("click", handleButton);
	resetBtn.addEventListener("click", resetTimer);
}