import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(form.password)) {
      toast.error('Password needs 6+ chars with uppercase and lowercase letters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Password and Confirm Password must match.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/register', form);
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
        <h1 className="font-display text-2xl font-bold text-center text-slate-900 dark:text-white">Register</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Photo URL</label>
            <input name="photoURL" value={form.photoURL} onChange={handleChange} className="input-field" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Confirm Password</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl disabled:opacity-60">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Have an account? <Link to="/login" className="text-brand-600 dark:text-brand-400 font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}
