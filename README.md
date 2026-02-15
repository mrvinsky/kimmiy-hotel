# Kimmiy Hotel Management System

A comprehensive, full-stack hotel management solution featuring a modern public-facing booking website and a robust admin panel for managing rooms, reservations, and content.

## 🚀 Project Overview

**Kimmiy Hotel Management System** allows hotel administrators to manage rooms, bookings, and site content while providing guests with a seamless booking experience. The system is built with a focus on performance, scalability, and modern design principles.

### Key Features

*   **Public Website:**
    *   **Responsive Design:** Optimized for all devices using TailwindCSS.
    *   **Room Booking:** Real-time availability checks and booking system.
    *   **Multi-language Support:** Full content localization for English (EN), Serbian (RS), and Chinese (CH).
    *   **Interactive UI:** High-quality animations using Framer Motion (Scroll animations, Glassmorphism effects).
    *   **Testimonials:** Scrolling marquee of guest reviews.
*   **Admin Panel:**
    *   **Dashboard:** Overview of bookings and hotel stats.
    *   **Room Management:** Create, edit, and delete room types with photo uploads.
    *   **Booking Management:** View and manage guest reservations.
    *   **Content Management:** Update hotel details and translations.
*   **Backend:**
    *   **RESTful API:** Secure and structured API endpoints.
    *   **Database:** Relational database using PostgreSQL with TypeORM.
    *   **Containerization:** Full Docker support for easy deployment.
    *   **OTA Sync:** iCal Import/Export for Booking.com & Airbnb integration.

---

## 🛠 Technology Stack

### Frontend (`/frontend`)
*   **Framework:** [Next.js 16.1.6](https://nextjs.org/) (App Router)
*   **Library:** [React 19](https://react.dev/)
*   **Styling:** [TailwindCSS 4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **State Management:** React Context API (Language, Auth)
*   **Data Fetching:** Axios
*   **Icons:** Lucide React
*   **Dates:** date-fns, react-day-picker

### Backend (`/backend`)
*   **Framework:** [NestJS 11](https://nestjs.com/)
*   **Language:** TypeScript
*   **Database ORM:** [TypeORM](https://typeorm.io/)
*   **Database:** PostgreSQL
*   **Authentication:** JWT (JSON Web Tokens), Passport.js
*   **File Handling:** Multer (for image uploads)
*   **Validation:** class-validator, class-transformer

### Infrastructure
*   **Docker:** Containerization of both frontend and backend services.
*   **Docker Compose:** Orchestration of multi-container environment (Frontend, Backend, Postgres).

---

## 📂 Project Structure

```bash
kimmiy-project/
├── backend/                # NestJS Backend Application
│   ├── src/
│   │   ├── auth/           # Authentication Module
│   │   ├── bookings/       # Booking Logic Module
│   │   ├── rooms/          # Room Management Module
│   │   ├── entities/       # Database Entities (TypeORM)
│   │   └── seed.ts         # Database Seeding Script
│   ├── Dockerfile
│   └── package.json
│
├── frontend/               # Next.js Frontend Application
│   ├── src/
│   │   ├── app/            # Next.js App Router Pages
│   │   │   ├── (admin)/    # Protected Admin Routes
│   │   │   ├── (public)/   # Public Facing Routes
│   │   ├── components/     # Reusable UI Components
│   │   │   └── ui/         # Design System Components (Hero, Testimonials, etc.)
│   │   ├── lib/            # Utilities & Translations
│   │   └── context/        # Global State Contexts
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml      # Docker Orchestration Config
└── README.md
```

## ⚡️ Quick Start

### Prerequisites
*   [Docker](https://www.docker.com/) and Docker Compose installed.
*   Node.js (for local development without Docker).

### Running with Docker (Recommended)

1.  **Build and Run:**
    ```bash
    docker-compose up --build
    ```

2.  **Access the Application:**
    *   **Frontend (Public):** `http://localhost:3000`
    *   **Admin Panel:** `http://localhost:3000/admin/login`
    *   **Backend API:** `http://localhost:3001`

### Seeding Data
To populate the database with initial rooms and admin users:

```bash
# Enter backend container
docker-compose exec backend sh

# Run seed script
npm run seed
```

## 🌐 Localization

The project uses a custom `LanguageContext` for handling translations.
*   **Translation Source:** `frontend/src/lib/translations.ts`
*   **Supported Languages:** English (default), Serbian (RS), Chinese (CH).
*   **Usage:**
    ```tsx
    const { t, language, setLanguage } = useLanguage();
    // Access: t.section.key
    ```

## 📅 OTA Synchronization (iCal)

The system supports two-way calendar synchronization with major OTAs (Booking.com, Airbnb, etc.) via iCal format:
*   **Export:** Generate unique `.ics` links for each room to share with external platforms.
*   **Import:** Consume external iCal feeds (e.g., from Booking.com) to automatically block dates in the system and prevent double bookings.

---

**Developed by Mr.Vinsky** 🎩
