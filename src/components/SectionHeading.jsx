export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center max-w-2xl mx-auto' : ''}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed ${center ? '' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
