// ============================================
// SUNRISE - AWARDS PAGE
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const awardImages =
        document.querySelectorAll(".award-timeline-image");

    const modal =
        document.getElementById("certificateModal");

    const modalImage =
        document.getElementById("certificateModalImage");

    const closeButton =
        document.getElementById("certificateModalClose");


    if (!awardImages.length || !modal) {
        return;
    }


    // Open certificate

    awardImages.forEach(function (awardImage) {

        awardImage.addEventListener("click", function () {

            const imagePath =
                awardImage.getAttribute("data-certificate");

            if (!imagePath) {
                return;
            }

            modalImage.src = imagePath;

            modal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    // Close modal

    function closeModal() {

        modal.classList.remove("active");

        document.body.style.overflow = "";

        modalImage.src = "";

    }


    closeButton.addEventListener(
        "click",
        closeModal
    );


    // Click outside certificate

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeModal();

        }

    });


    // ESC key

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    });

});