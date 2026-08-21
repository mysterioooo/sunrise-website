// ============================================
// SUNRISE - CLIENT FILTER
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const filterButtons =
        document.querySelectorAll(".client-filter");

    const clientCards =
        document.querySelectorAll(".client-page-card");

    const countElement =
        document.getElementById("visibleClientCount");


    if (!filterButtons.length || !clientCards.length) {
        return;
    }


    function updateClientCount() {

        let visibleCount = 0;

        clientCards.forEach(function (card) {

            if (card.dataset.hidden !== "true") {
                visibleCount++;
            }

        });

        if (countElement) {
            countElement.textContent = visibleCount;
        }

    }


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const filter =
                button.getAttribute("data-filter");


            // Active button

            filterButtons.forEach(function (item) {

                item.classList.remove("active");

            });

            button.classList.add("active");


            // Filter cards

            clientCards.forEach(function (card) {

                const category =
                    card.getAttribute("data-category");


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.setAttribute(
                        "data-hidden",
                        "false"
                    );

                } else {

                    card.setAttribute(
                        "data-hidden",
                        "true"
                    );

                }

            });


            updateClientCount();

        });

    });


    // Initial state

    clientCards.forEach(function (card) {

        card.setAttribute(
            "data-hidden",
            "false"
        );

    });

    updateClientCount();

});