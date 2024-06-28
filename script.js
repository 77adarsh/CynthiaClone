const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    let tl = gsap.timeline();

    tl.from("#nav", {
        y: 10,
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 1.5,
            stagger: 0.2
        })
        .from(".uptodown", {
            y: -10,
            opacity: 0,
            duration: 2,
            delay: -1,
            ease: Expo.easeInOut
        })
        .from("#herofooter", {
            y: 2,
            opacity: 0,
            duration: 2,
            delay: -1,
            ease: Expo.easeInOut
        })
}

function circleCompresser() {
    let timeout;
    // define default scale value
    let xscale = 1;
    let yscale = 1;

    let xprev = 0;
    let yprev = 0;
    window.addEventListener("mousemove" ,(events) => {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, events.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, events.clientY - yprev);

        xprev = events.clientX;
        yprev = events.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(() => {
            document.querySelector('#minicircle').style.transform = `translate(${events.clientX}px, ${events.clientY}px) 1, 1)`;
        }, 100)
    })
}

circleCompresser();

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (events) {
        document.querySelector('#minicircle').style.transform = `translate(${events.clientX}px, ${events.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem")
.forEach((elem) => {
    let rotate = 0;
    let diffrt = 0;
    elem.addEventListener("mouseleave", (events) => {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })
    })

    elem.addEventListener("mousemove", (events) => {
        let diff = events.clientY - elem.getBoundingClientRect().top;
        diffrt = events.clientX - rotate;
        rotate = events.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: events.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrt * 0.5)
        })
    })
})