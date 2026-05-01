# 🌿 EcoSangam – AI-Powered Sustainability Platform

## 🌍 Overview

**EcoSangam** is an AI-driven sustainability platform that empowers individuals to track, manage, and reduce their carbon footprint. It bridges awareness with action by helping users set eco-goals, contribute to verified offset programs, and stay consistently engaged through gamified features and AI support.

> **Vision:** Make sustainability accessible, actionable, and impactful for everyone.

---

## 🚀 Key Features

- 🌱 **Track & Visualize Carbon Footprint**  
  Analyze emissions across categories like transportation, home energy, and lifestyle.

- ⚖️ **Offset Emissions**  
  Support verified carbon offset programs and receive eco-certificates.

- 🎯 **Eco Goals & Streaks**  
  Build sustainable habits with a gamified system of goals, streaks, and rewards.

- 🤖 **AI Sustainability Assistant**  
  Powered by Gemini/OpenAI APIs for:
  - Personalized eco tips
  - Smart recommendations
  - Query-based assistance

- 📝 **Environmental Issue Reporting**  
  Raise issues that can be escalated to official portals (MoEFCC, CPCB).

- 📸 **Community Engagement**  
  Share eco-stories, progress, and inspire others.

---

## 🧠 Architecture (Simple View)

Client (React)
↓ (fetch API)
Backend (Express)
↓
Routes → Controllers
↓
Models (Mongoose)
↓
MongoDB


### Flow:
1. User interacts with frontend  
2. Frontend sends API requests  
3. Backend handles logic via controllers  
4. Data stored/retrieved from MongoDB  
5. Response sent back to frontend  

---

## 💻 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- JWT Authentication
- OAuth (Google)

### Database
- MongoDB (Mongoose)

### Integrations
- Gemini API / OpenAI (AI assistant)
- Nodemailer (emails)
- pdf-lib (certificates)
- Botpress (chat workflows)

---

## 📁 Project Structure

ecosangam/
│
├── client/ # Frontend (React + Vite)
├── server/ # Backend (Node + Express)
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│
└── README.md


---

## ⚙️ Run Locally

### 1️⃣ Clone Repository

git clone https://github.com/UMESHRATHOD16/ecoSangam.git
cd ecoSangam


---

### 2️⃣ Install Dependencies

#### Backend
cd server
npm install

#### Frontend
cd ../client
npm install


---

### 3️⃣ Setup MongoDB

#### Option A — Local MongoDB
brew services start mongodb-community
mongosh


#### Option B — MongoDB Atlas (recommended)
- Create cluster
- Copy connection string
- Add to `.env`

---

### 4️⃣ Create `.env` file (IMPORTANT)
Create inside `server/`

server/.env

#### Sample `.env`
PORT=5000

MongoDB

MONGO_URI=mongodb://127.0.0.1:27017/ecosangam

Auth

JWT_SECRET=your_secret_key

Google OAuth (optional)

GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret

Email (optional)

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password


---

### 5️⃣ Run Backend
cd server
node server.js

Expected output:

MongoDB Connected
Server running on port 5000


---

### 6️⃣ Run Frontend
cd client
npm run dev

Open:

http://localhost:5173


---

## 🔗 Frontend ↔ Backend Connection

Ensure API calls point to:
http://localhost:5000


Example:
```js
fetch("http://localhost:5000/api/...")

⚠️ Common Issues

MongoDB not connecting
Check MONGO_URI
Ensure MongoDB is running

CORS error

app.use(cors());
.env not loading
import dotenv from "dotenv";
dotenv.config();

Port already in use
lsof -i :5000
kill -9 <PID>

🚧 Challenges Faced
🌐 Real-time carbon calculation from diverse data sources
🧠 AI personalization and response accuracy
🎨 Building accessible and inclusive UI
📤 Integrating with government reporting systems

🧠 What This Project Demonstrates
Full-stack architecture understanding
API design and integration
AI + real-world problem solving
Database design with MongoDB
Authentication and user management


📢 Final Note
This project is not just about tracking carbon—it’s about changing behavior through technology.