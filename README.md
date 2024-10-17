# periodtracker


Period Tracker Web Application
Overview
The Period Tracker is a web application designed to help users log and track their menstrual cycles. It allows users to register, log their period cycles, view a calendar with their period days marked, and see their period history for better understanding and predictions of future cycles.

Features
User Registration: Users can create an account by providing a username, email, password, and age.
User Login: Users can log into their accounts securely with email and password.
Cycle Logging: Users can add start and end dates for their period cycles.
Period Log: Users can view a history of their logged periods, providing insights into their cycle patterns.
Calendar View: A calendar displays the days of the user’s periods, allowing for easy visualization of their menstrual cycles.
Next Cycle Estimation: The application calculates and displays the estimated dates for the user’s next period based on the logged cycles.
Tech Stack
Frontend:
HTML
CSS (with responsive design)
JavaScript (for dynamic functionality)
FullCalendar library for calendar visualization
Backend:
Node.js with Express for server-side handling
MySQL database for storing user data and period logs
JSON Web Tokens (JWT) for user authentication
Bcrypt for password hashing
Setup Instructions
Prerequisites
Node.js and npm installed on your machine.
MySQL server installed and running.
Installation
Clone the Repository

bash
Copy code
git clone <repository-url>
cd <repository-directory>
Install Dependencies

bash
Copy code
npm install
Setup the Database

Create a MySQL database named PeriodTrackerApp.
Create the following tables:
sql
Copy code
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT NOT NULL
);

CREATE TABLE Period_Cycles (
    cycle_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    cycle_length INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
Run the Application

Start the server:
bash
Copy code
node server.js
Open your browser and go to http://localhost:3000.
Usage
Register a new account to start logging periods.
After logging in, you can add new period cycles and view them on the calendar.
The period log will show previous cycles and the estimated next cycle.
Contribution
Contributions are welcome! Please follow the standard Git workflow for contributing to this project.

License
This project is licensed under the MIT License.

Acknowledgments
FullCalendar for the calendar component.
Bcrypt for secure password storage.
Node.js and Express for server-side logic.
