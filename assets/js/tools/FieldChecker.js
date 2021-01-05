class FieldChecker {
    constructor(element, type) {
        this.element = element;
        this.type = type;
        this.minLength;
        this.maxLength;
        this.mailRegex = /^[a-z0-9.\._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
        this.passValidation = false;
        this.init();
    }

    init() {
        switch (this.type) {
            case "userInfo":
                this.minLength = 2;
                this.maxLength = 100;
                this.stringValidation();
                this.helper()
                break;
            case "email":
                this.emailValidation();
                this.helper()
                break
            case "subject":
                this.minLength = 2;
                this.maxLength = 100;
                this.stringValidation();
                this.helper()
                break;
            case "text":
                this.minLength = 10;
                this.textValidation();
                this.helper()
                break
            default:
                break;
        }
    }

    stringValidation() {
        if (this.minLength <= this.element.value.length && this.element.value.length <= this.maxLength) {
            this.passValidation = true;
        }
    }

    emailValidation() {
        if (this.mailRegex.test(this.element.value.toLowerCase())) {
            this.passValidation = true;
        }
    }

    textValidation() {
        if (this.minLength <= this.element.value.length) {
            this.passValidation = true;
        }
    }

    helper() {
        let helperElement = document.getElementById(this.type + "-helper");
        if (this.passValidation) {
            if (helperElement.classList.contains("d-block")) {
                helperElement.classList.remove("d-block");
                helperElement.classList.add("d-none");
            }
        } else {
            if (helperElement.classList.contains("d-none")) {
                helperElement.classList.remove("d-none");
                helperElement.classList.add("d-block");
            }
        }
    }
}

export default FieldChecker
