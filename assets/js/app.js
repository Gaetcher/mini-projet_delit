/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../styles/app.scss';

// start the Stimulus application
import '../bootstrap';

import FieldChecker from "./tools/FieldChecker.js";

const contactForm = document.getElementById("contact-form"),
    button = document.getElementById("send-button"),
    message = document.getElementById('send-message');

contactForm.addEventListener("submit", (e) => onSumbmit(e));

const onSumbmit = (e) => {
    e.preventDefault();
    if (message.classList.contains("d-block")) {
        message.classList.add("d-none");
        message.classList.remove("d-block");
    }
    if (isFormValid()) {
        sendForm();
        button.classList.remove("d-block");
        button.classList.add("d-none");
        message.textContent = "Envoi du message...";
        message.classList.remove("d-none");
        message.classList.add("d-block");
    }
}

const isFormValid = () => {
    let contactName = new FieldChecker(contactForm.elements["contact_name"], "userInfo"),
    contactFirstname = new FieldChecker(contactForm.elements["contact_firstname"], "userInfo"),
    contactEmail = new FieldChecker(contactForm.elements["contact_email"], "email"),
    contactSubject = new FieldChecker(contactForm.elements["contact_subject"], "subject"),
    contactMessage = new FieldChecker(contactForm.elements["contact_message"], "text"),
    isFormValid = true,
    checkArray = [
        contactName.passValidation,
        contactFirstname.passValidation,
        contactEmail.passValidation,
        contactSubject.passValidation,
        contactMessage.passValidation
    ];
    for (const item of checkArray) {
        if (!item) {
            return isFormValid = false;
        }
    }

    return isFormValid;
}

const sendForm = () => {
    let url = contactForm.action;
    const formData = new FormData(contactForm);

    fetch(url, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        let isSuccess = false;
        if (data.success) {
            return isSuccess = true;
        } else {
            return isSuccess = false;
        }
    })
    .then((isSucces) => resultManagement(isSucces))
    .catch((error) => console.error(error));
}

const resultManagement = (isSuccess) => {
    if (isSuccess) {
        message.textContent = "Votre message a bien été envoyé";
        contactForm.reset();
        button.classList.add("d-block");
        button.classList.remove("d-none");
    } else {
        message.textContent = "Votre formulaire est incorrect";
        button.classList.add("d-block");
        button.classList.remove("d-none");
    }
}