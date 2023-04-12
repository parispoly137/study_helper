/** 현재 시간 진행도에 따른 progress bar 렌더링*/
const renderProgressBar = (progressValue, maxProgressValue) => {
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


/** progress bar를 초기화*/
const resetProgressBar = () => {
	const spinners = [...document.querySelectorAll(".spinner-holder-two")];
	spinners.forEach(spinner => spinner.style.transform = "rotate(90deg)");
};


export { renderProgressBar, resetProgressBar };