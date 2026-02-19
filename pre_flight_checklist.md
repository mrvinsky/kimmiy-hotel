# 🚀 Pre-Flight Checklist: Kimmiy Hotel Deployment

## 1. Environment Variables (Critical)
create a `.env` file on your production server with these values. **Do not use default values in production.**

```env
# Database
POSTGRES_USER=admin
POSTGRES_PASSWORD=STRONG_PASSWORD_HERE
POSTGRES_DB=kimmiyhotel

# Security
JWT_SECRET=VERY_LONG_RANDOM_STRING_HERE
ADMIN_PASSWORD=YOUR_SECURE_ADMIN_PASSWORD
CORS_ORIGIN=https://your-domain.com

# Backend Config
DB_SYNCHRONIZE=false       # MUST be false for production data safety
SMTP_HOST=smtp.gmail.com   # Or your provider
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password

# Frontend Config
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

## 2. Infrastructure Setup
-   [ ] **Docker & Compose:** Ensure Docker is installed on the server.
-   [ ] **Reverse Proxy (Nginx/Traefik):**
    -   Route standard web traffic (Port 80/443) -> `frontend:3000`.
    -   Route API traffic (`api.your-domain.com` or `/api`) -> `backend:3001`.
-   [ ] **SSL Certificates:** Set up Let's Encrypt for HTTPS.

## 3. Data Persistence Check
-   [ ] **Database:** Ensure the `postgres_data` volume is created (Docker handles this automatically).
-   [ ] **Uploads:** Ensure the `uploads_data` volume is created. Images uploaded to `/app/uploads` must persist.

## 4. Deployment Steps
1.  **Transfer Files:** Copy project files to the server (exclude `node_modules`, `.git`, etc.).
2.  **Build & Run:**
    ```bash
    docker compose up -d --build
    ```
3.  **Verify Status:**
    ```bash
    docker ps
    docker logs kimmiy-hotel-backend-1
    ```

## 5. Post-Deployment Verification
-   [ ] **Admin Login:** Try logging in with the `ADMIN_PASSWORD` you set.
-   [ ] **File Upload:** Upload a test image in the Admin Panel and verify it appears on the public site.
-   [ ] **Restart Test:** Run `docker compose restart` and ensure data/images are still there.
-   [ ] **SEO Check:** View page source to ensure `<title>` and `<meta name="description">` are correct.
