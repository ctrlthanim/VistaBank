document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset previous errors
    clearErrors();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate
    let isValid = true;

    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    }

    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (subject === '') {
        showError('subject', 'Subject is required');
        isValid = false;
    }

    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    if (isValid) {
        // Here you would typically send the data to your server
        alert('Form submitted successfully!');
        this.reset();
    }
});

function showError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    const inputElement = document.getElementById(field);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.classList.add('invalid');
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('input, textarea');

    errorMessages.forEach(error => error.style.display = 'none');
    inputs.forEach(input => {
        input.classList.remove('invalid');
        input.classList.remove('valid');
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
