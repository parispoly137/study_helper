const buttons = document.querySelectorAll(".brainwave__button");
const audio = document.querySelector(".brainwave__audio");

function handleClick(e) {
	e.preventDefault();

	const button = e.target;
	const buttonText = button.innerText;

	// 이전에 선택된 버튼 초기화
	if (!button.classList.contains("active")) {
		buttons.forEach((btn) => btn.classList.remove("active"));
	}

	button.classList.toggle("active");

	// 각 버튼에 맞는 mp3 파일 재생 및 정지
	if (button.classList.contains("active")) {
		audio.src = `src/res/audio/${buttonText}_wave.mp3`;
		audio.play();
		audio.loop = true;

	} else {
		audio.pause();
	}
}

/** Brainwave를 선택할 수 있는 컴포넌트 */
export default function loadBrainwave() {
	buttons.forEach((button) => button.addEventListener("click", handleClick));
}