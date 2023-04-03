const buttons = document.querySelectorAll(".brainwave__button");
const audio = document.querySelector(".brainwave__audio");

function handleClick(e) {
	e.preventDefault();

	const button = e.target;
	const buttonText = button.innerText;

	// active 클래스 초기화
	if (!button.classList.contains("active")) {
		buttons.forEach((btn) => btn.classList.remove("active"));
	}

	// 누른 버튼에 active 클래스 토글
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

// 각 버튼에 Event Listener 할당
buttons.forEach((button) => {
	button.addEventListener("click", handleClick);
});