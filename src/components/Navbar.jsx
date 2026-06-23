import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import Logo from './Logo';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setDropdown(false);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold px-3 py-2 rounded-lg transition-all ${
      isActive
        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
        : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm shadow-slate-900/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[4.5rem] py-2">
        <Logo />

        <ul className="hidden md:flex items-center gap-1">
          <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/all-pets" className={linkClass}>All Pets</NavLink></li>
          {user && (
            <>
              <li><NavLink to="/my-requests" className={linkClass}>My Requests</NavLink></li>
              <li><NavLink to="/add-pet" className={linkClass}>Add Pet</NavLink></li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="p-2 rounded-lg text-slate-600 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&background=f97316&color=fff`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden sm:block text-sm font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdown(false)}
                    className="block px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-md shadow-brand-600/25 hover:shadow-brand-600/40"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 border-t border-slate-100 dark:border-slate-800">
          <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/all-pets" onClick={() => setMenuOpen(false)} className={linkClass}>All Pets</NavLink></li>
          {user && (
            <>
              <li><NavLink to="/my-requests" onClick={() => setMenuOpen(false)} className={linkClass}>My Requests</NavLink></li>
              <li><NavLink to="/add-pet" onClick={() => setMenuOpen(false)} className={linkClass}>Add Pet</NavLink></li>
              <li><NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className={linkClass}>Dashboard</NavLink></li>
              <li>
                <button type="button" onClick={handleLogout} className="text-sm font-semibold text-red-600">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
}
