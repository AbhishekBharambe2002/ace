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

# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env <<EOL
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-db
EOL

# Run in development
npm run dev


# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env <<EOL
REACT_APP_API_URL=http://localhost:5000/api/v1
EOL

# Run in development
npm start


