import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const tabs = [
  { to: '/my-requests', label: 'My Requests', icon: '📋', hint: 'Pets you requested' },
  { to: '/add-pet', label: 'Add Pet', icon: '➕', hint: 'New listing' },
  { to: '/my-listings', label: 'My Listings', icon: '🏷️', hint: 'See incoming requests' },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="page-hero-strip py-10 sm:py-12 border-b-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-2">Your workspace</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-300'
                }`
              }
            >
              <span aria-hidden>{tab.icon}</span>
              {tab.label}
            </NavLink>
          ))}
        </div>
        <div className="premium-card p-6 sm:p-8 !shadow-xl border-0 ring-1 ring-slate-100 dark:ring-slate-700/80">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
