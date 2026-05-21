const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other'];

export default function PetForm({ form, onChange, onSubmit, submitLabel, ownerEmail }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Pet Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="input-field"
            placeholder="Buddy"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Species</label>
          <select name="species" value={form.species} onChange={onChange} required className="input-field">
            {speciesOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Breed</label>
          <input name="breed" value={form.breed} onChange={onChange} required className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Age</label>
          <input name="age" value={form.age} onChange={onChange} required className="input-field" placeholder="2 years" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Gender</label>
          <select name="gender" value={form.gender} onChange={onChange} required className="input-field">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Adoption Fee ($)</label>
          <input
            name="adoptionFee"
            type="number"
            min="0"
            value={form.adoptionFee}
            onChange={onChange}
            required
            className="input-field"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-1">Image URL</label>
          <input name="image" value={form.image} onChange={onChange} required className="input-field" placeholder="https://i.ibb.co/..." />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Health Status</label>
          <input name="healthStatus" value={form.healthStatus} onChange={onChange} required className="input-field" placeholder="Excellent" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Vaccination Status</label>
          <input name="vaccinationStatus" value={form.vaccinationStatus} onChange={onChange} required className="input-field" placeholder="Fully vaccinated" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input name="location" value={form.location} onChange={onChange} required className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Owner Email</label>
          <input value={ownerEmail} readOnly className="input-field bg-slate-100 dark:bg-slate-900 cursor-not-allowed" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            required
            rows={4}
            className="input-field"
          />
        </div>
      </div>
      <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-colors">
        {submitLabel}
      </button>
    </form>
  );
}
