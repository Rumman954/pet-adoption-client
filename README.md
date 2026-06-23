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

## Deploy (Vercel)

1. Push this folder to GitHub (client repo only)
2. Import project in Vercel
3. Root directory: `/` (repo root if this is the client repo)
4. Add all `VITE_*` env variables
5. Deploy
