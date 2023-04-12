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


/** action button의 UI 변경 ... (arg: currentText) */
const setActionButtonDesign = (buttonText) => {
	const isStart = buttonText === "start";

	actionBtn.textContent = isStart ? "pause" : "start";
	actionBtn.style.backgroundColor = isStart ? "#ffc56c" : "#00b050";
};


export {
	actionBtn,
	resetBtn,
	setTimerTextUI,
	setButtonState,
	setActionButtonDesign
};