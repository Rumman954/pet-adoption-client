import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

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
  if (!pet) return <p className="text-center py-20">Pet not found.</p>;

  const isOwner = user?.email === pet.ownerEmail;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <img src={pet.image} alt={pet.name} className="w-full rounded-2xl shadow-lg aspect-[4/3] object-cover" />
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl"><strong>Species:</strong> {pet.species}</div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl"><strong>Breed:</strong> {pet.breed}</div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl"><strong>Age:</strong> {pet.age}</div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl"><strong>Gender:</strong> {pet.gender}</div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl"><strong>Health:</strong> {pet.healthStatus}</div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl"><strong>Vaccination:</strong> {pet.vaccinationStatus}</div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl"><strong>Location:</strong> {pet.location}</div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl"><strong>Fee:</strong> ${pet.adoptionFee}</div>
          </div>
          <p className="mt-6 text-slate-600 dark:text-slate-400">{pet.description}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 h-fit sticky top-24">
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">{pet.name}</h1>
          <span className={`inline-block mt-2 px-3 py-1 rounded-lg text-xs font-bold text-white ${pet.status === 'adopted' ? 'bg-slate-600' : 'bg-forest-600'}`}>
            {pet.status}
          </span>

          {isOwner ? (
            <p className="mt-6 text-amber-600 dark:text-amber-400 font-semibold">
              You own this listing. Manage requests from My Listings.
            </p>
          ) : pet.status === 'adopted' ? (
            <p className="mt-6 text-slate-500 font-semibold">This pet has been adopted.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Pet Name</label>
                <input value={pet.name} readOnly className="input-field bg-slate-100 dark:bg-slate-900 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Your Name</label>
                <input value={user?.name || ''} readOnly className="input-field bg-slate-100 dark:bg-slate-900 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Your Email</label>
                <input value={user?.email || ''} readOnly className="input-field bg-slate-100 dark:bg-slate-900 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Pickup Date</label>
                <input
                  type="date"
                  value={form.pickupDate}
                  onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="input-field"
                  placeholder="Tell the owner about your home..."
                />
              </div>
              <button type="submit" disabled={submitting} className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl disabled:opacity-60">
                {submitting ? 'Submitting...' : 'Adopt'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
