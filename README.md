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

## INTERFACE
Here's a detailed breakdown of the **registration**, **login**, **add period cycle**, **calendar display**, and **next estimated date** features for your period tracker application. This will help you understand the user interface (UI) and backend interactions required for each feature.

### 1. User Registration and Login

#### Registration Page

![Screenshot from 2024-10-17 22-22-09](https://github.com/user-attachments/assets/14d24af9-30eb-4a00-bc53-d3fd8c9932c8)

**UI Elements:**
- **Input Fields**:
  - Username
  - Email
  - Password
  - Age
- **Button**: Register

**Functionality:**
- When the user fills out the registration form and clicks the "Register" button, the application should:
  - Validate the input (e.g., check for empty fields, valid email format).
  - Send a POST request to the server (e.g., `/register`) with the user details.
  - On success, display a message (e.g., "Registration successful") and redirect to the login page.
  - On failure, display an error message (e.g., "Email already exists").

 ![Screenshot from 2024-10-17 22-21-49](https://github.com/user-attachments/assets/61e030f5-05f9-416f-9104-e82e414b5d4d)

 ![Screenshot from 2024-10-17 22-21-32](https://github.com/user-attachments/assets/31388272-1af0-46d4-972a-e0f8a83cf83e)


#### Login Page

**UI Elements:**
- **Input Fields**:
  - Email
  - Password
- **Button**: Login

**Functionality:**
- When the user fills out the login form and clicks the "Login" button, the application should:
  - Validate the input.
  - Send a POST request to the server (e.g., `/login`) with the email and password.
  - On successful authentication, store the token (if using JWT) and redirect the user to the dashboard.
  - On failure, display an error message (e.g., "Invalid credentials").

![Screenshot from 2024-10-17 22-23-02](https://github.com/user-attachments/assets/5de3da5a-00a7-406f-a587-0b865fe28954)



### 2. Adding Period Cycle

**UI Elements:**
- **Input Fields**:
  - Start Date (date picker)
  - End Date (date picker)
- **Button**: Add Cycle

**Functionality:**
- When the user selects the start and end dates and clicks the "Add Cycle" button, the application should:
  - Validate the input dates (ensure start date is before end date).
  - Calculate the cycle length (if needed).
  - Send a POST request to the server (e.g., `/cycle`) with the cycle details.
  - On success, display a success message and update the calendar.


![Screenshot from 2024-10-17 22-23-43](https://github.com/user-attachments/assets/023875ef-8d82-4c41-b3bf-858e8159f276)
![Screenshot from 2024-10-17 22-23-54](https://github.com/user-attachments/assets/f2a6f731-f4a8-400b-ba5e-dc5ff62686eb)


### 3. Calendar Display

Use **FullCalendar** to display the periods visually on a calendar. When a period is added, update the calendar to reflect the new period.

![Screenshot from 2024-10-17 22-24-44](https://github.com/user-attachments/assets/2a8d902a-980e-4b3e-a7ce-e5f8f669d3cd)
![Screenshot from 2024-10-17 22-24-49](https://github.com/user-attachments/assets/e63e6226-3b53-43d9-8c7d-3e4e770b38f0)


### 4. Next Estimated Date Calculation

To estimate the next period date, you can use the information about the last cycle to predict the next one. This is often based on the cycle length (e.g., 28 days).

**Functionality:**
- After adding a new cycle, calculate the next expected period start date based on the current cycle's end date and cycle length.
- Display this information in the UI.

![Screenshot from 2024-10-17 22-24-02](https://github.com/user-attachments/assets/0bd8d748-4188-434f-a2e3-d39e15c6c357)


### Summary of Features

1. **Registration and Login**: Users can register and log in to the application.
2. **Add Period Cycle**: Users can input start and end dates for their period cycles, which are stored in the database.
3. **Calendar Display**: The calendar visually represents the period days, making it easy to see cycles at a glance.
4. **Next Estimated Date**: After adding a cycle, the next estimated start date for the period is calculated and displayed.


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










