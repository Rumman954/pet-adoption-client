import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="premium-card p-10 sm:p-14 max-w-lg w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-7xl sm:text-8xl font-display font-bold bg-gradient-to-br from-brand-400 to-brand-700 bg-clip-text text-transparent"
        >
          404
        </motion.p>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/" className="btn-primary mt-8 px-8">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
