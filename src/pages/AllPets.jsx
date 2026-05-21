import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import PetCard from '../components/PetCard';
import LoadingSpinner from '../components/LoadingSpinner';

const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other'];

export default function AllPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState([]);
  const [sort, setSort] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchPets = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (speciesFilter.length) params.species = speciesFilter.join(',');
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

  const toggleSpecies = (sp) => {
    setSpeciesFilter((prev) =>
      prev.includes(sp) ? prev.filter((s) => s !== sp) : [...prev, sp]
    );
  };

  const handleAdopt = (pet) => {
    if (!user) {
      toast.error('Please login to adopt a pet.');
      navigate('/login', { state: { from: { pathname: `/pet/${pet._id}` } } });
      return;
    }
    navigate(`/pet/${pet._id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-8">All Pets</h1>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <input
          type="search"
          placeholder="Search by pet name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field flex-1"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field lg:w-48">
          <option value="">Sort: Newest</option>
          <option value="name">Name A-Z</option>
          <option value="fee-low">Fee: Low to High</option>
          <option value="fee-high">Fee: High to Low</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {speciesOptions.map((sp) => (
          <button
            key={sp}
            type="button"
            onClick={() => toggleSpecies(sp)}
            className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
              speciesFilter.includes(sp)
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'
            }`}
          >
            {sp}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : pets.length === 0 ? (
        <p className="text-center py-16 text-slate-500">No pets found. Try different filters.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} showAdopt onAdopt={handleAdopt} />
          ))}
        </div>
      )}
    </div>
  );
}
