const slider = document.querySelector(".pomodoro__slider");
const prevBtn = document.querySelector(".arrow__prev");
const nextBtn = document.querySelector(".arrow__next");


prevBtn.addEventListener("click", function () {
	slider.style.transform = "translate(0px)";
});

nextBtn.addEventListener("click", function () {
	slider.style.transform = "translate(-500px)";
});