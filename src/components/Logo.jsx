import { Link } from 'react-router-dom';

export default function Logo({ linked = true, compact = false }) {
  const content = (
    <span className="inline-flex items-center gap-2">
      <span
        className={`flex items-center justify-center rounded-xl bg-brand-600 text-white font-bold ${
          compact ? 'w-9 h-9 text-lg' : 'w-10 h-10 text-xl'
        }`}
        aria-hidden
      >
        🐾
      </span>
      <span
        className={`font-display font-bold tracking-tight ${
          compact
            ? 'text-white text-lg'
            : 'text-slate-900 dark:text-white text-xl'
        }`}
      >
        Pet<span className="text-brand-600 dark:text-brand-400">Home</span>
      </span>
    </span>
  );

  if (!linked) return content;

  return (
    <Link to="/" className="inline-flex shrink-0 hover:opacity-90 transition-opacity">
      {content}
    </Link>
  );
}
