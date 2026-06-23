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
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-2">New listing</p>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Add a New Pet</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Fill in the details below. Your listing will appear on the All Pets page.</p>
      <div className="premium-card p-6 sm:p-8">
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
