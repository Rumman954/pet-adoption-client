import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const tabs = [
  { to: '/my-requests', label: 'My Requests' },
  { to: '/add-pet', label: 'Add Pet' },
  { to: '/my-listings', label: 'My Listings' },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-6">Dashboard</h1>
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-700'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
