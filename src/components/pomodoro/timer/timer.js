const clock = document.querySelector(".timer__clock");
const session = document.querySelector(".timer__session");

let iterationNum = 0;

const initializeTimer = (timerInfo) => {
	clock.innerText = `${timerInfo.focus}:00`;
	session.innerText = `${iterationNum} / ${timerInfo.iteration}`;
};

const getLocalStorage = () => {
	const timerInfoJSON = localStorage.getItem("timer-setting");
	const timerInfo = JSON.parse(timerInfoJSON);

	return timerInfo;
};

export default function loadTimer() {
	const timerInfo = getLocalStorage();

	initializeTimer(timerInfo);
}