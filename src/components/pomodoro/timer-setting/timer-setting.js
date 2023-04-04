const settingInputs = document.querySelectorAll(".timer-setting__input");
const setBtn = document.querySelector(".timer-setting__set-btn");
const resetBtn = document.querySelector(".timer-setting__reset-btn");
const settingConfirms = document.querySelectorAll(".timer-setting__confirm-text");
const nextArrow = document.querySelector(".arrow__next");

// 각 Input에 대해 변수 할당
const focusInput = settingInputs[0];
const restInput = settingInputs[1];
const iterationInput = settingInputs[2];

// 사용자가 제출한 value를 출력하는 span에 변수 할당
const focusConfirm = settingConfirms[0];
const restConfirm = settingConfirms[1];
const iterationConfirm = settingConfirms[2];


/** 사용자가 입력한 값을 display하는 함수 */
const confirmDisplay = (setObj) => {

	// local storage에 저장된 값이 빈 객체라면 디스플레이 x
	if (Object.keys(setObj).length === 0) return;

	// Timer로 넘어가는 화살표 활성화
	nextArrow.style.display = 'block';

	// confirm display 태그에 저장된 사용자 입력 값 출력
	focusConfirm.innerText = Number(setObj.focus);
	restConfirm.innerText = Number(setObj.rest);
	iterationConfirm.innerText = Number(setObj.iteration);

	// confirm 태그 출력 및 input 태그 숨김
	settingInputs.forEach((input) => { input.style.display = 'none'; });
	settingConfirms.forEach((confirm) => { confirm.style.display = 'flex'; });
};

/** input에 입력한 값을 object에 할당하여 local storage에 저장 */
const setLocalStorage = (focus, rest, iteration) => {
	const setObj = {
		"focus": focus,
		"rest": rest,
		"iteration": iteration
	};
	const setObjJSON = JSON.stringify(setObj);
	localStorage.setItem("timer-setting", setObjJSON);
};

/** local storage에 저장된 값을 불러오고 리턴 */
const getLocalStorage = () => {
	const setObjJSON = localStorage.getItem("timer-setting");
	const setObj = JSON.parse(setObjJSON);

	return setObj;
};

/** input에 값이 "0"으로 시작하지 않고, 최대 3글자 제한의 조건 적용 */
const trimInput = (event, inputText) => {
	if (inputText.charAt(0) === "0") {
		event.target.value = inputText.substring(1);
	};

	if (inputText.length > 3) {
		event.target.value = inputText.slice(0, 3);
	}
};

/** timer-setting의 set버튼을 누르면, 값을 localStorage에 저장 */
const handleSubmit = (event) => {
	event.preventDefault();

	const focus = focusInput.value;
	const rest = restInput.value;
	const iteration = iterationInput.value;

	// 값이 모두 존재할 때만
	if (focus && rest && iteration) {
		confirmDisplay({ focus, rest, iteration }); // 제출 값 출력
		setLocalStorage(focus, rest, iteration); // localStorage에 저장
		setBtn.setAttribute("disabled", "disabled"); // set button 비활성화
		setBtn.classList.add("disabled"); // .disabled 클래스 추가
	} else {
		alert("값을 모두 입력해주세요.");
	}

};

/** 모든 input의 value를 초기화하는 함수 */
const resetInput = () => {

	// confirm 태그 출력 및 input 태그 숨김
	settingInputs.forEach((input) => {
		input.style.display = 'block';
		input.value = '';
	});

	settingConfirms.forEach((confirm) => { confirm.style.display = 'none'; });

	localStorage.removeItem('timer-setting'); // 저장된 값도 모두 초기화
	nextArrow.style.display = 'none'; // Timer로 넘어가는 화살표 비활성화
	setBtn.removeAttribute("disabled", "disabled"); // set button 비활성화 해제
	setBtn.classList.remove("disabled"); // .disabled 클래스 제거
};

/** timer-setting의 reset버튼을 눌렀을 때, 모든 input 값 초기화*/
const handleReset = (event) => {
	event.preventDefault();
	resetInput();
};

/** Timer Setting 컴포넌트에서 사용자가 값을 설정한다. */
export default function setTimer() {

	// LocalStorage에 저장된 값이 있는지 체크하고, 있으면 불러오기
	const savedValue = getLocalStorage();

	if (savedValue !== null) {
		confirmDisplay(savedValue);
	} else {
		// Timer로 넘어가는 화살표 비활성화
		nextArrow.style.display = 'none';
	}

	// 모든 timer-setting input 태그에 input 이벤트 리스너 할당
	settingInputs.forEach(input => {
		input.addEventListener("input", (event) => trimInput(event, input.value));
	});

	// set 버튼에 onSubmit 이벤트 할당
	setBtn.addEventListener("click", handleSubmit);

	// reset 버튼에 click 이벤트 할당
	resetBtn.addEventListener("click", handleReset);
}