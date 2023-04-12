import loadTimer from "../timer/timer.js";

const timerSettingInputs = document.querySelectorAll(".timer-setting__input");
const [setBtn, resetBtn] = document.querySelectorAll(".timer-setting__button");
const confirmedValues = document.querySelectorAll(".timer-setting__confirm-text");
const nextArrow = document.querySelector(".arrow__next");


/** 모든 input의 value를 초기화하는 함수 */
const resetInput = (event) => {
	event.preventDefault();

	// confirm 태그 출력 및 input 태그 숨김
	timerSettingInputs.forEach((input) => {
		showElement(input);
		input.value = '';
	});

	confirmedValues.forEach((confirmedValue) => hideElement(confirmedValue));
	localStorage.removeItem('timer-setting'); // 저장된 값 모두 초기화

	// set button 활성화
	setBtn.removeAttribute("disabled", "disabled");
	setBtn.classList.remove("disabled");

	hideElement(nextArrow); // 슬라이드 화살표 비활성화
};


/** input에 입력한 값을 object에 할당하여 local storage에 저장 */
const setLocalStorage = (timerSetting) => {
	const timerSettingJSON = JSON.stringify(timerSetting);
	localStorage.setItem("timer-setting", timerSettingJSON);
};


/** 입력값 제출 - 입력값을 localStorage에 저장하고 출력 */
const handleSubmit = (event) => {
	event.preventDefault();

	const inputs = [...timerSettingInputs]; // input tags
	const [focus, rest, iteration] = inputs.map(input => input.value); // 입력값 배열
	const inputValuesAreValid = inputs.every(input => input.value); // 입력값이 모두 존재하면 true

	if (inputValuesAreValid) {
		displayConfirmedValues({ focus, rest, iteration }); // 제출 값 출력
		setLocalStorage({ focus, rest, iteration }); // localStorage에 저장
		loadTimer(); // 설정한 값으로 timer 컴포넌트를 다시 로드
	} else {
		alert("Please enter the input values correctly as numbers.");
	}
};


/** input 입력값 유효성 검사 */
const validateInput = (event, inputValue) => {
	// "0" 시작 방지
	if (inputValue.charAt(0) === "0") {
		event.target.value = inputValue.substring(1);
	};

	// 최대 3글자 제한
	if (inputValue.length > 3) {
		event.target.value = inputValue.slice(0, 3);
	}
};


/** addEventListener를 모두 등록 */
const registerEventListeners = () => {
	// 모든 timer-setting input 태그에 input 이벤트 리스너 할당
	timerSettingInputs.forEach(input => {
		input.addEventListener("input", (event) => {
			const inputValue = input.value;

			validateInput(event, inputValue); // inputValue가 바뀔 때마다 호출
		});
	});

	setBtn.addEventListener("click", handleSubmit);
	resetBtn.addEventListener("click", resetInput);
};


/** 사용자가 입력한 값을 display하는 함수 */
const displayConfirmedValues = (timerSetting) => {
	// local storage에 저장된 값이 빈 객체라면 디스플레이 x
	if (Object.keys(timerSetting).length === 0) return;

	const { focus, rest, iteration } = timerSetting;
	const [focusConfirm, restConfirm, iterationConfirm] = [...confirmedValues];


	// confirm display 태그에 저장된 사용자 입력값 출력
	focusConfirm.innerText = parseInt(focus);
	restConfirm.innerText = parseInt(rest);
	iterationConfirm.innerText = parseInt(iteration);

	// confirm 태그 출력 및 input 태그 숨김
	timerSettingInputs.forEach((input) => hideElement(input));
	confirmedValues.forEach((confirmedValue) => showElement(confirmedValue));

	// set button 비활성화 및 관련 css 코드 적용
	setBtn.setAttribute("disabled", "disabled"); // set button 비활성화
	setBtn.classList.add("disabled"); // .disabled 클래스 추가

	// Timer로 넘어가는 화살표 활성화
	showElement(nextArrow);
};


/** CSS를 변경하여 DOM 요소를 보이는 함수 */
export const showElement = (element) => element.style.display = 'flex';


/** CSS를 변경하여 DOM 요소를 숨기는 함수 */
export const hideElement = (element) => element.style.display = 'none';


/** local storage에 저장된 값을 불러오고 리턴 */
export const getLocalStorage = () => {
	const timerSettingJSON = localStorage.getItem("timer-setting");

	// Json 데이터에 아무 것도 없을 때 (error)
	if (!timerSettingJSON || timerSettingJSON.trim().length === 0) return;

	const timerSetting = JSON.parse(timerSettingJSON);

	// timerInfo에 숫자가 아닌 형식이 있을 경우, 삭제 후 초기화
	for (let key in timerSetting) {
		const value = parseInt(timerSetting[key]);

		if (isNaN(value)) {
			localStorage.removeItem("timer-setting"); // localStorage 정보 삭제
			hideElement(nextArrow); // Timer로 넘어가는 화살표 비활성화
			return;
		}
	}
	return timerSetting;
};


/** Timer Setting - 사용자가 값을 입력하고 저장 */
export default function loadTimerSetting() {

	const savedValue = getLocalStorage(); // LocalStorage에 저장된 값 확인 및 할당

	if (savedValue) {
		// LocalStorage에 timer-setting 데이터가 있으면 실행
		displayConfirmedValues(savedValue);
	} else {
		hideElement(nextArrow); // 데이터 없으면 slide 비활성화
	}

	registerEventListeners();
}