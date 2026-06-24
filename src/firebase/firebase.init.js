import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const keys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

export const isFirebaseConfigured = () =>
  keys.every((key) => {
    const value = import.meta.env[key];
    return Boolean(value && !String(value).startsWith('your_'));
  });

let app = null;
let auth = null;
let googleProvider = null;

export const getFirebaseAuth = () => {
  if (!isFirebaseConfigured()) {
    throw new Error(
      import.meta.env.PROD
        ? 'Add all VITE_FIREBASE_* keys in Vercel → Settings → Environment Variables, then redeploy.'
        : 'Add Firebase keys to client/.env'
    );
  }

  if (!app) {
    app = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    });
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  }

  return { auth, googleProvider };
};
