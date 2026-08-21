// ============================================
// SUNRISE - MAIN JAVASCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // Reveal Animation
    // ==========================================

    const revealElements =
        document.querySelectorAll(".reveal");


    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {

        const observer =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target
                                .classList
                                .add("active");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("active");

        });

    }


    // ==========================================
    // Current Year
    // ==========================================

    document
        .querySelectorAll(".current-year")
        .forEach(function (element) {

            element.textContent =
                new Date().getFullYear();

        });

});
