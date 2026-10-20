// ============================================
// SUNRISE - AWARDS & RECOGNITION PAGE SCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------
    // 1. Year Filter Functionality
    // ----------------------------------------
    const filterButtons = document.querySelectorAll(".award-filter-btn");
    const yearGroups = document.querySelectorAll(".awards-year-group");

    if (filterButtons.length && yearGroups.length) {
        filterButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const targetFilter = btn.getAttribute("data-filter");

                // Update active button state
                filterButtons.forEach(function (b) {
                    b.classList.remove("active");
                });
                btn.classList.add("active");

                // Filter year groups
                yearGroups.forEach(function (group) {
                    const groupYear = group.getAttribute("data-year");
                    if (targetFilter === "all" || groupYear === targetFilter) {
                        group.classList.remove("is-hidden");
                    } else {
                        group.classList.add("is-hidden");
                    }
                });
            });
        });
    }

    // ----------------------------------------
    // 2. Certificate Lightbox Modal
    // ----------------------------------------
    const modal = document.getElementById("certificateModal");
    const modalImage = document.getElementById("certificateModalImage");
    const modalTitle = document.getElementById("modalAwardTitle");
    const modalIssuer = document.getElementById("modalAwardIssuer");
    const modalDesc = document.getElementById("modalAwardDesc");
    const closeButton = document.getElementById("certificateModalClose");

    if (!modal || !modalImage) {
        return;
    }

    function openModal(triggerElement) {
        const certPath = triggerElement.getAttribute("data-certificate");
        if (!certPath) return;

        const title = triggerElement.getAttribute("data-title") || "Award & Recognition";
        const issuer = triggerElement.getAttribute("data-issuer") || "Sunrise Staffing Solutions Pvt. Ltd.";
        const desc = triggerElement.getAttribute("data-desc") || "";

        modalImage.src = certPath;
        modalImage.alt = title;

        if (modalTitle) modalTitle.textContent = title;
        if (modalIssuer) modalIssuer.textContent = issuer;
        if (modalDesc) modalDesc.textContent = desc;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        setTimeout(function () {
            if (!modal.classList.contains("active")) {
                modalImage.src = "";
            }
        }, 250);
    }

    // Attach listeners to clickable elements
    const triggers = document.querySelectorAll("[data-certificate]");
    triggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            openModal(trigger);
        });
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    // Backdrop click
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Keyboard ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});