const clock = document.querySelector(".timer__clock");
const session = document.querySelector(".timer__session");
const actionBtn = document.querySelector(".timer__button:first-of-type");
const resetBtn = document.querySelector(".timer__button:last-of-type");
const prevArrow = document.querySelector(".arrow__prev");

let timerInfo;
let minutes;
let seconds;
let timerId;
let nowRepeatNum;

/** 타이머 시작 */
const startTimer = () => {
	timerId = setInterval(() => {
		seconds--; // 초 감소

		if (seconds < 0) { // 초가 0보다 작아지면
			minutes--; // 분 감소
			seconds = 59; // 초를 59로 초기화
		}
		const { rest, iteration } = timerInfo;
		const timeEnd = minutes === 0 && seconds === 0;

		// timer clock 텍스트 설정 ... 2자리
		clock.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

		// 00:00일 때
		if (timeEnd && nowRepeatNum === Number(iteration) - 1) {
			// 설정 반복 횟수 모두 달성한 경우
			clock.innerText = "Congratulations!";
			session.innerText = "-The End-";

			clearInterval(timerId); // 타이머 종료
			setButtonState(actionBtn, "disabled");
			setButtonState(resetBtn, "active");
		} else if (timeEnd) {
			minutes = rest;
			nowRepeatNum++;
			session.innerText = `${nowRepeatNum} / ${iteration}`;
		}
	}, 10);
};

/** 타이머 리셋 */
const resetTimer = () => {
	minutes = 0;
	seconds = 0;
	timerId = null;
	nowRepeatNum = 0;

	if (actionBtn.classList.contains("disabled")) {
		actionBtn.style.backgroundColor = "#00b050";
		actionBtn.innerText = "start"; // 텍스트
		prevArrow.style.display = 'block'; // Timer-setting으로 넘어가는 화살표 활성화

		setButtonState(actionBtn, "active");
	}
	initializeTimer();
};

/** 버튼의 활성/비활성화를 바꿔주는 함수. */
const setButtonState = (buttonName, targetState) => {
	if (targetState === "disabled") {
		buttonName.setAttribute("disabled", "disabled"); // btn 비활성화
		buttonName.classList.add("disabled"); // btn 비활성화 UI
	} else {
		buttonName.removeAttribute("disabled"); // btn 활성화
		buttonName.classList.remove("disabled"); // btn 활성화 UI
	}
};

/** 버튼의 UI를 변경하고 타이머 동작 컨트롤 */
const handleButton = () => {
	if (actionBtn.innerText === "start") {
		// start 버튼을 누르는 경우
		actionBtn.style.backgroundColor = "#ffc56c"; // action btn 배경색 변경
		actionBtn.innerText = "pause"; // action btn 텍스트 변경
		prevArrow.style.display = 'none'; // Timer-setting으로 넘어가는 화살표 비활성화

		setButtonState(resetBtn, "disabled");
		startTimer(); // 타이머 시작
	} else {
		// pause 버튼을 누르는 경우
		actionBtn.style.backgroundColor = "#00b050"; // action btn 배경색 변경
		actionBtn.innerText = "start"; // action btn 텍스트 변경
		prevArrow.style.display = 'block'; // Timer-setting으로 넘어가는 화살표 활성화

		setButtonState(resetBtn, "active");
		clearInterval(timerId); // 타이머 일시정지
	}
};

/** 저장된 값으로 타이머 상태를 초기화 */
const initializeTimer = () => {
	const { focus, iteration } = timerInfo;

	// timer 관련 변수 초기화
	minutes = 0;
	seconds = 0;
	timerId = null;
	nowRepeatNum = 0;

	clock.innerText = `${focus.padStart(2, '0')}:00`;
	session.innerText = `${nowRepeatNum} / ${iteration}`;
	minutes = focus; // 시간의 '분'을 focus 값으로 초기화

	setButtonState(resetBtn, "disabled");
};

/** LocalStorage에서 timer-setting 정보를 가져오는 함수 */
const getLocalStorage = () => {
	const timerInfoJSON = localStorage.getItem("timer-setting");
	timerInfo = JSON.parse(timerInfoJSON); // timerInfo에 값 저장
};

/** Timer 컴포넌트에서, 저장된 값으로 타이머를 컨트롤한다. */
export default function loadTimer() {
	getLocalStorage(); // localStorage에서 값 호출
	initializeTimer(); // 초기화

	// 버튼(start, pause / reset)에 click 이벤트 할당
	actionBtn.addEventListener("click", handleButton);
	resetBtn.addEventListener("click", resetTimer);
}

