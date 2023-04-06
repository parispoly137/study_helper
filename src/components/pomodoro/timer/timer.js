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

		// timer clock 텍스트 설정 ... 2자리
		clock.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

		// 00:00이 되면 타이머 종료
		if (minutes === 0 && seconds === 0) {
			// clearInterval(timerId);
			minutes = timerInfo.rest;
		}
	}, 1000);
};

/** 타이머 리셋 */
const resetTimer = () => {
	minutes = 0;
	seconds = 0;
	timerId = null;
	nowRepeatNum = 0;
	initializeTimer();
};

/** 버튼의 UI를 변경하고 타이머 동작 컨트롤 */
const handleButton = () => {

	if (actionBtn.innerText === "start") {
		// start 버튼을 누르는 경우
		actionBtn.style.backgroundColor = "#ffc56c"; // action btn 배경색 변경
		actionBtn.innerText = "pause"; // action btn 텍스트 변경

		resetBtn.setAttribute("disabled", "disabled"); // reset btn 특성 변경
		resetBtn.classList.add("disabled"); // reset btn 비활성화

		prevArrow.style.display = 'none'; // Timer-setting으로 넘어가는 화살표 비활성화

		startTimer(); // 타이머 시작
	} else {
		// pause 버튼을 누르는 경우
		actionBtn.style.backgroundColor = "#00b050"; // action btn 배경색 변경
		actionBtn.innerText = "start"; // action btn 텍스트 변경

		resetBtn.removeAttribute("disabled"); // reset btn 특성 변경
		resetBtn.classList.remove("disabled"); // reset btn 활성화

		prevArrow.style.display = 'block'; // Timer-setting으로 넘어가는 화살표 활성화

		clearInterval(timerId); // 타이머 일시정지
	}
};


/** 저장된 값으로 타이머 상태를 초기화 */
const initializeTimer = () => {
	const { focus, iteration } = timerInfo;

	// timer 관련 정보 초기화
	minutes = 0;
	seconds = 0;
	timerId = null;
	nowRepeatNum = 0;

	clock.innerText = `${focus.padStart(2, '0')}:00`;
	session.innerText = `${nowRepeatNum} / ${iteration}`;
	minutes = focus; // 시간의 '분'을 focus 값으로 초기화
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

