import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import PetForm from '../components/PetForm';

const emptyForm = {
  name: '',
  species: 'Dog',
  breed: '',
  age: '',
  gender: 'Male',
  image: '',
  healthStatus: '',
  vaccinationStatus: '',
  location: '',
  adoptionFee: '',
  description: '',
};

export default function AddPet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/pets', {
        ...form,
        adoptionFee: Number(form.adoptionFee),
      });
      if (data.success) {
        toast.success(data.message);
        navigate('/my-listings');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add pet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Add a New Pet</h2>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
        <PetForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={loading ? 'Saving...' : 'Add Pet'}
          ownerEmail={user?.email}
        />
      </div>
    </div>
  );
}
