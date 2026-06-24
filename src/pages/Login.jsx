import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import toast from 'react-hot-toast';
import api from '../api/axios';
import PasswordInput from '../components/PasswordInput';
import { getFirebaseAuth, isFirebaseConfigured } from '../firebase/firebase.init';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const finishGoogleLogin = async (user) => {
    const { data } = await api.post('/api/auth/google', {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
    if (data.success) {
      login(data.user, data.token);
      toast.success(data.message);
      navigate(from, { replace: true });
    }
  };

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const { auth } = getFirebaseAuth();
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          setGoogleLoading(true);
          await finishGoogleLogin(result.user);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message || 'Google login failed.');
      })
      .finally(() => setGoogleLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      if (data.success) {
        login(data.user, data.token);
        toast.success(data.message);
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (!isFirebaseConfigured()) {
      toast.error(
        import.meta.env.PROD
          ? 'Firebase not configured on Vercel. Add VITE_FIREBASE_* env vars and redeploy.'
          : 'Google login is not configured. Add Firebase keys to client/.env'
      );
      return;
    }

    try {
      setGoogleLoading(true);
      const { auth, googleProvider } = getFirebaseAuth();

      if (import.meta.env.PROD) {
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      try {
        const result = await signInWithPopup(auth, googleProvider);
        await finishGoogleLogin(result.user);
      } catch (err) {
        if (err.code === 'auth/popup-blocked') {
          toast('Popup blocked — redirecting to Google...', { icon: 'ℹ️' });
          await signInWithRedirect(auth, googleProvider);
          return;
        }
        throw err;
      }
    } catch (err) {
      const isNetwork = err.message === 'Network Error' || err.code === 'ERR_NETWORK';
      toast.error(
        isNetwork
          ? 'Cannot reach server. Check Vercel env vars and redeploy.'
          : err.response?.data?.message || err.message || 'Google login failed.'
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-orange-50/80 via-white to-emerald-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
      <div className="w-full max-w-md premium-card p-8 sm:p-10">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-2">Welcome back</p>
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <PasswordInput
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 disabled:hover:translate-y-0">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          className="mt-4 w-full py-3 border-2 border-slate-200 dark:border-slate-600 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-3 text-slate-700 dark:text-slate-200 disabled:opacity-60"
        >
          <img src="/images/google-logo.png" alt="" className="w-5 h-5 object-contain" aria-hidden />
          {googleLoading ? 'Connecting...' : 'Google Login'}
        </button>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          No account? <Link to="/register" className="text-brand-600 dark:text-brand-400 font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
}
