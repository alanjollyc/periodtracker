# periodtracker

Below is a structured explanation of the Period Tracker web application .(BACKEND-MYSQL ,FRONTEND-HTML,JS,CSS)

---

# Period Tracker Web Application

## Overview
The Period Tracker is a web application designed to help users log and track their menstrual cycles. It allows users to register, log their period cycles, view a calendar with their period days marked, and see their period history for better understanding and predictions of future cycles.

## Features
- **User Registration**: Users can create an account by providing a username, email, password, and age.
- **User Login**: Users can log into their accounts securely with email and password.
- **Cycle Logging**: Users can add start and end dates for their period cycles.
- **Period Log**: Users can view a history of their logged periods, providing insights into their cycle patterns.
- **Calendar View**: A calendar displays the days of the user’s periods, allowing for easy visualization of their menstrual cycles.
- **Next Cycle Estimation**: The application calculates and displays the estimated dates for the user’s next period based on the logged cycles.

## Tech Stack
- **Frontend**:
  - HTML
  - CSS (with responsive design)
  - JavaScript (for dynamic functionality)
  - FullCalendar library for calendar visualization
- **Backend**:
  - Node.js with Express for server-side handling
  - MySQL database for storing user data and period logs
  - JSON Web Tokens (JWT) for user authentication
  - Bcrypt for password hashing

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.
- MySQL server installed and running.

### Installation
1. **Clone the Repository**
   ```bash
   Clone the Repository or download the repository and extract the zip
   
   ```

2. **Install Dependencies**

   Go to the period-tracker-app directory in the terminal
   ```bash
   npm install
   npm init -y
   ```

4. **Setup the Database**
   - Create a MySQL database named `PeriodTrackerApp`.
   - Create the following tables:

   ```sql
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
   -- Reminders Table

   ```

5. **Run the Application**
   - Start the server:
   ```bash
   node server.js
   ```
   - Open your browser and go to `http://localhost:3000`.

### Usage
- Register a new account to start logging periods.
- After logging in, you can add new period cycles and view them on the calendar.
- The period log will show previous cycles and the estimated next cycle.

## contributors
- VML22CS024 AKASH K .
- VML22CS025 AKSA JOSE.
- VML22CS028 AKSHAY K.
- VML22CS030 ALAN JOLLY CHEERAMVELIL.
- VML22CS033 ALEN SALES K S.
- VML22CS039 AMAL KRISHNA M.


## Acknowledgments
- FullCalendar for the calendar component.
- Bcrypt for secure password storage.
- Node.js and Express for server-side logic.

---

