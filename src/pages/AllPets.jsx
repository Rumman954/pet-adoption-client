import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import PetCard from '../components/PetCard';
import LoadingSpinner from '../components/LoadingSpinner';

const speciesOptions = ['Dog', 'Cat', 'Bird', 'Others'];

const speciesIcons = { All: '🐾', Dog: '🐕', Cat: '🐈', Bird: '🐦', Others: '🐰' };

export default function AllPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('All');
  const [sort, setSort] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchPets = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (speciesFilter && speciesFilter !== 'All') params.species = speciesFilter;
      if (sort) params.sort = sort;

      const { data } = await api.get('/api/pets', { params });
      setPets(data.pets || []);
    } catch {
      toast.error('Failed to load pets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchPets, 300);
    return () => clearTimeout(timer);
  }, [search, speciesFilter, sort]);

  const selectSpecies = (sp) => setSpeciesFilter(sp);

  const handleAdopt = (pet) => {
    if (!user) {
      toast.error('Please login to adopt a pet.');
      navigate('/login', { state: { from: { pathname: `/pet/${pet._id}` } } });
      return;
    }
    navigate(`/pet/${pet._id}`);
  };

  return (
    <div className="pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="glass-card overflow-hidden shadow-xl ring-1 ring-slate-200/60 dark:ring-slate-700/50">
          <div className="h-0.5 bg-gradient-to-r from-brand-500 via-amber-400 to-emerald-400" aria-hidden />

          <div className="p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between pb-6 mb-6 border-b border-slate-200/70 dark:border-slate-700/70">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-400">
                  Browse & adopt
                </p>
                <h1 className="mt-1.5 font-display text-2xl sm:text-[1.65rem] font-bold text-slate-900 dark:text-white tracking-tight">
                  All Pets
                </h1>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                  Search by name, filter by species, and find the perfect companion for your home.
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-center flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                {loading ? (
                  <span className="text-sm font-medium text-slate-400">Loading…</span>
                ) : (
                  <>
                    <span className="font-display text-xl font-bold text-brand-600 dark:text-brand-400 tabular-nums">
                      {pets.length}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-tight">
                      {pets.length === 1 ? 'pet found' : 'pets found'}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1 group">
                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors pointer-events-none"
                  aria-hidden
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="search"
                  placeholder="Search by pet name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10 py-2.5 text-sm"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input-field lg:w-48 py-2.5 text-sm"
              >
                <option value="">Sort: Newest</option>
                <option value="name">Name A–Z</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-200/70 dark:border-slate-700/70">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 self-center mr-1 hidden sm:inline">
                Species
              </span>
              {['All', ...speciesOptions].map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => selectSpecies(sp)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold border transition-all ${
                    speciesFilter === sp
                      ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-400'
                  }`}
                >
                  <span className="text-xs opacity-80" aria-hidden>{speciesIcons[sp]}</span>
                  {sp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : pets.length === 0 ? (
          <div className="text-center py-20 premium-card mt-8">
            <p className="text-4xl mb-3" aria-hidden>🐾</p>
            <p className="font-display text-lg font-bold text-slate-800 dark:text-white">No pets found</p>
            <p className="mt-1.5 text-sm text-slate-500">Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-8">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} showAdopt onAdopt={handleAdopt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
