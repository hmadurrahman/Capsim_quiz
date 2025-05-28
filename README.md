# Capsim E-learning Assessment Tool

A full-stack E-learning assessment platform for instructors to assess participants, built with **Node.js (Express, SQLite)** and **React**.

---

## Features

- REST API for quiz questions, answers, and scoring
- Modern, responsive React UI
- Single and multiple choice questions
- Score calculation and instant feedback
- Report page with score distribution bar chart
- Clean, modular, production-ready codebase
- Automated tests (backend & frontend)
- Easy deployment (Render, Vercel, Netlify)
- SQL schema and seed data included

---

## Tech Stack

- **Backend:** Node.js, Express, SQLite
- **Frontend:** React, Chart.js, React Router
- **Testing:** Jest, Supertest, React Testing Library

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd e-learning-assessment
```

### 2. Database Setup

- Ensure you have `sqlite3` installed.
- The database will be created automatically, but you can initialize it manually:

```bash
cd backend
# IMPORTANT: The backend expects the database file at backend/src/models/assessment.db
# If you already have assessment.db in backend/, move it:
mv assessment.db src/models/
# Now initialize (or re-initialize) the database:
sqlite3 src/models/assessment.db < ./db.sql
```

### 3. Backend Setup

```bash
cd backend
npm install
npm start         # or: npx nodemon src/app.js (for auto-reload)
```

- The backend runs on `http://localhost:4000`

### 4. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env   # Create your .env file
npm start
```

- The frontend runs on `http://localhost:3000`

---

## Environment Variables

In `frontend/.env`:

```
REACT_APP_API_URL=http://localhost:4000/api
```

---

## Running Tests

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

----

## SQL Schema

See [`db.sql`](./db.sql) for full schema and sample data.

---

## API Endpoints

- `GET /api/questions` — Get all questions, answers, and points
- `POST /api/submit` — Submit answers, returns score
- `GET /api/report` — Get score distribution


---

## License

MIT 