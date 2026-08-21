// ============================================
// SUNRISE - NAVBAR
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("mainNavbar");
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");


    // --------------------------------------------
    // Safety check
    // --------------------------------------------

    if (!navbar) {
        return;
    }


    // --------------------------------------------
    // Sticky Navbar
    // --------------------------------------------

    function handleScroll() {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll
    );


    handleScroll();


    // --------------------------------------------
    // Mobile Menu
    // --------------------------------------------

    if (!mobileToggle || !navMenu) {
        return;
    }


    const icon = mobileToggle.querySelector("i");


    function openMenu() {

        navMenu.classList.add("open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );


        if (icon) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }

    }


    function closeMenu() {

        navMenu.classList.remove("open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );


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


    mobileToggle.addEventListener(
        "click",
        toggleMenu
    );


    // --------------------------------------------
    // Close menu after clicking a link
    // --------------------------------------------

    navMenu
        .querySelectorAll(".nav-link")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        });


    // --------------------------------------------
    // Close menu when clicking outside
    // --------------------------------------------

    document.addEventListener(
        "click",
        function (event) {

            const clickedInsideNavbar =
                navbar.contains(event.target);

            if (!clickedInsideNavbar) {

                closeMenu();

            }

        }
    );


    // --------------------------------------------
    // Close menu on Escape
    // --------------------------------------------

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    // --------------------------------------------
    // Close menu when switching to desktop
    // --------------------------------------------

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 768) {

                closeMenu();

            }

        }
    );

});