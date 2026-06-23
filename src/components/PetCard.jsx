import { Link } from 'react-router-dom';

export default function PetCard({ pet, showAdopt = false, onAdopt }) {
  return (
    <article className="group premium-card overflow-hidden hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
            pet.status === 'adopted'
              ? 'bg-slate-700/90 text-white'
              : 'bg-white/95 text-slate-800'
          }`}
        >
          {pet.status === 'adopted' ? 'Adopted' : pet.species}
        </span>
        <p className="absolute bottom-3 left-3 right-3 font-display font-bold text-lg text-white drop-shadow-sm">
          {pet.name}
        </p>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {pet.breed} · {pet.age} · {pet.gender}
        </p>
        {pet.location && (
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <span aria-hidden>📍</span> {pet.location}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-brand-600 dark:text-brand-400 font-display font-bold text-xl">${pet.adoptionFee}</p>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Adoption fee</span>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            to={`/pet/${pet._id}`}
            className="flex-1 text-center py-2.5 bg-slate-100 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            View Details
          </Link>
          {showAdopt && pet.status === 'available' && (
            <button
              type="button"
              onClick={() => onAdopt?.(pet)}
              className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-brand-600/20"
            >
              Adopt Now
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
