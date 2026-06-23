import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const detailItems = (pet) => [
  { label: 'Species', value: pet.species, icon: '🐾' },
  { label: 'Breed', value: pet.breed, icon: '📋' },
  { label: 'Age', value: pet.age, icon: '🎂' },
  { label: 'Gender', value: pet.gender, icon: '⚥' },
  { label: 'Health', value: pet.healthStatus, icon: '💚' },
  { label: 'Vaccination', value: pet.vaccinationStatus, icon: '💉' },
  { label: 'Location', value: pet.location, icon: '📍' },
  { label: 'Adoption fee', value: `$${pet.adoptionFee}`, icon: '💰' },
];

export default function PetDetails() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ pickupDate: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: { pathname: `/pet/${id}` } } });
    }
  }, [user, authLoading, id, navigate]);

  useEffect(() => {
    api.get(`/api/pets/${id}`)
      .then(({ data }) => setPet(data.pet))
      .catch(() => toast.error('Pet not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickupDateValid(form.pickupDate)) {
      toast.error('Please select a valid pickup date.');
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await api.post('/api/adoptions', {
        petId: pet._id,
        petName: pet.name,
        pickupDate: form.pickupDate,
        message: form.message,
      });
      if (data.success) {
        toast.success(data.message);
        navigate('/my-requests');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Request failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const pickupDateValid = (d) => d && new Date(d) >= new Date(new Date().toDateString());

  if (authLoading || loading) return <LoadingSpinner fullPage />;
  if (!pet) {
    return (
      <div className="max-w-lg mx-auto py-24 text-center premium-card">
        <p className="font-display text-xl font-bold">Pet not found</p>
      </div>
    );
  }

  const isOwner = user?.email === pet.ownerEmail;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
        <div className="lg:col-span-3">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200/80 dark:ring-slate-700">
            <img src={pet.image} alt={pet.name} className="w-full aspect-[4/3] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                pet.status === 'adopted' ? 'bg-slate-600 text-white' : 'bg-white/95 text-slate-800'
              }`}>
                {pet.status}
              </span>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">{pet.name}</h1>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {detailItems(pet).map((item) => (
              <div key={item.label} className="premium-card p-4 hover:-translate-y-0.5">
                <span className="text-lg" aria-hidden>{item.icon}</span>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-400">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 premium-card p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">About {pet.name}</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{pet.description}</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="premium-card p-6 sm:p-8 sticky top-24 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">Adoption request</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">Take me home</h2>

            {isOwner ? (
              <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-amber-800 dark:text-amber-300 font-semibold text-sm">
                  You own this listing. Manage adoption requests from My Listings.
                </p>
              </div>
            ) : pet.status === 'adopted' ? (
              <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 font-semibold">This pet has already been adopted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Pet Name</label>
                  <input value={pet.name} readOnly className="input-field bg-slate-100 dark:bg-slate-900/80 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Your Name</label>
                  <input value={user?.name || ''} readOnly className="input-field bg-slate-100 dark:bg-slate-900/80 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Your Email</label>
                  <input value={user?.email || ''} readOnly className="input-field bg-slate-100 dark:bg-slate-900/80 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Pickup Date</label>
                  <input
                    type="date"
                    value={form.pickupDate}
                    onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="input-field"
                    placeholder="Tell the owner about your home and experience with pets..."
                  />
                </div>
                <button type="submit" disabled={submitting} className="w-full btn-primary py-3.5 disabled:hover:translate-y-0">
                  {submitting ? 'Submitting...' : 'Submit adoption request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
