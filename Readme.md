# 🌱 EcoSangam

EcoSangam is an AI-driven sustainability platform that helps users track, manage, and reduce their carbon footprint. It combines eco-goals, AI insights, and real-world impact into one system.

---

# 🚀 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Integrations
- Google OAuth (Passport)
- Email Service (Nodemailer)
- AI (Gemini API)

---

# 🧠 Architecture (Simple)

Client (React)  
↓  
API Calls (fetch)  
↓  
Backend (Express)  
↓  
Routes → Controllers  
↓  
Models (Mongoose)  
↓  
MongoDB  

---

# 📁 Project Structure

ecosangam/
│
├── client/        # Frontend (React + Vite)
│
├── server/        # Backend (Node + Express)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│
└── README.md

---

# ⚙️ Run Locally

## 1️⃣ Clone Repo

git clone https://github.com/UMESHRATHOD16/ecoSangam.git
cd ecoSangam

---

## 2️⃣ Install Dependencies

### Backend
cd server
npm install

### Frontend
cd ../client
npm install

---

## 3️⃣ Setup MongoDB

### Option A — Local MongoDB (used in this project)

Start MongoDB:

brew services start mongodb-community

Check:

mongosh

---

### Option B — MongoDB Atlas (optional)

- Create a cluster
- Get connection string
- Use it in `.env`

---

## 4️⃣ Create `.env` file (IMPORTANT)

Create this file:

server/.env

### Sample `.env`

PORT=5000

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/ecosangam

# Auth
JWT_SECRET=your_secret_key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret

# Email (optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

---

## 5️⃣ Run Backend

cd server
node server.js

Expected output:

MongoDB Connected  
Server running on port 5000  

---

## 6️⃣ Run Frontend

cd client
npm run dev

Open in browser:

http://localhost:5173

---

# 🔗 Frontend ↔ Backend Connection

Make sure API calls point to backend:

http://localhost:5000

Example:

fetch("http://localhost:5000/api/...")

---

# ⚠️ Common Issues

### MongoDB not connected
- Check MONGO_URI
- Ensure MongoDB is running

---

### CORS Error
Add in backend:

app.use(cors());

---

### .env not loading
Add in server.js:

import dotenv from "dotenv";
dotenv.config();

---

### Port already in use

lsof -i :5000  
kill -9 <PID>

---

# 🎯 Features

- User Authentication (JWT + Google OAuth)
- Carbon Footprint Tracking
- Eco Goals System
- AI-based Suggestions
- Image-based Eco Scanner
- Email Notifications

---

# 🧠 Important Concepts

To actually understand this project:

- How frontend calls backend (fetch)
- How routes → controllers → database works
- How authentication is handled
- How environment variables control behavior

---

# 📌 Notes

This project will work only if:
- MongoDB is running
- `.env` is properly configured
- Backend runs before frontend

---
