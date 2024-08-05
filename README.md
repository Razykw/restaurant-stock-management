# Restaurant Stock Management(Angular for the frontend and NestJS for the backend)

## Overview

Restaurant Stock Management is a system designed to manage stock levels, track products, and handle inventory operations for restaurants. The system includes both backend and frontend components, providing a complete solution for restaurant inventory management.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Git



### Clone the repository:
   git clone https://github.com/Razykw/restaurant-stock-management.git
   ### Backend Setup
   1. Navigate to the backend directory:
   cd restaurant-stock-management/restaurant-stock-management-backend
   2.Install dependencies:
   npm install
   3.Set up the environment variables:
   Create a '.env file' in the restaurant-stock-management-backend directory.
   Add the necessary environment variables (e.g., database connection strings, API keys).
   4.Run the backend server:
   npm start
### Frontend Setup
1. Navigate to the frontend directory:
    cd ../restaurant-stock-management-frontend
2. Install dependencies:
   npm install
### Design Choices
### Modular Architecture
The project is structured into two separate modules: backend and frontend. This separation ensures a clear distinction of concerns and makes the application easier to manage and scale.

### RESTful API
The backend exposes a RESTful API for managing products and inventory. This design choice allows for flexibility in how the frontend communicates with the backend.

### Database
The backend uses a JSON file as a mock database. This can be replaced with a real database in a production environment.

### Error Handling
Comprehensive error handling is implemented to ensure that the application can gracefully handle unexpected situations.

### Running the Application
  ### Backend
  Ensure you are in the restaurant-stock-management-backend directory.
  Run the backend server:
      npm start
  ### Frontend
  Ensure you are in the restaurant-stock-management-frontend directory.
  Run the frontend application:
  'ng s'
  'ng s --open' for auto openning.
### Notes
  Ensure all dependencies are installed before running the application.
  The backend and frontend servers should be running simultaneously for the application to function correctly.

