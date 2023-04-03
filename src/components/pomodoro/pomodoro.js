const slider = document.querySelector(".pomodoro__slider");
const sliderBtns = document.querySelectorAll(".pomodoro__arrow");

const handleSlide = (e) => {
	console.log("how");
	e.preventDefault();
	sliderBtns.forEach(btn => btn.classList.remove("hidden"));

	const sliderBtn = e.target;

	if (sliderBtn.classList.contains("arrow__next")) {
		slider.style.transform = "translate(-500px)";
	} else {
		slider.style.transform = "translate(0px)";
	}
	sliderBtn.classList.add("hidden");

};

sliderBtns.forEach(btn => btn.addEventListener("click", handleSlide));