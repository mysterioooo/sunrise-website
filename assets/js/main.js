// ============================================
// SUNRISE - MAIN JAVASCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // ==========================================
    // 1. Butter-Smooth Scroll Reveal Animation
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".reveal, .service-card, .client-logo-card, .client-page-card, .award-card, .gallery-item, .about-highlight"
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active", "is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("active", "is-visible");
        });
    }

    // ==========================================
    // 2. Statistics Counter Animation
    // ==========================================

    const statsCard = document.querySelector(".stats-card");

    if (statsCard && !reduceMotion && "IntersectionObserver" in window) {
        const statNumberElements = statsCard.querySelectorAll(".stat-number");

        function animateNumber(el, targetNumber, suffix, duration) {
            const startNumber = targetNumber > 1000 ? Math.floor(targetNumber * 0.9) : 0;
            const startTime = performance.now();

            function update(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic curve
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(startNumber + (targetNumber - startNumber) * easeOut);

                el.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = targetNumber + suffix;
                }
            }

            requestAnimationFrame(update);
        }

        const statsObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        statNumberElements.forEach(function (el) {
                            const rawText = el.textContent.trim();
                            const match = rawText.match(/^(\d+)(\+?)$/);

                            if (match) {
                                const target = parseInt(match[1], 10);
                                const suffix = match[2] || "";
                                animateNumber(el, target, suffix, 1400);
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.25
            }
        );

        statsObserver.observe(statsCard);
    }

    // ==========================================
    // 3. Dynamic Current Year in Footer
    // ==========================================

    const yearElements = document.querySelectorAll(".current-year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });

    // ==========================================
    // 4. Smooth Anchor Scrolling Helper
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId !== "#" && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: reduceMotion ? "auto" : "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

});
