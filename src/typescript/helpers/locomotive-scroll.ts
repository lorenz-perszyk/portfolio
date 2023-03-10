// @ts-nocheck
// I M P O R T S
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import LocomotiveScroll from "locomotive-scroll";
gsap.registerPlugin(ScrollTrigger);

// Create variable to store the LocomotiveScroll
export let scroll;

// Initialize LocomotiveScroll
export function initSmoothScroll() {
	scroll = new LocomotiveScroll({
		el: document.getElementById("scroll-container"),
		smooth: true,
		multiplier: 0.7,
		// for tablet smooth
		tablet: { smooth: true, multiplier: 2 },
		// for mobile
		smartphone: { smooth: true, multiplier: 2 },
	});
	scroll.on("scroll", ScrollTrigger.update);
}

// Initialize smoothScroll
initSmoothScroll();

// Connect ScrollTrigger to LocomotiveScroll container
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
	scrollTop(value) {
		return arguments.length
			? scroll.scrollTo(value, 0, 0)
			: scroll.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		};
	},
});

ScrollTrigger.addEventListener("refreshInit", function() {
    console.log('ST refreshInit');
});

ScrollTrigger.addEventListener("refresh", function() {
    // console.log('ST refreshDone');
});

