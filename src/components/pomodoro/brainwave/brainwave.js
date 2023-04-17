import { changeColorSnippet } from "/src/utils/changeTheme.js";

const buttons = document.querySelectorAll(".brainwave__button");
const audio = document.querySelector(".brainwave__audio");

function handleClick(e) {
	e.preventDefault();

	const button = e.target;
	const buttonText = button.innerText;

	// 이전에 선택된 버튼 초기화
	if (!button.classList.contains("active")) {
		buttons.forEach((btn) => {
			btn.classList.remove("active");
			btn.style.backgroundColor = "white";
			changeColorSnippet(btn, "color", "main");
		});
	}

	button.classList.toggle("active");

	// 각 버튼에 맞는 mp3 파일 재생 및 정지
	if (button.classList.contains("active")) {
		// 버튼을 선택한 경우
		audio.src = `src/res/audio/${buttonText}_wave.mp3`;
		audio.play();
		audio.loop = true;

		button.style.color = "white";
		changeColorSnippet(button, "backgroundColor", "main");

	} else {
		// 버튼 선택을 취소한 경우
		audio.pause();

		button.style.backgroundColor = "white";
		changeColorSnippet(button, "color", "main");
	}
}

/** Brainwave를 선택할 수 있는 컴포넌트 */
export default function loadBrainwave() {
	buttons.forEach((button) => button.addEventListener("click", handleClick));
}