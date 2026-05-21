import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import PetForm from '../components/PetForm';
import { useAuth } from '../context/AuthContext';

export default function MyListings() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });
  const [loading, setLoading] = useState(true);
  const [requestsModal, setRequestsModal] = useState(null);
  const [requests, setRequests] = useState([]);
  const [editPet, setEditPet] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    api.get('/api/pets/my-listings')
      .then(({ data }) => {
        setPets(data.pets);
        setStats(data.stats);
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
      openRequests(requestsModal);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Approve failed.');
    }
  };

  const handleReject = async (reqId) => {
    try {
      const { data } = await api.patch(`/api/adoptions/${reqId}/reject`);
      toast.success(data.message);
      openRequests(requestsModal);
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
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">My Listings</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Listings', value: stats.total },
          { label: 'Available', value: stats.available },
          { label: 'Adopted', value: stats.adopted },
        ].map((s) => (
          <div key={s.label} className="bg-brand-50 dark:bg-brand-900/30 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-brand-700 dark:text-brand-300">{s.value}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet._id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <img src={pet.image} alt={pet.name} className="w-full aspect-[4/3] object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg dark:text-white">{pet.name}</h3>
              <p className="text-brand-600 dark:text-brand-400 font-bold">${pet.adoptionFee}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => openRequests(pet)} className="text-xs px-3 py-1.5 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-bold rounded-lg">Requests</button>
                <button type="button" onClick={() => openEdit(pet)} className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-700 font-bold rounded-lg">Edit</button>
                <Link to={`/pet/${pet._id}`} className="text-xs px-3 py-1.5 bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-bold rounded-lg">View</Link>
                <button type="button" onClick={() => setDeleteId(pet._id)} className="text-xs px-3 py-1.5 bg-red-100 dark:bg-red-900/40 text-red-700 font-bold rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {requestsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setRequestsModal(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-bold dark:text-white">Requests for {requestsModal.name}</h3>
            {requests.length === 0 ? (
              <p className="mt-4 text-slate-500">No requests yet.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {requests.map((req) => (
                  <li key={req._id} className="border border-slate-200 dark:border-slate-600 rounded-xl p-4">
                    <p className="font-bold dark:text-white">{req.userName}</p>
                    <p className="text-sm text-slate-500">{req.userEmail}</p>
                    <p className="text-sm mt-1">Pickup: {new Date(req.pickupDate).toLocaleDateString()}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold ${
                      req.status === 'approved' ? 'bg-green-100 text-green-800' :
                      req.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>{req.status}</span>
                    {req.status === 'pending' && (
                      <div className="mt-3 flex gap-2">
                        <button type="button" onClick={() => handleApprove(req._id)} className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-lg">Approve</button>
                        <button type="button" onClick={() => handleReject(req._id)} className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-lg">Reject</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <button type="button" onClick={() => setRequestsModal(null)} className="mt-4 w-full py-2 text-sm font-semibold text-slate-500">Close</button>
          </div>
        </div>
      )}

      {editPet && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 overflow-y-auto" onClick={() => setEditPet(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 my-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-bold mb-4 dark:text-white">Update Pet</h3>
            <PetForm form={editForm} onChange={handleEditChange} onSubmit={handleEditSubmit} submitLabel="Update Pet" ownerEmail={user?.email} />
            <button type="button" onClick={() => setEditPet(null)} className="mt-4 text-sm font-semibold text-slate-500">Cancel</button>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full text-center">
            <p className="font-bold text-lg dark:text-white">Delete this pet listing?</p>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setDeleteId(null)} className="flex-1 py-2 border rounded-xl font-semibold">Cancel</button>
              <button type="button" onClick={confirmDelete} className="flex-1 py-2 bg-red-600 text-white rounded-xl font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
