import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import PetForm from '../components/PetForm';
import { useAuth } from '../context/AuthContext';

const statusBadge = (status) => {
  if (status === 'approved') return 'badge-approved';
  if (status === 'rejected') return 'badge-rejected';
  return 'badge-pending';
};

export default function MyListings() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });
  const [loading, setLoading] = useState(true);
  const [requestsModal, setRequestsModal] = useState(null);
  const [requests, setRequests] = useState([]);
  const [editPet, setEditPet] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([
      api.get('/api/pets/my-listings'),
      api.get('/api/adoptions/incoming'),
    ])
      .then(([listingsRes, incomingRes]) => {
        setPets(listingsRes.data.pets);
        setStats(listingsRes.data.stats);
        setIncoming(incomingRes.data.requests || []);
      })
      .catch(() => toast.error('Failed to load listings.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openRequests = async (pet) => {
    setRequestsModal(pet);
    try {
      const { data } = await api.get(`/api/adoptions/pet/${pet._id}`);
      setRequests(data.requests);
    } catch {
      toast.error('Failed to load requests.');
    }
  };

  const handleApprove = async (reqId) => {
    try {
      const { data } = await api.patch(`/api/adoptions/${reqId}/approve`);
      toast.success(data.message);
      if (requestsModal) openRequests(requestsModal);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Approve failed.');
    }
  };

  const handleReject = async (reqId) => {
    try {
      const { data } = await api.patch(`/api/adoptions/${reqId}/reject`);
      toast.success(data.message);
      if (requestsModal) openRequests(requestsModal);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reject failed.');
    }
  };

  const openEdit = (pet) => {
    setEditPet(pet);
    setEditForm({ ...pet, adoptionFee: pet.adoptionFee });
  };

  const handleEditChange = (e) => {
    setEditForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/api/pets/${editPet._id}`, {
        ...editForm,
        adoptionFee: Number(editForm.adoptionFee),
      });
      toast.success(data.message);
      setEditPet(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed.');
    }
  };

  const confirmDelete = async () => {
    try {
      const { data } = await api.delete(`/api/pets/${deleteId}`);
      toast.success(data.message);
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-2">Your uploaded pets</p>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">My Listings</h2>

      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 mb-3">Incoming requests</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          When someone (e.g. John) requests your pet, it shows here.
        </p>
        {incoming.length === 0 ? (
          <div className="premium-card p-6 text-center text-slate-500 dark:text-slate-400 text-sm">
            No one has requested your pets yet.
          </div>
        ) : (
          <div className="overflow-hidden premium-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Pet</th>
                  <th className="py-3 px-4">From</th>
                  <th className="py-3 px-4">Pickup</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {incoming.map((req) => (
                  <tr key={req._id} className="border-t border-slate-100 dark:border-slate-700/80">
                    <td className="py-3 px-4 font-semibold dark:text-white">{req.petName}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium dark:text-white">{req.userName}</p>
                      <p className="text-xs text-slate-500">{req.userEmail}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{new Date(req.pickupDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4"><span className={statusBadge(req.status)}>{req.status}</span></td>
                    <td className="py-3 px-4">
                      {req.status === 'pending' ? (
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => handleApprove(req._id)} className="text-xs px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg">Approve</button>
                          <button type="button" onClick={() => handleReject(req._id)} className="text-xs px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg">Reject</button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Your pet cards</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total Listings', value: stats.total, icon: '📦' },
          { label: 'Available', value: stats.available, icon: '✅' },
          { label: 'Adopted', value: stats.adopted, icon: '🏠' },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <span className="text-2xl" aria-hidden>{s.icon}</span>
            <p className="mt-3 font-display text-3xl font-bold text-brand-600 dark:text-brand-400">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-16 premium-card">
          <p className="text-4xl mb-3" aria-hidden>🐾</p>
          <p className="font-semibold text-slate-600 dark:text-slate-400">No listings yet. Add your first pet!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <article key={pet._id} className="premium-card overflow-hidden group hover:-translate-y-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold capitalize ${
                  pet.status === 'adopted' ? 'bg-slate-700 text-white' : 'bg-emerald-500 text-white'
                }`}>
                  {pet.status}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-xl dark:text-white">{pet.name}</h3>
                <p className="mt-1 text-brand-600 dark:text-brand-400 font-bold text-lg">${pet.adoptionFee}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => openRequests(pet)} className="text-xs px-3 py-2 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-bold rounded-lg hover:bg-violet-200 transition-colors">Requests</button>
                  <button type="button" onClick={() => openEdit(pet)} className="text-xs px-3 py-2 bg-slate-100 dark:bg-slate-700 font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Edit</button>
                  <Link to={`/pet/${pet._id}`} className="text-xs px-3 py-2 bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-bold rounded-lg">View</Link>
                  <button type="button" onClick={() => setDeleteId(pet._id)} className="text-xs px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {requestsModal && (
        <div className="modal-overlay" onClick={() => setRequestsModal(null)}>
          <div className="modal-panel max-w-lg" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">Adoption requests</p>
            <h3 className="font-display text-xl font-bold dark:text-white mt-1">Requests for {requestsModal.name}</h3>
            {requests.length === 0 ? (
              <p className="mt-6 text-slate-500 text-center py-8">No requests yet.</p>
            ) : (
              <ul className="mt-6 space-y-4">
                {requests.map((req) => (
                  <li key={req._id} className="premium-card p-4 !shadow-md">
                    <p className="font-bold dark:text-white">{req.userName}</p>
                    <p className="text-sm text-slate-500">{req.userEmail}</p>
                    <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">Pickup: {new Date(req.pickupDate).toLocaleDateString()}</p>
                    <span className={`inline-block mt-3 ${statusBadge(req.status)}`}>{req.status}</span>
                    {req.status === 'pending' && (
                      <div className="mt-4 flex gap-2">
                        <button type="button" onClick={() => handleApprove(req._id)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors">Approve</button>
                        <button type="button" onClick={() => handleReject(req._id)} className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors">Reject</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <button type="button" onClick={() => setRequestsModal(null)} className="mt-6 w-full py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700">Close</button>
          </div>
        </div>
      )}

      {editPet && editForm && (
        <div className="modal-overlay overflow-y-auto" onClick={() => setEditPet(null)}>
          <div className="modal-panel max-w-2xl my-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-bold mb-6 dark:text-white">Update Pet</h3>
            <PetForm form={editForm} onChange={handleEditChange} onSubmit={handleEditSubmit} submitLabel="Update Pet" ownerEmail={user?.email} />
            <button type="button" onClick={() => setEditPet(null)} className="mt-4 text-sm font-semibold text-slate-500">Cancel</button>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-panel max-w-sm text-center">
            <p className="text-4xl mb-4" aria-hidden>⚠️</p>
            <p className="font-display font-bold text-lg dark:text-white">Delete this listing?</p>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
              <button type="button" onClick={confirmDelete} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
