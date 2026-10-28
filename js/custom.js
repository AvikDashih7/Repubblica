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
            if (event.target.closest("a, [data-open-overlay]")) closeNav();
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") closeNav();
        });
        window.addEventListener("resize", function () {
            if (window.innerWidth > 992) closeNav();
        });
    }

    // Search and account overlays
    var activeOverlay = null;
    var overlayOpener = null;
    var overlayFocusTarget = null;
    var overlayTriggers = $("[data-open-overlay]");
    var cartTrigger = document.querySelector('[data-open-overlay="cartPanel"]');
    var cartItems = [];
    var currency = new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD"
    });

    function renderCart() {
        var emptyState = document.getElementById("cartEmpty");
        var cartList = document.getElementById("cartItems");
        var cartFooter = document.getElementById("cartFooter");
        var cartCount = document.getElementById("cartCount");
        if (!emptyState || !cartList || !cartFooter || !cartCount) return;

        var quantity = cartItems.reduce(function (total, item) {
            return total + item.quantity;
        }, 0);
        var subtotal = cartItems.reduce(function (total, item) {
            return total + item.price * item.quantity;
        }, 0);
        emptyState.hidden = cartItems.length > 0;
        cartFooter.hidden = cartItems.length === 0;
        cartCount.textContent = String(quantity);
        cartTrigger.setAttribute(
            "aria-label",
            "Open shopping bag, " + quantity + (quantity === 1 ? " item" : " items")
        );
        document.getElementById("cartItemLabel").textContent =
            "(" + quantity + (quantity === 1 ? " item" : " items") + ")";
        document.getElementById("cartSubtotal").textContent = currency.format(subtotal);
        cartList.replaceChildren();

        cartItems.forEach(function (item) {
            var row = document.createElement("article");
            row.className = "cart-item";
            var image = document.createElement("img");
            image.src = item.image;
            image.alt = "";
            var details = document.createElement("div");
            var name = document.createElement("p");
            name.className = "cart-item-name";
            name.textContent = item.name;
            var price = document.createElement("p");
            price.className = "cart-item-price";
            price.textContent = currency.format(item.price);
            var controls = document.createElement("div");
            controls.className = "cart-item-controls";
            var quantityControl = document.createElement("div");
            quantityControl.className = "cart-quantity";
            var decrement = document.createElement("button");
            decrement.type = "button";
            decrement.setAttribute("aria-label", "Decrease quantity of " + item.name);
            decrement.setAttribute("data-cart-action", "decrease");
            decrement.setAttribute("data-cart-id", item.id);
            decrement.textContent = "-";
            var quantityLabel = document.createElement("span");
            quantityLabel.textContent = String(item.quantity);
            var increment = document.createElement("button");
            increment.type = "button";
            increment.setAttribute("aria-label", "Increase quantity of " + item.name);
            increment.setAttribute("data-cart-action", "increase");
            increment.setAttribute("data-cart-id", item.id);
            increment.textContent = "+";
            quantityControl.append(decrement, quantityLabel, increment);
            var remove = document.createElement("button");
            remove.type = "button";
            remove.className = "cart-remove";
            remove.setAttribute("data-cart-action", "remove");
            remove.setAttribute("data-cart-id", item.id);
            remove.textContent = "Remove";
            controls.append(quantityControl, remove);
            details.append(name, price, controls);
            var lineTotal = document.createElement("strong");
            lineTotal.className = "cart-item-price";
            lineTotal.textContent = currency.format(item.price * item.quantity);
            row.append(image, details, lineTotal);
            cartList.appendChild(row);
        });
    }

    document.querySelectorAll(".product").forEach(function (product, index) {
        var nameElement = product.querySelector(".p-name");
        var priceElement = product.querySelector(".p-price b");
        var imageElement = product.querySelector(":scope > img");
        var details = product.querySelector(".p-price");
        if (!nameElement || !priceElement || !imageElement || !details) return;

        var priceMatch = priceElement.textContent.match(/[\d,]+(?:\.\d{2})?/);
        if (!priceMatch) return;
        var item = {
            id: String(index),
            name: nameElement.textContent.trim(),
            price: Number(priceMatch[0].replace(/,/g, "")),
            image: imageElement.src
        };
        var addButton = document.createElement("button");
        addButton.className = "add-to-cart";
        addButton.type = "button";
        addButton.setAttribute("aria-label", "Add " + item.name + " to bag");
        addButton.innerHTML = 'Add to bag <i class="fa-solid fa-plus" aria-hidden="true"></i>';
        details.parentElement.appendChild(addButton);
        addButton.addEventListener("click", function () {
            var existing = cartItems.find(function (cartItem) {
                return cartItem.id === item.id;
            });
            if (existing) {
                existing.quantity += 1;
            } else {
                cartItems.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: 1
                });
            }
            renderCart();
            cartTrigger.click();
        });
    });
    renderCart();

    var cartList = document.getElementById("cartItems");
    if (cartList) {
        cartList.addEventListener("click", function (event) {
            var button = event.target.closest("[data-cart-action]");
            if (!button) return;
            var item = cartItems.find(function (cartItem) {
                return cartItem.id === button.getAttribute("data-cart-id");
            });
            if (!item) return;
            var action = button.getAttribute("data-cart-action");
            if (action === "increase") item.quantity += 1;
            if (action === "decrease") item.quantity -= 1;
            if (action === "remove" || item.quantity <= 0) {
                cartItems = cartItems.filter(function (cartItem) {
                    return cartItem.id !== item.id;
                });
            }
            renderCart();
        });
    }

    function closeOverlay(restoreFocus) {
        if (!activeOverlay) return;
        var closedOverlay = activeOverlay;
        var opener = overlayOpener;
        var focusTarget = overlayFocusTarget;
        activeOverlay = null;
        overlayOpener = null;
        overlayFocusTarget = null;
        closedOverlay.classList.remove("is-open");
        closedOverlay.setAttribute("aria-hidden", "true");
        closedOverlay.inert = true;
        if (opener) opener.setAttribute("aria-expanded", "false");
        document.body.classList.remove("overlay-open");
        if (restoreFocus !== false && focusTarget) {
            focusTarget.focus({ preventScroll: true });
        }
    }

    overlayTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function () {
            var overlay = document.getElementById(trigger.getAttribute("aria-controls"));
            if (!overlay) return;
            if (activeOverlay === overlay) {
                closeOverlay();
                return;
            }
            closeOverlay(false);
            activeOverlay = overlay;
            overlayOpener = trigger;
            overlayFocusTarget =
                trigger.closest(".mobile-consult") && navToggle ? navToggle : trigger;
            trigger.setAttribute("aria-expanded", "true");
            overlay.inert = false;
            overlay.setAttribute("aria-hidden", "false");
            overlay.classList.add("is-open");
            document.body.classList.add("overlay-open");
            var initialFocus = overlay.querySelector(
                overlay.id === "searchPanel" ? "#siteSearchInput" :
                    overlay.id === "loginPanel" ? "#loginEmail" :
                        overlay.id === "consultPanel" ? "#consultName" :
                            ".overlay-close"
            );
            if (initialFocus) initialFocus.focus({ preventScroll: true });
        });
    });

    document.querySelectorAll(
        ".search-layer, .login-layer, .consult-layer, .cart-layer"
    ).forEach(function (overlay) {
        overlay.querySelectorAll("[data-close-overlay]").forEach(function (closeButton) {
            closeButton.addEventListener("click", function () {
                closeOverlay();
            });
        });
    });

    document.addEventListener("keydown", function (event) {
        if (!activeOverlay) return;
        if (event.key === "Escape") {
            closeOverlay();
            return;
        }
        if (event.key !== "Tab") return;
        var focusScope = activeOverlay.querySelector(
            ".search-panel, .login-dialog, .consult-dialog, .cart-dialog"
        );
        var focusable = focusScope
            ? Array.prototype.slice.call(focusScope.querySelectorAll(
                'a[href], button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])'
            )).filter(function (element) { return element.getClientRects().length > 0; })
            : [];
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    var searchForm = document.getElementById("siteSearchForm");
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            var input = document.getElementById("siteSearchInput");
            var message = document.getElementById("searchMessage");
            var results = document.getElementById("searchResults");
            var query = input.value.trim().toLowerCase();
            results.replaceChildren();
            if (!query) {
                message.textContent = "Enter a search term to find rooms, materials and products.";
                return;
            }
            var matches = Array.prototype.slice.call(
                document.querySelectorAll("main > section[id]")
            ).filter(function (section) {
                return section.textContent.toLowerCase().includes(query);
            }).slice(0, 5);
            message.textContent = matches.length
                ? "Matching sections for “" + input.value.trim() + "”"
                : "No matching sections found. Try a room, material or product name.";
            matches.forEach(function (section, index) {
                var heading = section.querySelector("h1, h2, h3");
                var result = document.createElement("a");
                result.className = "search-result";
                result.href = "#" + section.id;
                result.style.animationDelay = (index * 60) + "ms";
                var category = document.createElement("span");
                category.textContent = "Explore";
                var title = document.createElement("strong");
                title.textContent = heading ? heading.textContent.trim() : section.id;
                var arrow = document.createElement("i");
                arrow.className = "fa-solid fa-arrow-right";
                arrow.setAttribute("aria-hidden", "true");
                result.append(category, title, arrow);
                result.addEventListener("click", function () {
                    closeOverlay();
                });
                results.appendChild(result);
            });
        });
    }

    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            document.getElementById("loginMessage").textContent =
                "Sign-in is not connected yet. Your details have not been sent.";
            loginForm.reset();
        });
    }

    var consultForm = document.getElementById("consultForm");
    if (consultForm) {
        var consultDate = document.getElementById("consultDate");
        var localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10);
        consultDate.min = localToday;
        consultForm.addEventListener("submit", function (event) {
            event.preventDefault();
            document.getElementById("consultMessage").textContent =
                "Thanks — this demo recorded no booking. Please contact our showroom to confirm a time.";
            consultForm.reset();
            consultDate.min = localToday;
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