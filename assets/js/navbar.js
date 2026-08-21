// ============================================
// SUNRISE - NAVBAR
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("mainNavbar");

    const mobileToggle =
        document.getElementById("mobileToggle");

    const navMenu =
        document.getElementById("navMenu");


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

    if (mobileToggle) {

        mobileToggle.addEventListener(
            "click",
            function () {

                navMenu.classList.toggle("open");

                const icon =
                    mobileToggle.querySelector("i");

                if (navMenu.classList.contains("open")) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );

    }


    // --------------------------------------------
    // Close menu after clicking link
    // --------------------------------------------

    document
        .querySelectorAll(".nav-link")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove("open");

                    const icon =
                        mobileToggle?.querySelector("i");

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }
            );

        });

});