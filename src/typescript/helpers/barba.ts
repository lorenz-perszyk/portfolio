// I M P O R T S
// @ts-nocheck
import barba from "@barba/core";
import { ScrollTrigger } from "gsap/all";
import { scroll, initSmoothScroll } from "./locomotive-scroll";
import { cursor } from "../main";
import {
	introAnimation,
	initHomeAnimations,
	initContactAnimation,
	pageTransition,
} from "./gsap";

barba.hooks.before(() => {
	// Remove the Refresh function
	window.removeEventListener("resize", debounceRefresh);
	// Lock the scroll to prevent further animations when transitioning
	scroll.stop();
});

barba.hooks.afterLeave(() => {
	let triggers = ScrollTrigger.getAll();
	triggers.forEach((trigger) => {
		trigger.kill();
	});
});

// reset scroll position and update the scroll when the next page is fetched
barba.hooks.enter(({ current }) => {
	[current.container.remove()];
	if (history.scrollRestoration) {
		history.scrollRestoration = "manual";
	}
	scroll.scrollTo("top", {
		duration: 0,
	});
	scroll.update();
});

// unlock the scroll, in order to let the user be able to scroll again
barba.hooks.after(() => {
	scroll.start();
});

// Initialize Barba and set transition parameters
barba.init({
	sync: true,
	transitions: [
		{
			name: "general-transition",
			async leave() {
				const done = this.async();
				pageTransition();
				await delay(900);
				done();
			},
			afterEnter() {
				scroll.setScroll(0, 0);
			},
		},
		{
			name: "load home animations",
			to: {
				namespace: ["home"],
			},
			once() {
				scroll.stop();
				introAnimation();
				setTimeout(() => {
					scroll.start();
					// scroll.update();
				}, 4700);
			},
		},
	],
	views: [
		{
			namespace: "home",
			afterEnter(data) {
				initHomeAnimations();
				scroll.update();
				window.addEventListener("resize", debounceRefresh);
			},
			beforeLeave() {
				// Remove MouseFollower cursor classes if going to project page
				let cursorElement = document.querySelector(".mf-cursor"!);
				cursorElement.classList.remove("-text", "-pointer");				
			},
		},
		{
			namespace: "contact",
			afterEnter({ next }) {
				let script = document.createElement("script");
				script.src = "https://kit.fontawesome.com/58217ad94d.js";
				script.crossOrigin = "anonymous";
				next.container.appendChild(script);
				initContactAnimation();
			},
		},
		{
			namespace: "bookly",
			beforeEnter({ next }) {
				let script = document.createElement("script");
				script.src =
					"https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
				next.container.appendChild(script);
			},
		},
	],
});

function delay(delay = 2000) {
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, delay);
	});
}

function debounceRefresh() {
	debounce(location.reload(), 2000);
}

// Debounce function
function debounce(func, time = 1000) {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func;
		}, time);
	};
}
