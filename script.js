

// =====================
// THEME TOGGLE FUNCTIONALITY
// =====================
const themeButton = document.getElementById('theme-button');

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    themeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

themeButton.addEventListener('click', toggleDarkMode);

// Load saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    themeButton.textContent = '☀️';
}

// =====================
// RSVP FUNCTIONALITY
// =====================
const rsvpButton = document.getElementById('rsvp-button');
let count = 3; // Initial count matches default RSVPs

const addParticipant = (person) => {
    // Add new participant to list
    const participantList = document.querySelector('.rsvp-participants');
    const newParticipant = document.createElement('p');
    newParticipant.textContent = `⚽ ${person.name} from ${person.country} has RSVP'd.`;
    participantList.appendChild(newParticipant);
    
    // Update counter
    count++;
    document.getElementById('rsvp-count').textContent = `🚀 ${count} people have RSVP'd to this event!`;
    
    // Reset form and remove any error messages
    document.getElementById('rsvp-form').reset();
    const errorMsg = document.getElementById('email-error');
    if (errorMsg) errorMsg.remove();
};


// =====================
// FORM VALIDATION
// =====================
const validateForm = (event) => {
    event.preventDefault();
    let containsErrors = false;
    const inputs = document.querySelectorAll('#rsvp-form input');
    
    // Clear previous errors
    inputs.forEach(input => input.classList.remove('error'));
    
    // Create person object
    const person = {
        name: document.querySelector('input[name="name"]').value,
        country: document.querySelector('input[name="country"]').value,
        email: document.querySelector('input[type="email"]').value
    };
    
    // Validate each field
    if (person.name.length < 2) {
        document.querySelector('input[name="name"]').classList.add('error');
        containsErrors = true;
    }
    
    if (person.country.length < 2) {
        document.querySelector('input[name="country"]').classList.add('error');
        containsErrors = true;
    }
    
    if (!person.email.includes('@')) {
        document.querySelector('input[type="email"]').classList.add('error');
        containsErrors = true;
        
        if (!document.getElementById('email-error')) {
            const errorMsg = document.createElement('p');
            errorMsg.id = 'email-error';
            errorMsg.textContent = 'Please include an @ in the email address';
            errorMsg.style.color = 'red';
            errorMsg.style.marginTop = '5px';
            errorMsg.style.fontSize = '0.8em';
            document.querySelector('input[type="email"]').insertAdjacentElement('afterend', errorMsg);
        }
    }
    
    // Submit if valid
    if (!containsErrors) {
        addParticipant(person); // Pass person object
    }
};

// Event listener for form submission
rsvpButton.addEventListener('click', validateForm);
