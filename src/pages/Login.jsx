import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { auth, googleProvider } from '../firebase/firebase.init';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      if (data.success) {
        login(data.user);
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
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      toast.error('Google login is not configured. Add Firebase keys to .env');
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { data } = await api.post('/api/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });
      if (data.success) {
        login(data.user);
        toast.success(data.message);
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Google login failed.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white text-center">Login</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl disabled:opacity-60">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button type="button" onClick={handleGoogle} className="mt-4 w-full py-3 border-2 border-slate-200 dark:border-slate-600 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2">
          <span>G</span> Google Login
        </button>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          No account? <Link to="/register" className="text-brand-600 dark:text-brand-400 font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
}
