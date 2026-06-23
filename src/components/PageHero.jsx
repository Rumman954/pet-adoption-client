const floatingIcons = [
  { emoji: '🐕', className: 'top-8 left-[8%] text-3xl sm:text-4xl opacity-20 dark:opacity-15 animate-[float_6s_ease-in-out_infinite]' },
  { emoji: '🐈', className: 'top-12 right-[10%] text-2xl sm:text-3xl opacity-20 dark:opacity-15 animate-[float_7s_ease-in-out_1s_infinite]' },
  { emoji: '🐦', className: 'bottom-16 left-[15%] text-2xl opacity-15 dark:opacity-10 animate-[float_8s_ease-in-out_0.5s_infinite] hidden sm:block' },
  { emoji: '🐾', className: 'bottom-20 right-[18%] text-4xl opacity-10 dark:opacity-[0.07] animate-[float_9s_ease-in-out_2s_infinite] hidden md:block' },
];

export default function PageHero({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  count,
  countLabel = 'available',
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/60 dark:border-slate-800/80">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40" />
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 30%, rgba(249,115,22,0.2) 0%, transparent 42%), radial-gradient(circle at 85% 20%, rgba(16,185,129,0.16) 0%, transparent 38%), radial-gradient(circle at 60% 90%, rgba(251,146,60,0.14) 0%, transparent 40%)',
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden
      />

      {floatingIcons.map(({ emoji, className }) => (
        <span
          key={emoji + className}
          className={`absolute pointer-events-none select-none ${className}`}
          aria-hidden
        >
          {emoji}
        </span>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 sm:pt-16 sm:pb-28">
        <div className="text-center max-w-3xl mx-auto hero-fade-in">
          {eyebrow && (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-orange-100/80 dark:border-slate-700 shadow-md shadow-orange-100/50 dark:shadow-none mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
                {eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            {title}{' '}
            {titleHighlight && (
              <span className="bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                {titleHighlight}
              </span>
            )}
          </h1>

          {subtitle && (
            <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          {typeof count === 'number' && (
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 shadow-sm hero-fade-in-delay">
              <span className="font-display text-2xl font-bold text-brand-600 dark:text-brand-400">{count}</span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {countLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent dark:via-brand-600/40"
        aria-hidden
      />
    </section>
  );
}
