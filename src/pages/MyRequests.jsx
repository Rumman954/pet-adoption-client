import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

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
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">My Requests</h2>
      {requests.length === 0 ? (
        <p className="text-slate-500 py-12 text-center">You have not submitted any adoption requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-sm text-slate-500">
                <th className="py-3 pr-4">Pet Name</th>
                <th className="py-3 pr-4">Request Date</th>
                <th className="py-3 pr-4">Pickup Date</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-4 pr-4 font-semibold dark:text-white">{req.petName}</td>
                  <td className="py-4 pr-4 text-sm">{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 pr-4 text-sm">{new Date(req.pickupDate).toLocaleDateString()}</td>
                  <td className="py-4 pr-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                      req.status === 'approved' ? 'bg-green-100 text-green-800' :
                      req.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>{req.status}</span>
                  </td>
                  <td className="py-4 flex gap-2">
                    <Link to={`/pet/${req.petId}`} className="text-xs px-3 py-1.5 bg-brand-50 dark:bg-brand-900/40 text-brand-700 font-bold rounded-lg">View</Link>
                    {req.status === 'pending' && (
                      <button type="button" onClick={() => handleCancel(req._id)} className="text-xs px-3 py-1.5 bg-red-100 text-red-700 font-bold rounded-lg">Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
