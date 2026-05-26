# Lead Management System (Mini CRM)

A full-stack web application for managing leads — built with **React**, **Node.js (Express)**, and **PostgreSQL**.

## 🔗 Live Demo

- **Frontend**: [Vercel Link](https://lead-management-system-eta-ochre.vercel.app/)
- **Backend API**: [Render Link](https://lead-management-system-xag6.onrender.com)

> Replace the links above with your actual deployed URLs.

---

## Features

### Core Features
- **Add Leads** — Form with fields for Name, Phone, and Source (Call / WhatsApp / Field)
- **View Leads** — Table displaying all leads with real-time data
- **Update Status** — Change lead status via dropdown (Interested / Not Interested / Converted)
- **Delete Leads** — Remove leads with confirmation dialog
- **Form Validation** — Client-side and server-side validation (required fields, phone format)

### Bonus Features
- **Search** — Filter leads by name or phone number in real time
- **Filter** — Dropdown filters for Status and Source
- **Dashboard** — Summary cards showing total leads, interested, not interested, and converted counts with a source distribution chart

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React, Axios, CSS           |
| Backend    | Node.js, Express            |
| Database   | PostgreSQL                  |
| Deployment | Vercel (frontend), Render (backend), Neon (database) |

---

## Project Structure

```
Lead Management System/
├── client/                     # React Frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Dashboard.js    # Stats cards + source chart
│       │   ├── LeadForm.js     # Add lead form with validation
│       │   └── LeadList.js     # Lead table with search/filter
│       ├── services/
│       │   └── api.js          # Axios API calls
│       ├── App.js              # Main application component
│       └── App.css             # All styles
│
├── server/                     # Node.js Backend
│   ├── db/
│   │   ├── index.js            # PostgreSQL connection pool + initialization
│   │   └── schema.sql          # Database schema
│   ├── routes/
│   │   └── leads.js            # CRUD API routes
│   ├── index.js                # Express server entry point
│   ├── .env                    # Environment variables (not committed)
│   └── package.json
│
└── README.md
```

---

## API Endpoints

| Method   | Endpoint          | Description          |
|----------|-------------------|----------------------|
| `GET`    | `/api/leads`      | Get all leads        |
| `POST`   | `/api/leads`      | Add a new lead       |
| `PATCH`  | `/api/leads/:id`  | Update lead status   |
| `DELETE` | `/api/leads/:id`  | Delete a lead        |

---

## Database Schema

```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  source VARCHAR(20) NOT NULL CHECK (source IN ('Call', 'WhatsApp', 'Field')),
  status VARCHAR(20) NOT NULL DEFAULT 'Interested'
         CHECK (status IN ('Interested', 'Not Interested', 'Converted')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/rishabhsharmaa/Lead-Management-System.git
cd Lead-Management-System
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=lead_management
```

Start the backend server:
```bash
npm run dev
```
The server will auto-create the database and table on first run.

### 3. Set up the frontend
```bash
cd client
npm install
npm start
```

### 4. Open the app
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

The app is deployed using:

| Service | Purpose |
|---------|---------|
| [Neon](https://neon.tech) | Hosted PostgreSQL database (free tier) |
| [Render](https://render.com) | Backend API hosting (free tier) |
| [Vercel](https://vercel.com) | Frontend hosting (free tier) |

### Environment Variables

**Render (Backend)**:
```
DB_USER=<neon_user>
DB_PASSWORD=<neon_password>
DB_HOST=<neon_host>
DB_PORT=5432
DB_DATABASE=<neon_database>
```

**Vercel (Frontend)**:
```
REACT_APP_API_URL=https://your-render-url.onrender.com/api
```

---

## Screenshots

### Add Lead Form & Dashboard
The main interface includes a form to add leads and a dashboard showing lead statistics.

### Lead Table with Search & Filter
The leads table supports real-time search by name/phone and filtering by status and source.

---

## Author

**Rishabh**

---

## License

This project is built as part of a Full Stack Development assignment.
