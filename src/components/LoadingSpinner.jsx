export default function LoadingSpinner({ fullPage = false }) {
  const wrapper = fullPage
    ? 'min-h-[60vh] flex items-center justify-center'
    : 'flex items-center justify-center py-12';

  return (
    <div className={wrapper}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-brand-200 dark:border-brand-900 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}
