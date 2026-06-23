export default function LoadingSpinner({ fullPage = false }) {
  const wrapper = fullPage
    ? 'min-h-[60vh] flex items-center justify-center'
    : 'flex items-center justify-center py-16';

  return (
    <div className={wrapper}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-4 border-brand-100 dark:border-brand-900/50 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-brand-600 rounded-full animate-spin" />
        </div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
