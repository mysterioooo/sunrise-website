// ============================================
// SUNRISE - NAVBAR JAVASCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("mainNavbar");
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (!navbar) {
        return;
    }

    // --------------------------------------------
    // Sticky Scrolled Navbar State
    // --------------------------------------------
    let ticking = false;

    function updateNavbar() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        ticking = false;
    }

    window.addEventListener(
        "scroll",
        function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        },
        { passive: true }
    );

    updateNavbar();

    // --------------------------------------------
    // Mobile Navigation Menu Toggle
    // --------------------------------------------
    if (!mobileToggle || !navMenu) {
        return;
    }

    const icon = mobileToggle.querySelector("i");

    function openMenu() {
        navMenu.classList.add("open");
        mobileToggle.setAttribute("aria-expanded", "true");
        mobileToggle.setAttribute("aria-label", "Close navigation");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }
    }

    function closeMenu() {
        navMenu.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.setAttribute("aria-label", "Open navigation");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }

    function toggleMenu() {
        if (navMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    mobileToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking any nav-link
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    // Close menu when clicking outside navbar
    document.addEventListener("click", function (event) {
        if (!navbar.contains(event.target)) {
            closeMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Close mobile menu when viewport expands to desktop
    let resizeTimer = null;
    window.addEventListener(
        "resize",
        function () {
            if (resizeTimer) return;
            resizeTimer = setTimeout(function () {
                if (window.innerWidth >= 768) {
                    closeMenu();
                }
                resizeTimer = null;
            }, 100);
        },
        { passive: true }
    );

});
