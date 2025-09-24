gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const header = document.querySelector(".main_header");
const navLinks = gsap.utils.toArray(".main_nav a");

// header_nav
function updateHeaderNav(currentSectionId) {
    const cleanedId = currentSectionId.startsWith("#") ? currentSectionId.substring(1) : currentSectionId;
    navLinks.forEach(link => {
        if (cleanedId === 'intro_logo_section') {
            link.classList.remove("active");
            return;
        }

        if (link.getAttribute("href").includes(cleanedId)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}


ScrollTrigger.create({
    trigger: ".paint_section",
    start: "top bottom",
    onEnter: () => header.classList.add("visible"),
    onLeaveBack: () => header.classList.remove("visible"),
});

ScrollTrigger.create({
    trigger: "body",
    start: "top -50px",
    end: "bottom top",
    toggleClass: {
        targets: header,
        className: "scrolled"
    }
});


navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute("href");
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetId,
                offsetY: header.offsetHeight
            },
            ease: "power2.inOut"
        });
    });
}); // nav_scroll_event


const fullSectionsToPin = gsap.utils.toArray("section").filter(sec => {
    return !sec.classList.contains("intro_logo_section") &&
        !sec.classList.contains("invest_section") &&
        !sec.classList.contains("history_section") &&
        !sec.classList.contains("gallery_section");
}); // full_scroll, pixed

fullSectionsToPin.forEach(sec => {
    let pinEndValue = "bottom top";
    let snapConfig = {
        snapTo: 1,
        duration: 1.2,
        delay: 0.1,
        ease: "power2.inOut"
    };
    let pinSpacingValue = true;

    if (sec.classList.contains("paint_section")) {
        pinEndValue = "+=300%";
        snapConfig = false;
    } // paint_section

    ScrollTrigger.create({
        trigger: sec,
        start: "top top",
        end: pinEndValue,
        pin: true,
        pinSpacing: pinSpacingValue,
        snap: snapConfig,
        onEnter: () => updateHeaderNav(sec.id),
        onEnterBack: () => updateHeaderNav(sec.id),
    });
});




// video_section
gsap.timeline({
    scrollTrigger: {
        trigger: ".paint_section",
        start: "top top",
        end: "+=200%",
        scrub: true,
    }
}).to(".circle_mask", { clipPath: "circle(150% at center center)", duration: 1.5 });


gsap.to(".paint_text", {
    opacity: 1, y: 0,
    scrollTrigger: {
        trigger: ".paint_section",
        start: "top center",
        end: "center center",
        scrub: true,
    }
});


// video_start
ScrollTrigger.create({
    trigger: ".paint_section",
    start: "top center",
    end: "bottom center",
    onEnter: () => { const video = document.querySelector(".paint_video"); if (video) { const p = video.play(); if (p !== undefined) p.catch(e => console.log(e)); } },
    onLeaveBack: () => { const video = document.querySelector(".paint_video"); if (video) { video.pause(); video.currentTime = 0; } }
});

// company_section
gsap.utils.toArray(".company_section .reveal_item").forEach((el, i) => {
    const mask = el.querySelector(".wipe_mask");
    if (mask) {
        gsap.fromTo(mask, { x: "0%" }, {
            x: "100%", duration: 1.2, ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 75%",
                toggleActions: "play none none reverse",
            }
        });
    }
    gsap.fromTo(el, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, ease: "power1.out",
        scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse",
        }
    });
});
gsap.fromTo(".company_section .company_title.reveal", { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
    scrollTrigger: {
        trigger: ".company_section .company_title.reveal",
        start: "top 80%",
        toggleActions: "play none none reverse",
    }
});


// slideup
gsap.utils.toArray(".content_section .reveal_item").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 80 }, {
        opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
        }
    });
});

gsap.fromTo(".news_section .news_left.reveal_item", { opacity: 0, y: 80 }, {
    opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
    scrollTrigger: {
        trigger: ".news_section .news_left.reveal_item",
        start: "top 85%",
        toggleActions: "play none none none",
    }
});
gsap.utils.toArray(".news_card.reveal_item_fadeinup").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 80 }, {
        opacity: 1, y: 0, duration: 1, ease: "power1.out",
        delay: i * 0.15,
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
        }
    });
});

gsap.fromTo(".instagram_section .instagram_text.reveal_item", { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
    scrollTrigger: {
        trigger: ".instagram_section .instagram_text.reveal_item",
        start: "top 85%",
        toggleActions: "play none none none",
    }
});
gsap.utils.toArray(".insta_item.reveal_item_fadeinup").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 100 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power1.out",
        delay: i * 0.15,
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
        }
    });

    const button = el.querySelector(".insta_button");
    const originalColor = el.dataset.color || '#ff7f32'; // datacolor

    if (button) {
        el.addEventListener("mouseenter", () => {
            button.style.setProperty('--button_hover_bg', originalColor);
            button.classList.add('hovered');
        });
        el.addEventListener("mouseleave", () => {
            button.classList.remove('hovered');
        });
    }
});


// horizontal_scroll_wrapper
const horizontalSections = document.querySelector(".horizontal_scroll_wrapper");
const tl = gsap.timeline();
let countNum = { val: 0 };

tl.to(countNum, {
    val: 1402,
    roundProps: "val",
    onUpdate: () => { document.getElementById("countNum").innerText = Math.floor(countNum.val); },
    duration: 1,
    ease: "none"
}, "startAnimation");

tl.to(".invest_side.left img", { y: "0%", duration: 1, ease: "power2.out" }, "startAnimation");
tl.to(".invest_side.right img", { y: "0%", duration: 1, ease: "power2.out" }, "startAnimation");

tl.to(horizontalSections, { x: () => -(horizontalSections.scrollWidth - window.innerWidth), duration: 1, ease: "none" });

ScrollTrigger.create({
    trigger: horizontalSections,
    start: "top top",
    end: () => `+=${window.innerHeight * 3}`, // pin duration
    pin: true,
    scrub: true,
    animation: tl,
    invalidateOnRefresh: true,
    onEnter: () => updateHeaderNav("invest_section"),
    onEnterBack: () => updateHeaderNav("invest_section"),
});


// gallery
gsap.utils.toArray(".gallery_header.slide_up_item").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
        }
    });
});

gsap.utils.toArray(".gallery_item.slide_up_item").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        delay: i * 0.15,
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
        }
    });
});
gsap.fromTo(".gallery_btn_wrap.slide_up_item", { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, duration: 1, ease: "power2.out",
    scrollTrigger: {
        trigger: ".gallery_btn_wrap.slide_up_item",
        start: "top 85%",
        toggleActions: "play none none none",
    }
});


// topbtn
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

topBtn.addEventListener("click", () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
});



document.addEventListener("DOMContentLoaded", () => {
    let initialSectionId = window.location.hash;
    if (!initialSectionId || initialSectionId === '#intro_logo_section') {
    } else {
        updateHeaderNav(initialSectionId);
    }
});

ScrollTrigger.create({
    trigger: ".intro_logo_section",
    start: "bottom top",
    onEnter: () => updateHeaderNav("paint_section"),
    onLeaveBack: () => updateHeaderNav("intro_logo_section"),
});
