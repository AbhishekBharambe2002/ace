Employee & Department Management System

A MERN + TypeScript application for managing Departments and Employees.

Backend: Node.js, Express, TypeScript, MongoDB (Mongoose)

Frontend: React (TypeScript, Material UI, Formik, Yup)

🚀 Features

Manage Departments (Add, Update, Delete, List)

Manage Employees (Add, Update, Delete, List)

Country/State/City selection via external API

Form validation with Formik + Yup

REST API backend + React UI frontend
```bash
1. Clone the repository
git clone https://github.com/your-username/Employee-Department-App.git
cd Employee-Department-App

2. Install dependencies for the backend
cd backend
npm install

3. Install dependencies for the frontend
cd ../frontend
npm install

4. Set up environment variables
Backend .env

Create a .env file inside the backend directory:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-db

Frontend .env

Create a .env file inside the frontend directory:

REACT_APP_API_URL=http://localhost:5000/api/v1

5. Run the application
Run backend (development):
cd backend
npm run dev


Backend will be available at 👉 http://localhost:5000

Run frontend (development):
cd frontend
npm start
```

Frontend will be available at 👉 http://localhost:3000


