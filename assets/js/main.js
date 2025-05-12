/*==================EMAIL JS=================*/
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_wlhpkv9', 'template_hjj0sif', contactForm, 'FbyQzk1g_nN2pwbIB')
            .then(() => {
                contactMessage.textContent = 'Message sent successfully!';
                setTimeout(() => {
                    contactMessage.textContent = '';
                }, 5000);
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                contactMessage.textContent = `Message not sent (Error: ${error.text})`;
            });
    };

    contactForm.addEventListener('submit', sendEmail);
});


contactForm.addEventListener('submit', sendEmail);

/*===================SHOW SCROLL UP============*/


/*===================SCROLL SECTIONS ACTIVE LINK==============*/


/*==================SCROLL REVEAL ANIMATION=================*/
