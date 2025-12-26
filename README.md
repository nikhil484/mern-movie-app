# 🎬 MERN Movie Application

A full-stack **Movie Management & Rating Web App** built using the **MERN stack** with authentication, admin controls, search, sorting, pagination, and cloud deployment.

---

## 🚀 Live Application

- **Frontend (Vercel):**  
  👉 https://mern-movie-app-liard.vercel.app

- **Backend (Railway):**  
  👉 https://sincere-forgiveness-production.up.railway.app

---

## 🔐 Admin Credentials (For Reviewers)

Use the following credentials to access **Admin features**:

Email: admin@gmail.com
Password: admin123


(Admin users can add, edit, and delete movies.)

---

## 🧩 Tech Stack

**Frontend:** React (Vite), Material UI, Axios  
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose  
**Auth:** JWT  
**Media:** Cloudinary  
**Deployment:** Vercel (Frontend), Railway (Backend)

---

## ✨ Features

- User authentication (JWT)
- Role-based access (Admin / User)
- Add, edit, delete movies (Admin only)
- Upload posters via Cloudinary
- Rate movies (one vote per user)
- Average rating & vote count
- Live search (title & description)
- Sort by rating, duration, release date
- Filter by last week, month, 6 months, year
- Pagination on Home page

---

## ⚙️ Local Setup (Optional)

### Backend
```bash
cd backend
npm install
npm start

API Overview

POST /api/auth/login

POST /api/auth/register

GET /api/movies

POST /api/movies (Admin)

PUT /api/movies/:id (Admin)

DELETE /api/movies/:id (Admin)

POST /api/movies/:id/rate