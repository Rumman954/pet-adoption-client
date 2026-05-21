import { Link } from 'react-router-dom';

export default function PetCard({ pet, showAdopt = false, onAdopt }) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-lg text-white ${
            pet.status === 'adopted' ? 'bg-slate-600' : 'bg-forest-600'
          }`}
        >
          {pet.status === 'adopted' ? 'Adopted' : pet.species}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">{pet.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {pet.breed} · {pet.age} · {pet.gender}
        </p>
        <p className="mt-2 text-brand-600 dark:text-brand-400 font-bold">${pet.adoptionFee}</p>
        <div className="mt-4 flex gap-2">
          <Link
            to={`/pet/${pet._id}`}
            className="flex-1 text-center py-2.5 bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-bold text-sm rounded-xl hover:bg-brand-100 dark:hover:bg-brand-900/60 transition-colors"
          >
            View Details
          </Link>
          {showAdopt && pet.status === 'available' && (
            <button
              type="button"
              onClick={() => onAdopt?.(pet)}
              className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Adopt Now
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
