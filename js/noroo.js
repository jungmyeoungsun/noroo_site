gsap.registerPlugin(ScrollTrigger, SplitText);

const header = document.querySelector('.main_header');
const paintVideo = document.querySelector(".paint_video");

ScrollTrigger.create({
    trigger: ".paint_section",
    start: "top bottom",
    onEnter: () => { header.classList.add('visible'); },
    onLeaveBack: () => { header.classList.remove('visible'); header.classList.remove('scrolled'); }
});

// Header Shadow
ScrollTrigger.create({
    trigger: "body",
    start: "200px top",
    onEnter: () => { if (header.classList.contains('visible')) { header.classList.add('scrolled'); } },
    onLeaveBack: () => { header.classList.remove('scrolled'); }
});

// Top_btn
document.querySelector('.top_btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Paint Section video
const paintTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".paint_section",
        start: "top top",
        end: "+=1500",
        scrub: true,
        pin: true,
        onEnter: () => { if (paintVideo) { paintVideo.currentTime = 0; paintVideo.play().catch(e => console.error("비디오 재생 실패:", e)); } },
        onLeave: () => { if (paintVideo) { paintVideo.pause(); paintVideo.currentTime = 0; } },
        onEnterBack: () => { if (paintVideo) { paintVideo.currentTime = 0; paintVideo.play().catch(e => console.error("비디오 재생 실패:", e)); } },
        onLeaveBack: () => { if (paintVideo) { paintVideo.pause(); paintVideo.currentTime = 0; } }
    }
});

const paintTextH2Split = new SplitText(".paint_text .text-animation-wrapper:nth-child(1) h2", { type: "chars" });
const paintTextPSplit = new SplitText(".paint_text .text-animation-wrapper:nth-child(2) p", { type: "chars" });


gsap.set([paintTextH2Split.chars, paintTextPSplit.chars], { opacity: 0, y: "1em" }); //폰트 사이즈에 동작하도록

paintTimeline
    .to(".circle_mask", { clipPath: "circle(150% at center center)", duration: 1.5, ease: "power2.inOut" }, 0)
    .to(paintTextH2Split.chars, { opacity: 1, y: 0, stagger: 0.05, ease: "power3.out", duration: 0.8 }, 0.5)
    .to(paintTextPSplit.chars, { opacity: 1, y: 0, stagger: 0.03, ease: "power3.out", duration: 0.8 }, "<0.2");


// split text Timing
function animateSplitText(containerSelector, triggerSelector) {
    document.querySelectorAll(containerSelector).forEach(element => {
        const targets = element.querySelectorAll('.text-animation-wrapper > *');

        targets.forEach(targetElement => {
            if (targetElement.textContent.trim() === '') return;

            const split = new SplitText(targetElement, { type: "chars" });

            gsap.fromTo(split.chars, { opacity: 0, y: "1em" }, {
                scrollTrigger: {
                    trigger: triggerSelector || element,
                    start: "top 70%",
                    toggleActions: "play reverse play reverse",
                },
                opacity: 1,
                y: 0,
                stagger: 0.03,
                ease: "back.out(1.7)",
                duration: 1
            });
        });
    });
}

// Section title animation
animateSplitText(".company_title", ".company_title");
animateSplitText(".content_left", ".content_section");
animateSplitText(".news_left", ".news_left");
animateSplitText(".instagram_text", ".instagram_text");

// Company Section Animation
gsap.utils.toArray(".company_row").forEach(row => {
    gsap.from(row, {
        scrollTrigger: {
            trigger: row,
            start: "bottom bottom",
            toggleActions: "play reverse play reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1.5
    });
});

// Content Animation
gsap.from(".content_left p", {
    scrollTrigger: {
        trigger: ".content_section",
        start: "top 75%",
        toggleActions: "play reverse play reverse",
    },
    x: -100,
    opacity: 0,
    duration: 1
});
gsap.from(".product_btn", {
    scrollTrigger: {
        trigger: ".content_section",
        start: "top 70%",
        toggleActions: "play reverse play reverse",
    },
    x: -100,
    opacity: 0,
    duration: 1,
    clearProps: "all"
});
gsap.from(".content_right img", {
    scrollTrigger: {
        trigger: ".content_section",
        start: "top 75%",
        toggleActions: "play reverse play reverse",
    },
    x: 100,
    opacity: 0,
    duration: 1
});

// News Animation
// 모두 동시에 시작
gsap.utils.toArray(".news_card").forEach((card) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
    });
});

// Instagram Animation
gsap.utils.toArray(".insta_item").forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: i * 0.2
    });
});

// Invest Counting
const countEl = document.querySelector('.count_number');
const targetCount = parseInt(countEl.getAttribute('data-target'));

ScrollTrigger.create({
    trigger: ".invest_section",
    start: "top center",
    end: "bottom center",
    scrub: true,
    onUpdate: self => {
        const currentCount = Math.round(targetCount * self.progress);
        countEl.innerText = currentCount.toLocaleString();
    }
});

// Scroll
gsap.to(".horizontal_scroll_wrapper", {
    x: () => -(document.querySelector(".horizontal_scroll_wrapper").scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal_scroll_wrapper",
        pin: true,
        scrub: 1,
        end: () => "+=" + (document.querySelector(".horizontal_scroll_wrapper").scrollWidth - window.innerWidth)
    }
});
