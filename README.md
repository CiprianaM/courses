# Courses API

This is an API project for managing courses and their modules. It provides endpoints to create, read and update courses and modules. The project is Dockerized for easy deployment and scalability.

## Features

- CRUD operations for courses
- CRUD operations for modules associated with courses
- Docker containerization for easy deployment

## Technologies Used

- Node.js
- Express.js
- MySQL (or any other supported database)
- Docker

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ciprianam/courses.git
   ```

2. **Install dependencies:**

   ```bash
   cd courses
   npm install
   ```

3. **Environment Variables:**
   Create a .env file in the root directory and configure it based on the .env.example file provided. Adjust the database configuration according to your setup.

4. **Start the project locally:**

   ```bash
   npm start
   ```

5. **Test the service:**
   The API server should now be running at http://localhost:3000. You can use tools like Postman or cURL to interact with the endpoints.

6. **Docker Deployment:**
   You can run the server and the DB in Docker by executing:

   ```bash
   docker compose up -d --build
   ```

## API Documentation

Documentation to this API will be added in later versions.
