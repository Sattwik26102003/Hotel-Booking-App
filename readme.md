Hotel Booking App 

This is a hotel booking app similar to Airbnb, where users can register, log in, view properties listed by others, and also list their own properties with pictures and details. The app is built with a React frontend, Node.js backend, and PostgreSQL as the database.

Features

- User Authentication: Users can register, log in, and manage their accounts.
- Property Listing: Users can view all available properties listed by others.
- Add Property: Users can add their own properties by uploading pictures and providing property details.
- Property Search: Users can search for properties by different criteria.
- Responsive UI: The frontend is built with React and styled to be responsive.

Technologies Used

- Frontend: React, JSX, CSS, Axios
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Authentication: JWT (JSON Web Tokens)
- File Upload: Multer (for property images)

Setup Instructions

Follow these steps to get the project up and running:

1. Clone the Repository

git clone <repository-url>
cd hotel-booking-app

2. Set Up the PostgreSQL Database

- Install PostgreSQL if you haven't already.
- Create a new database called hotel_booking.
- Create two tables: users for storing user data and accommodation for storing property details.

SQL for creating the tables:

-- Users table
CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    );

-- Accommodation table
CREATE TABLE accomodation (
    accomodation_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    address VARCHAR(255),
    photos TEXT[], -- Array of strings
    description TEXT,
    perks TEXT[], -- Array of strings
    extraInfo TEXT,
    checkIn INTEGER,
    checkOut INTEGER,
    maxGuests INTEGER,
    userid INTEGER REFERENCES users(userid)
);
3. Configure the Database Connection

In the backend, configure the connection to your PostgreSQL database. You can do this in a .env file.


Create a .env file in the root of the project:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=hotel_booking
JWT_SECRET=your_jwt_secret

4. Install Server Dependencies

Navigate to the backend folder and run:

cd server
npm install

5. Install Client Dependencies

In the frontend folder, run:

cd client
npm install

6. Run the Backend Server

Start the backend server using Nodemon for auto-reloading during development:

cd server
npm run dev

7. Run the Frontend

In another terminal window, navigate to the client folder and run:

cd client
npm run dev


Your frontend should now be running on http://localhost:3000 (default React port), and your backend API should be running on http://localhost:5000 (or whatever port you have set in the backend).

8. Register or Log in

To register a new user, go to the registration page on the frontend, provide the username, email, and password, and submit the form. After registration, you can log in using the login page with the credentials you created.

9. Add and View Properties

Once logged in, you can view all the properties listed by other users. You can also add your own properties by providing the property details and uploading pictures.

Conclusion

This is a hotel booking app that replicates core features of Airbnb. It is fully functional with the ability for users to register, log in, add and manage properties, and view all properties listed by others.
Feel free to extend this application with more features such as payment integration, reviews and ratings, etc.
