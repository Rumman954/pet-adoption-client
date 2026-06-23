import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const statusBadge = (status) => {
  if (status === 'approved') return 'badge-approved';
  if (status === 'rejected') return 'badge-rejected';
  return 'badge-pending';
};

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get('/api/adoptions/my-requests')
      .then(({ data }) => setRequests(data.requests))
      .catch(() => toast.error('Failed to load requests.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCancel = async (id) => {
    try {
      const { data } = await api.delete(`/api/adoptions/${id}`);
      toast.success(data.message);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancel failed.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-2">Pets you asked to adopt</p>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Sent Requests</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Requests you sent to adopt someone else&apos;s pet.{' '}
        <Link to="/my-listings" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
          To see requests from others for your pets → My Listings
        </Link>
      </p>

      {requests.length === 0 ? (
        <div className="text-center py-20 premium-card">
          <p className="text-5xl mb-4" aria-hidden>📋</p>
          <p className="font-display text-lg font-bold text-slate-800 dark:text-white">No sent requests yet</p>
          <p className="mt-2 text-slate-500 mb-6">Browse pets and submit an adoption request. If you uploaded pets and want to see who requested them, open <strong>My Listings</strong>.</p>
          <Link to="/all-pets" className="btn-primary px-6">Browse pets</Link>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-hidden premium-card">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Pet Name</th>
                  <th className="py-4 px-6">Request Date</th>
                  <th className="py-4 px-6">Pickup Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="border-t border-slate-100 dark:border-slate-700/80 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-display font-bold dark:text-white">{req.petName}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{new Date(req.pickupDate).toLocaleDateString()}</td>
                    <td className="py-4 px-6"><span className={statusBadge(req.status)}>{req.status}</span></td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Link to={`/pet/${req.petId}`} className="text-xs px-3 py-2 bg-brand-50 dark:bg-brand-900/40 text-brand-700 font-bold rounded-lg">View</Link>
                        {req.status === 'pending' && (
                          <button type="button" onClick={() => handleCancel(req._id)} className="text-xs px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 font-bold rounded-lg">Cancel</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {requests.map((req) => (
              <article key={req._id} className="premium-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-bold text-lg dark:text-white">{req.petName}</h3>
                  <span className={statusBadge(req.status)}>{req.status}</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div><dt className="text-slate-400 text-xs font-bold uppercase">Requested</dt><dd className="mt-0.5">{new Date(req.createdAt).toLocaleDateString()}</dd></div>
                  <div><dt className="text-slate-400 text-xs font-bold uppercase">Pickup</dt><dd className="mt-0.5">{new Date(req.pickupDate).toLocaleDateString()}</dd></div>
                </dl>
                <div className="mt-4 flex gap-2">
                  <Link to={`/pet/${req.petId}`} className="flex-1 text-center py-2 bg-brand-50 dark:bg-brand-900/40 text-brand-700 font-bold rounded-lg text-sm">View</Link>
                  {req.status === 'pending' && (
                    <button type="button" onClick={() => handleCancel(req._id)} className="flex-1 py-2 bg-red-50 text-red-600 font-bold rounded-lg text-sm">Cancel</button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
