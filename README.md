# EngageRwanda

EngageRwanda is a citizen engagement platform that facilitates communication between citizens and government agencies. It allows citizens to submit complaints and feedback while enabling agencies to respond and manage these submissions effectively.

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App

### Backend
- **Framework**: Spring Boot 3.4
- **Language**: Java 17
- **Security**: Spring Security with JWT Authentication
- **Database Access**: Spring Data JPA
- **Database**: PostgreSQL
- **Documentation**: Springdoc OpenAPI (Swagger)
- **Build Tool**: Maven

## System Architecture

EngageRwanda follows a typical client-server architecture:

1. **Frontend**: React SPA application that communicates with the backend API
2. **Backend**: RESTful API built with Spring Boot that handles business logic and data persistence
3. **Database**: PostgreSQL for data storage

## Core Features

1. **Authentication System**
   - User registration and login
   - JWT-based authentication
   - Role-based access control (Citizens, Agency Users, Admins)

2. **Complaint Management**
   - Creation and submission of complaints by citizens
   - Tracking complaint status
   - Agency responses to complaints

3. **User Management**
   - Citizen profiles
   - Agency accounts
   - Administrative controls

4. **Dashboard & Analytics**
   - Status tracking
   - Response metrics
   - Reporting features

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 14 or higher
- npm or yarn
- PostgreSQL

### Backend Setup
1. Clone the repository
   ```
   git clone https://github.com/annick975/EngageRwanda
   ```

2. Navigate to the backend directory
   ```
   cd EngageRwanda
   ```

3. Configure the database in `src/main/resources/application.properties` or use environment variables:
   - DATABASE_URL
   - DATABASE_USERNAME
   - DATABASE_PASSWORD
   - JWT_SECRET
   - CORS_ALLOWED_ORIGINS

4. Build and run the application
   ```
   ./mvnw spring-boot:run
   ```
   
   The backend will be available at http://localhost:8080

### Frontend Setup
1. Navigate to the frontend directory
   ```
   cd frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure the API URL in the environment file or configuration

4. Start the development server
   ```
   npm start
   ```
   
   The frontend will be available at http://localhost:3000

## API Endpoints

The application provides the following key endpoints:

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Authenticate and get JWT token

- **Complaints**
  - `GET /api/complaints` - List complaints
  - `POST /api/complaints` - Create a new complaint
  - `GET /api/complaints/{id}` - View a specific complaint
  - `PUT /api/complaints/{id}` - Update a complaint

- **Citizens**
  - `GET /api/citizens/profile` - Get citizen profile
  - `PUT /api/citizens/profile` - Update citizen profile

- **Agencies**
  - `GET /api/agencies` - List agencies
  - `GET /api/agencies/{id}` - Get agency details

## Deployment

The application is configured for deployment to cloud platforms:
- Backend: Heroku or similar Java-supporting PaaS
- Frontend: Netlify, Vercel, or similar static site hosting

