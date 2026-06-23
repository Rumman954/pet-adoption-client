# PetHome — Client (Pet Adoption Platform)

React + Vite + Tailwind CSS frontend for the MERN Pet Adoption assignment.

## Live URL

Add your Vercel deployment URL here after deploy.

## Purpose

A recruiter-friendly pet adoption portal where users browse pets, submit adoption requests, and pet owners manage listings and approve requests.

## Features

- JWT auth with HTTP-only cookies (login persists on reload)
- User registration with password validation
- Google login via Firebase
- Browse all pets with search (`$regex`), species filter (`$in`), and sorting
- Featured pets section on home (6+ pets)
- Private dashboard: Add Pet, My Listings, My Requests
- Adoption request flow with owner approve/reject
- Pet owners cannot adopt their own pets; only one approval per pet
- Dark/light theme toggle
- Toast notifications (no `alert()`)
- Custom 404 page and loading spinner
- Fully responsive layout

## NPM Packages Used

- `react` / `react-dom`
- `react-router-dom`
- `axios`
- `react-hot-toast`
- `firebase`
- `vite`
- `tailwindcss` / `postcss` / `autoprefixer`
- `@vitejs/plugin-react`

## Setup

```bash
npm install
cp .env.example .env
# Set VITE_API_URL and Firebase keys
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (Render) |
| `VITE_FIREBASE_*` | Firebase config for Google login |

## Deploy (Vercel — full stack: website + API)

This repo includes the **Express API** in `/server` and `/api` so **one Vercel project** runs everything.

### 1. Push to GitHub
```bash
git add .
git commit -m "chore: full-stack Vercel deploy"
git push
```

### 2. Import on Vercel
1. [vercel.com](https://vercel.com) → **Add New Project** → import `pet-adoption-client`
2. Framework: **Vite**
3. Build: `npm run build` · Output: `dist`

### 3. Environment variables (Vercel dashboard)

**Firebase (client — prefix `VITE_`):**
| Variable | Value |
|----------|--------|
| `VITE_FIREBASE_API_KEY` | from Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | from Firebase |
| `VITE_FIREBASE_PROJECT_ID` | from Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | from Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | from Firebase |
| `VITE_FIREBASE_APP_ID` | from Firebase |

**Do NOT set `VITE_API_URL` on Vercel** — API runs on the same domain (`/api/...`).

**Backend (serverless API — no `VITE_` prefix):**
| Variable | Value |
|----------|--------|
| `MONGODB_URI` | your MongoDB Atlas URI |
| `JWT_SECRET` | long random string |
| `NODE_ENV` | `production` |

### 4. Firebase authorized domain
After deploy, add your Vercel URL in Firebase → Authentication → Settings → **Authorized domains**.

### 5. Deploy
Click **Deploy**. Live URL example: `https://pet-adoption-client.vercel.app`

### Local development
- **Client:** `npm run dev` (port 5173)
- **Server:** run separately in `/server` folder with `npm run dev` (port 5000)
- Keep `VITE_API_URL=http://localhost:5000` in local `.env`
