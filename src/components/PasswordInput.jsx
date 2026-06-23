import { useState } from 'react';

export default function PasswordInput({ name, value, onChange, required = false, id }) {
  const [visible, setVisible] = useState(false);
  const inputId = id || name;

  return (
    <div className="relative">
      <input
        id={inputId}
        name={name}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field pr-11"
        autoComplete={name === 'confirmPassword' ? 'new-password' : 'current-password'}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 9.88A3 3 0 0112 9c2.8 0 5 2 5 4.5 0 .67-.15 1.3-.42 1.87M6.1 6.1C4.21 7.39 2.78 9.05 2 12c1.5 4.5 6 7.5 10 7.5 1.55 0 3.03-.35 4.35-.98" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
