const API_BASE_URL = '/';
const CYCLE_ENDPOINT = 'cycle';
const REGISTER_ENDPOINT = 'register';
const LOGIN_ENDPOINT = 'login';
const LOG_ENDPOINT = 'log';

// Register a new user
function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;

    fetch(API_BASE_URL + REGISTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, age })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'User registered successfully') {
            loadPeriodLog(); // Load period log after registration
        }
    })
    .catch(error => showError('Registration failed. Please try again.'));
}

// Login user
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch(API_BASE_URL + LOGIN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            document.getElementById('cycle-section').style.display = 'block';
            document.getElementById('log-section').style.display = 'block';
            loadPeriodLog(); // Load the period log after login
            document.getElementById('calendar-section').style.display = 'block';
        } else {
            showError(data.message);
        }
    })
    .catch(error => showError('Login failed. Please check your credentials.'));
}

// Add period cycle
function addCycle() {
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const token = localStorage.getItem('token');

    fetch(API_BASE_URL + CYCLE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ start_date, end_date })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Cycle added successfully') {
            // Add the event to the calendar
            window.calendar.addEvent({
                title: 'Period',
                start: start_date,
                end: end_date,
                color: 'red' // Customize the color of the period days
            });
            loadPeriodLog(); // Reload the period log
        }
    })
    .catch(error => showError('Failed to add cycle. Please try again.'));
}

// Load period log
function loadPeriodLog() {
    const token = localStorage.getItem('token');
    fetch(API_BASE_URL + LOG_ENDPOINT, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        const periodLog = document.getElementById('period-log');
        periodLog.innerHTML = ''; // Clear existing log
        data.periods.forEach(period => {
            const li = document.createElement('li');
            li.textContent = `From: ${period.start_date} To: ${period.end_date}`;
            periodLog.appendChild(li);
        });

        // Calculate and display the estimated next period
        if (data.nextCycle) {
            alert(`Estimated Next Period: ${data.nextCycle}`);
        }
    })
    .catch(error => showError('Failed to load period log. Please try again.'));
}

// Initialize FullCalendar
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [] // Initialize with an empty array
    });
    calendar.render();
    window.calendar = calendar; // Store the calendar instance for later use
});

// Display error messages in the UI
function showError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 3000);
}

