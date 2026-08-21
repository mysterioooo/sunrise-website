// ============================================
// SUNRISE - GALLERY
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems =
        Array.from(
            document.querySelectorAll(".gallery-item")
        );

    const filterButtons =
        document.querySelectorAll(".gallery-filter");

    const emptyState =
        document.getElementById("galleryEmpty");

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("galleryLightboxImage");

    const closeButton =
        document.getElementById("galleryLightboxClose");

    const previousButton =
        document.getElementById("galleryLightboxPrev");

    const nextButton =
        document.getElementById("galleryLightboxNext");


    if (!galleryItems.length) {
        return;
    }


    let currentIndex = 0;

    let visibleItems = [...galleryItems];


    // ========================================
    // FILTER
    // ========================================

    function filterGallery(category) {

        visibleItems = [];

        galleryItems.forEach(function (item) {

            const itemCategory =
                item.getAttribute("data-category");


            if (
                category === "all" ||
                itemCategory === category
            ) {

                item.setAttribute(
                    "data-hidden",
                    "false"
                );

                visibleItems.push(item);

            } else {

                item.setAttribute(
                    "data-hidden",
                    "true"
                );

            }

        });


        if (emptyState) {

            if (visibleItems.length === 0) {

                emptyState.classList.add("active");

            } else {

                emptyState.classList.remove("active");

            }

        }

    }


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const filter =
                button.getAttribute("data-filter");


            filterButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            button.classList.add("active");


            filterGallery(filter);

        });

    });


    // ========================================
    // OPEN LIGHTBOX
    // ========================================

    function openLightbox(item) {

        currentIndex =
            visibleItems.indexOf(item);


        if (currentIndex < 0) {
            currentIndex = 0;
        }


        showImage();


        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function showImage() {

        const item =
            visibleItems[currentIndex];


        if (!item) {
            return;
        }


        const image =
            item.querySelector("img");


        if (!image) {
            return;
        }


        lightboxImage.src =
            image.getAttribute("src");


        lightboxImage.alt =
            image.getAttribute("alt") || "Gallery image";

    }


    galleryItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                openLightbox(item);

            }
        );

    });


    // ========================================
    // NEXT IMAGE
    // ========================================

    function showNext() {

        if (!visibleItems.length) {
            return;
        }


        currentIndex++;

        if (
            currentIndex >=
            visibleItems.length
        ) {

            currentIndex = 0;

        }


        showImage();

    }


    // ========================================
    // PREVIOUS IMAGE
    // ========================================

    function showPrevious() {

        if (!visibleItems.length) {
            return;
        }


        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                visibleItems.length - 1;

        }


        showImage();

    }


    nextButton.addEventListener(
        "click",
        showNext
    );


    previousButton.addEventListener(
        "click",
        showPrevious
    );


    // ========================================
    // CLOSE
    // ========================================

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

        lightboxImage.src = "";

    }


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    // Click outside

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    // ========================================
    // KEYBOARD
    // ========================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox.classList.contains("active")
            ) {

                return;

            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowRight") {

                showNext();

            }


            if (event.key === "ArrowLeft") {

                showPrevious();

            }

        }
    );


    // ========================================
    // INITIAL STATE
    // ========================================

    filterGallery("all");

});