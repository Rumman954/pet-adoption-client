# PetHome — Client (Pet Adoption Platform)

React + Vite frontend. Deploy to **Vercel**. API runs on **Render** (see `../server`).

## Live URLs

- **Client (Vercel):** add your URL here
- **API (Render):** add your URL here

## Deploy to Vercel (website)

1. Push this repo to GitHub: `pet-adoption-client`
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import **`pet-adoption-client`**
4. Settings **must** be:

| Setting | Value |
|---------|--------|
| Framework Preset | **Vite** |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | **`dist`** |
| Install Command | `npm install` |

5. Add environment variables:

| Variable | Value |
|----------|--------|
| `VITE_API_URL` | Your Render API URL (e.g. `https://pethome-api.onrender.com`) |
| `VITE_FIREBASE_API_KEY` | from Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | from Firebase |
| `VITE_FIREBASE_PROJECT_ID` | from Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | from Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | from Firebase |
| `VITE_FIREBASE_APP_ID` | from Firebase |

6. Deploy → copy your Vercel URL

7. Firebase → Authentication → Settings → **Authorized domains** → add your Vercel URL

## Deploy API to Render

1. Push `server` folder to GitHub: `pet-adoption-server`
2. [render.com](https://render.com) → **New Web Service** → connect repo
3. Build: `npm install` · Start: `node index.js`
4. Environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV` = `production`
   - `CLIENT_URL` = your Vercel URL
5. Copy Render URL → set as `VITE_API_URL` on Vercel → **Redeploy** client

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Server must run separately on port 5000 (`../server`).
