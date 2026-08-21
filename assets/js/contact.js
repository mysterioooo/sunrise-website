// ============================================
// SUNRISE - CONTACT FORM
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("contactForm");

    const message =
        document.getElementById("contactFormMessage");


    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const company =
            document.getElementById("company").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const service =
            document.getElementById("service").value;

        const enquiryMessage =
            document.getElementById("message").value.trim();


        if (
            !name ||
            !phone ||
            !email ||
            !service ||
            !enquiryMessage
        ) {

            return;

        }


        // ====================================
        // WhatsApp enquiry
        // ====================================

        const whatsappMessage =

            `Hello Sunrise Team,%0A%0A` +

            `I would like to enquire about your services.%0A%0A` +

            `Name: ${encodeURIComponent(name)}%0A` +

            `Company: ${encodeURIComponent(company || "Not provided")}%0A` +

            `Phone: ${encodeURIComponent(phone)}%0A` +

            `Email: ${encodeURIComponent(email)}%0A` +

            `Service: ${encodeURIComponent(service)}%0A` +

            `Requirement: ${encodeURIComponent(enquiryMessage)}`;


        const whatsappUrl =
            `https://wa.me/918446007871?text=${whatsappMessage}`;


        if (message) {

            message.classList.add("active");

        }


        // Open WhatsApp

        window.open(
            whatsappUrl,
            "_blank"
        );


        // Reset form

        form.reset();

    });

});