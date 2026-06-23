## Deploy (Vercel only — website + API)

Everything runs on **one Vercel project**. No Render needed.

### 1. Push to GitHub and import on Vercel
- Framework: **Vite**
- Output Directory: **`dist`**
- Build: `npm run build`

### 2. Environment variables on Vercel

**Firebase (client):**
| Variable | Prefix |
|----------|--------|
| `VITE_FIREBASE_*` | all 6 Firebase keys |

**Database + auth (API — no `VITE_` prefix):**
| Variable | Value |
|----------|--------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | long random secret |
| `NODE_ENV` | `production` |

**Do NOT set `VITE_API_URL`** — API runs on the same Vercel URL at `/api/...`

### 3. Firebase authorized domain
Add your Vercel URL in Firebase → Authentication → Authorized domains.

### 4. Redeploy after adding env vars

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Run the API separately: `cd ../server && npm run dev` (port 5000).  
Set `VITE_API_URL=http://localhost:5000` in local `.env`.
