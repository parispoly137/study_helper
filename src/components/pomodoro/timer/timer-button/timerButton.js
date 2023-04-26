const [actionBtn, resetBtn] = document.querySelectorAll(".timer__button");


/** Timer의 텍스트(clock, session) UI 변경 */
const setTimerTextUI = (textName, targetState) => {
	const isRest = targetState === "rest";

	textName.classList.toggle("rest", isRest);
	textName.style.color = isRest ? "white" : "black";
};


/** 버튼(action, reset)의 상태 변경 */
const setButtonState = (buttonName, targetState) => {
	buttonName.disabled = targetState === "disabled";
	buttonName.classList.toggle("disabled", targetState === "disabled");
};


export {
	actionBtn,
	resetBtn,
	setTimerTextUI,
	setButtonState
};