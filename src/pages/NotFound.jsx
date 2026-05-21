import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-display font-bold text-brand-200 dark:text-brand-900">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
