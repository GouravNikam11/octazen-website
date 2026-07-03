# Octazen Technologies LLP — Company Portfolio Website

**Innovate. Elevate. Succeed.**

A full-stack, production-ready company portfolio website with a complete Admin CMS dashboard. Built for Octazen Technologies LLP.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, Tailwind CSS 3, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT |
| File Uploads | Multer |
| Email | Nodemailer |

---

## Project Structure

```
octazen-website/
├── frontend/          ← React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       ← Navbar, Footer, WhatsApp, Loading
│   │   │   ├── sections/     ← Hero, About, Services, Tech, Portfolio…
│   │   │   └── admin/        ← AdminLayout, Sidebar, Navbar, GenericCRUD
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── BlogPage.jsx, BlogDetail.jsx
│   │   │   ├── CareersPage.jsx, ContactPage.jsx
│   │   │   └── admin/        ← Dashboard, Projects, Messages, Settings…
│   │   ├── context/          ← ThemeContext, AuthContext
│   │   ├── hooks/            ← useScrollAnimation, useCounter
│   │   ├── services/         ← Axios API client
│   │   └── utils/            ← constants, helpers
│   └── package.json
│
├── backend/           ← Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/    ← User, Project, Service, Tech, Testimonial, Blog…
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/ ← auth (JWT), upload (Multer), errorHandler
│   │   └── config/    ← db.js, seed.js
│   ├── uploads/       ← projects/, team/, blog/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm 8+

### 1. Clone & Install

```bash
git clone <your-repo>
cd octazen-website

# Install backend
cd backend && npm install

# Install frontend
cd ../frontend && npm install
```

### 2. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, email credentials
```

Key variables to set in `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/octazen_db
JWT_SECRET=your_secret_min_32_chars_change_this
ADMIN_EMAIL=admin@octazentechnologies.com
ADMIN_PASSWORD=Admin@Octazen2024!
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- Admin user account
- All default services, technologies, projects, testimonials
- Industries, statistics, careers, and settings

### 4. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5001 (5000 is used by macOS AirPlay)
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

### 5. Access the Website

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Main website |
| `http://localhost:5173/admin/login` | Admin panel login |
| `http://localhost:5001/api/health` | API health check |

**Default Admin Credentials:**
- Email: `admin@octazentechnologies.com`
- Password: `Admin@Octazen2024!`

> ⚠️ Change these immediately after first login in the admin settings.

---

## Admin Panel Features

Once logged in at `/admin/login`, you can manage:

| Section | Description |
|---------|-------------|
| **Dashboard** | Overview stats, recent messages |
| **Projects** | Add/edit/delete portfolio projects |
| **Services** | Manage service offerings |
| **Technologies** | Edit tech stack with proficiency |
| **Testimonials** | Client feedback management |
| **Team** | Team member profiles |
| **Blog Posts** | Create/publish/draft articles |
| **Careers** | Job openings management |
| **Industries** | Industries served section |
| **Statistics** | Counter numbers (14+ years, 50+ projects…) |
| **Messages** | View & respond to contact form submissions |
| **Settings** | Update all website text, SEO, social links, contact info |

All changes reflect **instantly** on the live website — no redeployment needed.

---

## Website Sections

- **Hero** — Animated headline, CTAs, floating tech badges
- **About** — Company story, core values, objectives
- **Services** — 6 service cards with expandable feature lists
- **Technologies** — 25+ techs with proficiency bars, category filtering
- **Portfolio** — Project grid with category filtering, detail pages
- **Statistics** — Animated counters (14+ years, 50+ projects, 40+ clients)
- **Testimonials** — Auto-cycling testimonial carousel
- **Industries** — 8 industry sectors served
- **Careers** — Job listings with expandable details
- **Blog** — Articles grid with search & category filtering
- **Contact** — Full contact form with email notifications
- **Footer** — Links, social, CTA band
- **WhatsApp Button** — Floating WhatsApp contact button

---

## API Endpoints

```
GET    /api/projects          Public project list
GET    /api/projects/:slug    Single project
POST   /api/projects          Admin: create
PUT    /api/projects/:id      Admin: update
DELETE /api/projects/:id      Admin: delete

GET    /api/services          Public services
GET    /api/technologies      Public technologies
GET    /api/testimonials      Public testimonials
GET    /api/stats             Public statistics
GET    /api/industries        Public industries

GET    /api/blog              Public posts
GET    /api/blog/:slug        Single post (increments views)
GET    /api/blog/admin        Admin: all posts
POST   /api/blog              Admin: create
PUT    /api/blog/:id          Admin: update
DELETE /api/blog/:id          Admin: delete

POST   /api/contact           Submit contact form (public)
GET    /api/contact           Admin: all messages
PUT    /api/contact/:id       Admin: update status/notes
DELETE /api/contact/:id       Admin: delete

GET    /api/settings/public   Public settings
GET    /api/settings          Admin: all settings
POST   /api/settings          Admin: bulk update
PUT    /api/settings/:key     Admin: update one

POST   /api/auth/login        Login
GET    /api/auth/me           Get current admin
PUT    /api/auth/password     Change password

POST   /api/upload/:folder    Admin: upload image (projects/team/blog/misc)
```

---

## Deployment Guide

### Frontend — Vercel (Recommended)
```bash
cd frontend
npm run build

# Deploy to Vercel
npx vercel --prod
```

Set environment variable in Vercel:
```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend — Railway / Render / VPS

**Railway:**
1. Create new project → Deploy from GitHub
2. Set environment variables from `.env`
3. Auto-deploys on push

**Render:**
1. New Web Service → Connect repo → Set `backend/` as root
2. Build command: `npm install`
3. Start command: `node server.js`

**VPS (Ubuntu + PM2):**
```bash
npm install -g pm2
cd backend
pm2 start server.js --name octazen-api
pm2 save && pm2 startup
```

### Database — MongoDB Atlas
1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get connection string
3. Set `MONGODB_URI=mongodb+srv://...` in backend `.env`

---

## Suggested Hosting Stack

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Vercel** | Frontend hosting | Yes |
| **Railway** | Backend API | Yes ($5 credit) |
| **MongoDB Atlas** | Database | Yes (512MB) |
| **Cloudinary** | Image CDN (optional upgrade) | Yes |

**Estimated cost at scale:** ~$10–20/month

---

## Customization

### Update Colors
Edit `frontend/tailwind.config.js` → `theme.extend.colors.brand`

### Add a New Service/Technology
Log in to `/admin` → Services or Technologies → Add new item

### Update Homepage Text
Log in to `/admin/settings` → Hero Section → Edit and save

### Add a Project
Log in to `/admin/projects` → Add Project → Fill details → Save

---

## Contact

**Octazen Technologies LLP**
- 📧 contact@octazentechnologies.com
- 📞 +91 989 098 3532
- 🌐 www.octazentechnologies.com
- 📍 Kolhapur, Maharashtra, India
