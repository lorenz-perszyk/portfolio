// I M P O R T S
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "whatwg-fetch";
import { scroll } from "./locomotive-scroll";

// INTRO ANIMATION =======================================
export const introAnimation = () => {
	const load = gsap.timeline({ reversed: true, defaults: { duration: 0.7 } });

	const lorenz = document.getElementById("load__title");
	const title = new SplitType(".hero__title", { types: "words" });
	const nav = document.getElementsByClassName("nav");
	const subText = document.getElementsByClassName("hero__subtext");

	load
		.from(lorenz, {
			opacity: 1,
			duration: 1,
			delay: 1,
		})
		.from(title.words, {
			opacity: 0,
			yPercent: 0,
			duration: 2.5,
			stagger: { amount: 1 },
		})
		.from(
			nav,
			{
				opacity: 0,
				yPercent: -20,
			},
			"-=1.2"
		)
		.from(
			subText,
			{
				opacity: 0,
				yPercent: 5,
			},
			"<"
		);

	load.play();
};

// PAGE TRANSITION =======================================
export const pageTransition = () => {
	var tl = gsap.timeline();
	tl.to(".loading-screen", {
		duration: 0.9,
		height: "100%",
		top: "0%",
		ease: "Expo.easeInOut",
	});

	tl.to(".loading-screen", {
		duration: 0.9,
		height: "0%",
		// top: "100%",
		ease: "Expo.easeInOut",
		delay: 0.2,
	});
	tl.set(".loading-screen", { top: "0", height: "0%" });
};


// HOMEPAGE SECTION TITLE =======================================
export const initHomeAnimations = () => {

	gsap.utils.toArray<HTMLElement>(".section__title-wrapper").forEach((elem) => {
		ScrollTrigger.create({
			trigger: elem,
			scroller: "[data-scroll-container]",
			start: "top center",
			toggleClass: {
				targets: ".section__title-wrapper .one",
				className: "active",
			},
		});

		ScrollTrigger.create({
			trigger: elem,
			scroller: "[data-scroll-container]",
			start: "top center",
			toggleClass: {
				targets: ".section__title-wrapper .two",
				className: "active",
			},
		});
	});

	// SKILLS ICONS
	gsap.from(".skills__grid__skill", {
		scrollTrigger: {
			trigger: ".skills__title",
			scroller: "[data-scroll-container]",
			start: "top 65%",
		},
		y: 80,
		autoAlpha: 0,
		ease: "power1.out",
		stagger: 0.03,
	});

	// WORK SECTION
	if (window.matchMedia("screen and (min-width: 1024px)").matches) {
		gsap.to("#bookly-image", {
			scrollTrigger: {
				trigger: "#fixed-target-bookly",
				scroller: "[data-scroll-container]",
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
			yPercent: 200,
			ease: "none",
		});
		gsap.to("#grolly-image", {
			scrollTrigger: {
				trigger: "#fixed-target-grolly",
				scroller: "[data-scroll-container]",
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			},
			yPercent: 200,
			ease: "none",
		});
	} else {
		let textBookly = document.getElementsByClassName(
			"work__project__textwrapper"
		)[0];
		textBookly.removeAttribute("data-scroll");
		textBookly.removeAttribute("data-scroll-sticky");
		let textGrolly = document.getElementsByClassName(
			"work__project__textwrapper"
		)[1];
		textGrolly.removeAttribute("data-scroll");
		textGrolly.removeAttribute("data-scroll-sticky");
		scroll.update();

		gsap.to("#bookly-image", {
			scrollTrigger: {
				trigger: "#fixed-target-bookly",
				scroller: "[data-scroll-container]",
				start: "top bottom",
				end: "bottom bottom",
				scrub: true,
			},
			transform: "translate3d(0, 70vh,0)",
			ease: "none",
		});
		gsap.to("#grolly-image", {
			scrollTrigger: {
				trigger: "#fixed-target-grolly",
				scroller: "[data-scroll-container]",
				start: "top bottom",
				end: "bottom bottom",
				scrub: true,
			},
			transform: "translate3d(0,70vh,0)",
			ease: "none",
		});
	}

	// VIDEO
	gsap.to(".video-container__slider.left", {
		scrollTrigger: {
			trigger: ".video-container",
			scroller: "[data-scroll-container]",
			start: "top bottom",
			end: "top 35%",
			scrub: true,
		},
		xPercent: -100,
		ease: "none",
	});

	gsap.to(".video-container__slider.right", {
		scrollTrigger: {
			trigger: ".video-container",
			scroller: "[data-scroll-container]",
			start: "top bottom",
			end: "top 35%",
			scrub: true,
		},
		xPercent: 100,
		ease: "none",
	});

	const video: HTMLVideoElement | null = document.querySelector(
		".video-container__video"
	)!;
	ScrollTrigger.create({
		trigger: video,
		scroller: "[data-scroll-container]",
		start: "top bottom",
		end: "bottom top",
		onEnter: () => video.play(),
		onEnterBack: () => video.play(),
		onLeave: () => video.pause(),
		onLeaveBack: () => video.pause(),
	});

	// FOOTER
	gsap.from(".footer__inner", {
		scrollTrigger: {
			trigger: ".footer__outer",
			scroller: "[data-scroll-container]",
			start: "top bottom",
			end: "bottom bottom",
			scrub: true,
		},
		yPercent: -50,
		ease: "none",
	});
};

// CONTACT PAGE ANIMATIONS  =======================================
export const initContactAnimation = () => {
	let formSend = gsap.timeline({
		paused: true,
	});
	formSend
		.to(".contact__wrapper__form", {
			duration: 0.4,
			autoAlpha: 0,
		})
		.from(".contact__wrapper__form__success", {
			delay: 0.2,
			duration: 1,
			autoAlpha: 0,
		})
		.from(
			".contact__wrapper__form__success__plane",
			{
				ease: "power2.out",
				y: 35,
				x: -35,
			},
			"<"
		);

	const submitForm = () => {
		console.log("submit form function");
		const form = document.querySelector(
			".contact__wrapper__form"
		) as HTMLFormElement;
		const formData = new FormData(form);
		const url = "https://formsubmit.co/af2afc9908d8016e50a9739c4e50cab8";
		fetch(url, {
			method: "POST",
			body: formData,
		});
		return false;
	};

	const form = document.querySelector(
		".contact__wrapper__form"
	) as HTMLFormElement;
	// console.log(form);

	form.addEventListener("submit", () => {
		// console.log("works");
		submitForm();
		formSend.play();
	});
};
