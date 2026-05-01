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

```
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
```

---

# 📁 Project Structure

```
ecoSangam/
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
└── Readme.md
```

---

# ⚙️ Run Locally

## 1️⃣ Clone Repo

```bash
git clone https://github.com/UMESHRATHOD16/ecoSangam.git
cd ecoSangam
```

---

## 2️⃣ Install Dependencies

### Backend
```bash
cd server
npm install
```

### Frontend
```bash
cd ../client
npm install
```

---

## 3️⃣ Setup MongoDB

### Option A — Local MongoDB (used in this project)

Start MongoDB:

```bash
brew services start mongodb-community
```

Check:

```bash
mongosh
```

---

### Option B — MongoDB Atlas (optional)

- Create a cluster
- Get connection string
- Use it in `.env`

---

## 4️⃣ Create `.env` file (IMPORTANT)

Create this file: `server/.env`

### Sample `.env`

```env
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

# Gemini API (optional)
GEMINI_API_KEY=your_gemini_api_key
```

---

## 5️⃣ Run Backend

```bash
cd server
node server.js
```

Expected output:

```
MongoDB Connected
Server running on port 5000
```

---

## 6️⃣ Run Frontend

```bash
cd client
npm run dev
```

Open in browser: `http://localhost:5173`

---

# 🔗 Frontend ↔ Backend Connection

Make sure API calls point to backend: `http://localhost:5000`

Example:

```javascript
fetch("http://localhost:5000/api/...")
```

---

# ⚠️ Common Issues

### MongoDB not connected
- Check `MONGO_URI` in `.env`
- Ensure MongoDB is running: `brew services list`
- Try restarting MongoDB: `brew services restart mongodb-community`

---

### CORS Error
Add in `server/server.js`:

```javascript
import cors from "cors";
app.use(cors());
```

---

### .env not loading
Add in `server/server.js`:

```javascript
import dotenv from "dotenv";
dotenv.config();
```

---

### Port already in use

```bash
lsof -i :5000
kill -9 <PID>
```

---

### Node modules missing
```bash
npm install
```

---

### API requests failing
- Verify backend is running on port 5000
- Check network tab in browser DevTools
- Ensure `.env` variables are correct

---

# 🎯 Features

- ✅ User Authentication (JWT + Google OAuth)
- ✅ Carbon Footprint Tracking
- ✅ Eco Goals System
- ✅ AI-based Suggestions (Gemini API)
- ✅ Image-based Eco Scanner
- ✅ Email Notifications
- ✅ Real-time Dashboard

---

# 🧠 Important Concepts

To actually understand this project:

- How frontend calls backend (fetch)
- How routes → controllers → database works
- How authentication is handled (JWT tokens)
- How environment variables control behavior
- How CORS works between frontend and backend

---

# 📝 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v4.4 or higher)
- **Git**

---

# 📌 Notes

This project will work only if:
- ✅ MongoDB is running
- ✅ `.env` is properly configured
- ✅ Backend runs before frontend
- ✅ Both frontend and backend ports are available (3000, 5000, 5173)
- ✅ Internet connection for OAuth and Gemini API

---

# 🤝 Contributing

Feel free to fork this project and submit pull requests!

---

# 📧 Contact & Support

For questions or issues, please open a GitHub issue in this repository.

**Author**: UMESHRATHOD16

---

**Last Updated**: 2026-05-01
