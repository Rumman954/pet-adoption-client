# PetHome — Pet Adoption Platform (Client)

## Purpose

PetHome is a full-stack MERN pet adoption platform where users browse dogs, cats, birds, and other pets, submit adoption requests, and manage listings. Pet owners can add pets, review incoming requests, and approve or reject adoptions through a secure dashboard.

## Live URL

**Website:** [https://pet-adoption-client-alpha.vercel.app](https://pet-adoption-client-alpha.vercel.app)

The client and API are deployed together on Vercel (API at `/api/...`).

## Features

- Browse all pets with **search**, **species filter**, and **sort** (fee, name)
- **Featured pets** section on the home page with hero banner and static content sections
- **User registration & login** with email/password and **Google authentication**
- **JWT session** with protected dashboard routes (My Requests, Add Pet, My Listings)
- **Adoption workflow** — submit requests, owner approve/reject, single approval marks pet adopted
- **Pet CRUD** for owners — add, edit, delete listings with stats dashboard
- **Dark / light theme toggle** and **Framer Motion** animations on pet cards and pages
- **Toast notifications**, loading spinners, and custom 404 page
- Fully **responsive** design for mobile, tablet, and desktop

## NPM Packages Used

| Package | Purpose |
|---------|---------|
| `react` / `react-dom` | UI library |
| `react-router-dom` | Client-side routing |
| `vite` | Build tool and dev server |
| `tailwindcss` | Utility-first styling |
| `axios` | HTTP client for API calls |
| `react-hot-toast` | Toast notifications |
| `firebase` | Google authentication |
| `framer-motion` | Page and card animations (optional feature) |
| `express` / `mongoose` / `jsonwebtoken` / etc. | Embedded API on Vercel (`/api`) |

## Run Locally

```bash
npm install
cp .env.example .env
npm run dev
```

Run the API separately in another terminal:

```bash
cd ../server
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL=http://localhost:5000` in `client/.env`.

## Deploy (Vercel)

1. Push to GitHub and import the **`client`** folder as a Vercel project.
2. Framework: **Vite** · Output: **`dist`** · Build: `npm run build`
3. Add environment variables (see `vercel.env.template`):
   - `VITE_FIREBASE_*` (6 Firebase keys)
   - `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`
4. **Do not** set `VITE_API_URL` — the API runs on the same domain.
5. Add your Vercel URL to Firebase **Authorized domains**.
6. Redeploy after changing env vars.

## GitHub Repository

[pet-adoption-client](https://github.com/Rumman954/pet-adoption-client)
