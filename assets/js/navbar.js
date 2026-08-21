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

    let ticking = false;

    function updateNavbar() {

        if (window.scrollY > 50) {

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
        function (e) {

            // Prevent the document click handler from immediately closing the menu
            e.stopPropagation();

            toggleMenu();

        }
    );

    // Ensure touch devices don't trigger the document click handler when tapping the toggle
    // Also handle touch/pointer directly to make toggling reliable on iOS Safari/Chrome
    mobileToggle.addEventListener(
        "touchstart",
        function (e) {
            e.stopPropagation();
            // Toggle immediately on touchstart for better responsiveness on some iOS browsers
            toggleMenu();
        },
        { passive: true }
    );

    // Pointer events fallback (for devices that use pointer events)
    mobileToggle.addEventListener(
        "pointerdown",
        function (e) {
            e.stopPropagation();
            // Do not prevent default; just toggle
            toggleMenu();
        }
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

    let resizeTicking = false;

    function updateTopBarMobile() {
        try {
            const workHours = document.querySelector('a[aria-label="View Sunrise working hours"]');
            if (!workHours) return;
            if (window.innerWidth <= 768) {
                // use inline style with important to ensure visibility is hidden on all browsers
                try { workHours.style.setProperty('display','none','important'); } catch(e) { workHours.style.display = 'none'; }
            } else {
                try { workHours.style.removeProperty('display'); } catch(e) { workHours.style.display = ''; }
            }
        } catch (e) {
            // ignore
        }
    }

    // initial call
    updateTopBarMobile();

    window.addEventListener(
        "resize",
        function () {

            if (resizeTicking) {
                return;
            }

            window.requestAnimationFrame(function () {

                // Close menu when switching to desktop widths (>= 768)
                if (window.innerWidth >= 768) {
                    closeMenu();
                }

                // show/hide top bar working hours on resize
                updateTopBarMobile();

                resizeTicking = false;

            });

            resizeTicking = true;

        },
        { passive: true }
    );

});
