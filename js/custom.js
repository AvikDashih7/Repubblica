// ! Pre Loader By Jquery

// $(window).on("load", function () {
//     $("#pre_Loader").fadeOut(2000);
// });

// =======================<<<<<>>>>>=======================


// ! Custom Fixed NavBar

// $(function () {
//     $(window).scroll(function () {
//         if ($(window).scrollTop() > 400) {
//             $("header").addClass("active");
//         } else {
//             $("header").removeClass("active");
//         }
//     });
// });

// =======================<<<<<>>>>>=======================


// ! Back To Top (Jquery)

// let btn = $('#backToTop');
// $(window).on('scroll', function () {
//     if ($(window).scrollTop() > 300) {
//         btn.addClass('show');
//     } else {
//         btn.removeClass('show');
//     }
// });
// btn.on('click', function (e) {
//     e.preventDefault();
//     $('html, body').animate({
//         scrollTop: 0
//     }, '1000');
// });


// =======================<<<<<>>>>>=======================

// ! Easy Responsive Tabs

// $(document).ready(function () {
//     $('#horizontalTab').easyResponsiveTabs({
//         type: 'default',
//         width: 'auto',
//         fit: true,
//         closed: 'accordion',
//         activate: function (event) {
//             var $tab = $(this);
//             var $info = $('#tabInfo');
//             var $name = $('span', $info);
//             $name.text($tab.text());
//             $info.show();
//         }
//     });
// });

// =======================<<<<<>>>>>=======================


// ! Swiper Slider

// var swiper = new Swiper(".mySwiper", {
//     loop: true,
//     // centeredSlides: true,
//     slidesPerView: 3,
//     spaceBetween: 30,
//     autoplay: {
//         delay: 1000,
//         disableOnInteraction: true,
//     },
//     speed: 1500,
//     // direction: "vertical",
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
// });

// Autoplay Stop on Hover

/* $(".swiper").mouseenter(function () {
    swiper.autoplay.stop();
});

$(".swiper").mouseleave(function () {
    swiper.autoplay.start();
});

*/

// =======================<<<<<>>>>>=======================


/* REPUBBLICA – scroll animations & micro-interactions (load AFTER custom.js) */
(function () {
    "use strict";
    var $ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

    // Mobile navigation
    var navToggle = document.querySelector(".nav-toggle");
    var mainNav = document.querySelector("#mainNav");
    if (navToggle && mainNav) {
        function closeNav() {
            navToggle.setAttribute("aria-expanded", "false");
            mainNav.classList.remove("open");
        }
        navToggle.addEventListener("click", function () {
            var isOpen = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!isOpen));
            mainNav.classList.toggle("open", !isOpen);
        });
        mainNav.addEventListener("click", function (event) {
            if (event.target.closest("a")) closeNav();
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") closeNav();
        });
        window.addEventListener("resize", function () {
            if (window.innerWidth > 992) closeNav();
        });
    }

    // 1. Auto-assign AOS animations (no HTML edits needed)
    var map = [
        [".benefits .benefit", "fade-up", 100],
        [".shop-room .section-head", "fade-up", 0],
        [".room-card", "zoom-in-up", 150],
        ["#materials .section-head", "fade-up", 0],
        [".material", "fade-up", 120],
        [".look-section .section-head", "fade-up", 0],
        [".look-left", "fade-right", 0],
        [".look-photo", "fade-left", 100],
        [".product", "fade-up", 80],
        [".reviews .section-head", "fade-up", 0],
        [".review", "flip-up", 150],
        [".consult-photo", "fade-right", 0],
        [".consult-copy", "fade-left", 150],
        [".step", "fade-up", 150],
        [".instagram .section-head", "fade-up", 0],
        [".instagram-grid > a", "zoom-in", 150],
        [".newsletter h2", "fade-up", 0],
        [".newsletter-form", "fade-up", 150],
        [".footer-grid > div", "fade-up", 100]
    ];
    map.forEach(function (m) {
        $(m[0]).forEach(function (el, i) {
            if (el.hasAttribute("data-aos")) return;
            el.setAttribute("data-aos", m[1]);
            el.setAttribute("data-aos-delay", String(Math.min(i, 5) * m[2]));
        });
    });
    if (window.AOS) {
        AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 80 });
    }

    // 2. Scroll progress bar, sticky-header shadow, back-to-top
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    var top = document.createElement("button");
    top.className = "to-top";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = "&uarr;";
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    document.body.appendChild(bar);
    document.body.appendChild(top);

    var header = document.querySelector(".header");
    var ticking = false;
    function onScroll() {
        var y = window.pageYOffset;
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
        if (header) header.classList.toggle("scrolled", y > 40);
        top.classList.toggle("show", y > 600);
        ticking = false;
    }
    window.addEventListener("scroll", function () {
        if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    // 3. Button ripple
    $(".btn-line, .sq-btn, .email-row button").forEach(function (btn) {
        btn.style.position = btn.style.position || "relative";
        btn.addEventListener("click", function (e) {
            var r = btn.getBoundingClientRect(), s = Math.max(r.width, r.height);
            var d = document.createElement("span");
            d.className = "ripple";
            d.style.cssText = "width:" + s + "px;height:" + s + "px;left:" + (e.clientX - r.left - s / 2) + "px;top:" + (e.clientY - r.top - s / 2) + "px";
            btn.appendChild(d);
            setTimeout(function () { d.remove(); }, 700);
        });
    });

    // 4. Hotspots: click to activate
    var spots = $(".hotspot");
    spots.forEach(function (h) {
        h.addEventListener("click", function () {
            spots.forEach(function (s) { s.classList.remove("active"); });
            h.classList.add("active");
        });
    });

    // 5. Heart toggle
    $(".p-heart").forEach(function (h) {
        h.addEventListener("click", function (e) {
            e.preventDefault();
            h.classList.toggle("fa-regular");
            h.classList.toggle("fa-solid");
            h.style.color = h.classList.contains("fa-solid") ? "#d6336c" : "";
        });
    });

    // 6. Subtle hero parallax (skipped for reduced motion)
    var img = document.querySelector(".banner_img img");
    if (img && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.addEventListener("scroll", function () {
            var y = window.pageYOffset;
            if (y < 900) img.style.translate = "0 " + y * 0.08 + "px";
        }, { passive: true });
    }

    // 7. Draggable-free slider arrows fallback: smooth scroll for track buttons
    $("[data-slide]").forEach(function (b) {
        b.addEventListener("click", function () {
            var t = document.querySelector(b.getAttribute("data-slide"));
            if (t && t.scrollWidth > t.clientWidth) {
                t.scrollBy({ left: t.clientWidth * 0.8 * Number(b.getAttribute("data-dir")), behavior: "smooth" });
            }
        });
    });
})();
