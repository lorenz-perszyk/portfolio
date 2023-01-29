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

barba.hooks.once((data) => {
	console.log("global once");
});

// lock the scroll to prevent further animations when transitioning
barba.hooks.before(() => {
	console.log("global before");
	scroll.stop();
});

barba.hooks.beforeLeave(() => {
	// Remove curser classes
	let cursorElement = document.querySelector(".mf-cursor"!)
	cursorElement.classList.remove("-text", "-pointer")
	cursor.hide()
})

barba.hooks.afterLeave(() => {
	console.log("global afterLeave");
	let triggers = ScrollTrigger.getAll();
	triggers.forEach((trigger) => {
		trigger.kill();
	});
});

barba.hooks.beforeEnter(() => {
	// console.log("global beforeEnter");
});

// reset scroll position and update the scroll when the next page is fetched
barba.hooks.enter(({ current }) => {
	console.log("global enter");
	[current.container.remove()];
	if (history.scrollRestoration) {
		history.scrollRestoration = "manual";
	}
	scroll.scrollTo("top", {
		duration: 0,
	});
	scroll.update();
	cursor.show();
});

// unlock the scroll, in order to let the user be able to scroll again
barba.hooks.after(() => {
	console.log("global after");
	scroll.start();
});

// Initialize Barba and set transition parameters
barba.init({
	debug: true,
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
				// console.log("init intro Animation");
				// introAnimation();
			},
		},
	],
	views: [
		{
			namespace: "home",
			afterEnter(data) {
				console.log("home afterEnter");
				initHomeAnimations();
				scroll.update();
				// window.addEventListener("resize", () => debounce(location.reload(), 1000))
			},
			beforeLeave() {
				// window.removeEventListener("resize", debounce(location.reload(), 1000))
			}
		},
		{
			namespace: "contact",
			afterEnter({next}) {
				console.log("init contact animations");
				let script = document.createElement("script");
				script.src = "https://kit.fontawesome.com/58217ad94d.js";
				script.crossOrigin = "anonymous";
				next.container.appendChild(script);
				initContactAnimation();
			},
		},
		{
			namespace: "bookly",
			beforeEnter({next}) {
				console.log("init bookly script");
				let script = document.createElement("script");
				script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
				next.container.appendChild(script);
			},
		},
        {
			namespace: "grolly",
			beforeEnter() {
				console.log("init grolly stuff");
			},
		}
	],
});

function delay(n = 2000) {
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}

// Debounce function
function debounce(func, time){
    var time = time || 500; // 500 by default if no param
    var timer;
    return function(){
        if(timer) clearTimeout(timer);
        timer = setTimeout(func, time);
    };
}