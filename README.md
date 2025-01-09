# Bob's Corn Store 🌽

## Overview

A full-stack application implementing a rate-limited corn selling system. This project demonstrates the implementation of a fair trade policy where each customer can purchase only one corn per minute, enforced through a PostgreSQL-based rate limiter.

## Features

- Rate-limited API endpoint (1 corn per customer per minute)
- PostgreSQL-based rate limiting implementation
- Modern React frontend with Shadcn UI components
- Real-time purchase history tracking
- Client identification through cookies

## Tech Stack

### Backend

- Node.js
- PostgreSQL
- Express.js
- CORS middleware

### Frontend

- Next.js
- React
- Shadcn UI
- Axios for API calls

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v16 or higher)
- PostgreSQL
- npm (Node.js package manager)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/OrualAranda/Bob-s-corn.git
cd your-repository
```

### 2. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd corn-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a PostgreSQL database named `CornSalesDB`

4. Set up the database schema:

   ```sql
   CREATE TABLE purchases (
       id SERIAL PRIMARY KEY,
       client_id VARCHAR(50) NOT NULL,
       purchase_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
       success BOOLEAN DEFAULT true
   );

   CREATE INDEX idx_client_purchase_time ON purchases(client_id, purchase_time);
   ```

5. Environment variables are already set in the `.env` file with the following settings:
```env
PORT=3002
DB_USER=postgres_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=CornSalesDB
FRONTEND_URL=http://localhost:3000
```

Note: but you can modify to test in your local environment and change based on what is requested here
```
# Puerto para la aplicación
PORT=3000  # Cambia esto por el puerto que uses en tu máquina local

# Configuración de la base de datos
DB_USER=postgres_user  # El usuario de tu base de datos
DB_PASSWORD=your_password  # La contraseña de tu base de datos
DB_HOST=localhost  # Dirección del servidor de base de datos
DB_PORT=5432  # El puerto que usa PostgreSQL (generalmente es 5432)
DB_NAME=my_database  # Nombre de tu base de datos

FRONTEND_URL=http://localhost:3000 # URL del frontend
```

6. Start the backend server:
   ```bash
   npm run start
   ```

### 3. Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd corn-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create the .env file in the root of the project and add the following environment variable:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3002/api/corn
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Click the purchase button to buy corn
3. View your purchase history on the same page
4. Note: To test the rate limiting functionality, use two different browsers as client identification is cookie-based

## API Endpoints

- `POST /api/corn/purchase` - Attempt to purchase corn
  - Returns 200 🌽 for successful purchase
  - Returns 429 Too Many Requests if rate limit exceeded
- `GET /api/corn/history` - Retrieves the list of purchases
- Returns 200 list obtained successfully

## Development Notes

- The rate limiter is implemented at the database level for reliability
- Client identification is managed through browser cookies
- Frontend and backend must run on different ports locally
