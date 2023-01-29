// @ts-nocheck
// I M P O R T S
import "../styles/main.sass";
import "../../node_modules/mouse-follower/src/scss/index.scss";

// Color Theme Settings
document.documentElement.setAttribute("data-theme", "dark");
// Initialize with the users preferred color theme
let prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
console.log(prefersDark);

// switch theme if icon is clicked
let toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", () => {
    let currentTheme = document.documentElement.getAttribute("data-theme")
	document.documentElement.setAttribute(
		"data-theme",
		currentTheme === "light" ? "dark" : "light"
	);
});

// Cuberto MOUSE FOLLOWER
import MouseFollower from "mouse-follower";
import gsap from "gsap";

MouseFollower.registerGSAP(gsap);

export const cursor = new MouseFollower({
	container: document.body,
	speed: 0.5,
	skewing: 5,
});
