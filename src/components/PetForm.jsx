const speciesOptions = ['Dog', 'Cat', 'Bird', 'Others'];

export default function PetForm({ form, onChange, onSubmit, submitLabel, ownerEmail }) {
  const labelClass = 'block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Pet Name</label>
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
          <label className={labelClass}>Species</label>
          <select name="species" value={form.species} onChange={onChange} required className="input-field">
            {speciesOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Breed</label>
          <input name="breed" value={form.breed} onChange={onChange} required className="input-field" />
        </div>
        <div>
          <label className={labelClass}>Age</label>
          <input name="age" value={form.age} onChange={onChange} required className="input-field" placeholder="2 years" />
        </div>
        <div>
          <label className={labelClass}>Gender</label>
          <select name="gender" value={form.gender} onChange={onChange} required className="input-field">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Adoption Fee ($)</label>
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
          <label className={labelClass}>Image URL</label>
          <input name="image" value={form.image} onChange={onChange} required className="input-field" placeholder="https://i.ibb.co/..." />
        </div>
        <div>
          <label className={labelClass}>Health Status</label>
          <input name="healthStatus" value={form.healthStatus} onChange={onChange} required className="input-field" placeholder="Excellent" />
        </div>
        <div>
          <label className={labelClass}>Vaccination Status</label>
          <input name="vaccinationStatus" value={form.vaccinationStatus} onChange={onChange} required className="input-field" placeholder="Fully vaccinated" />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input name="location" value={form.location} onChange={onChange} required className="input-field" />
        </div>
        <div>
          <label className={labelClass}>Owner Email</label>
          <input value={ownerEmail} readOnly className="input-field bg-slate-100 dark:bg-slate-900 cursor-not-allowed" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Description</label>
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
      <button type="submit" className="btn-primary w-full sm:w-auto px-10 py-3.5">
        {submitLabel}
      </button>
    </form>
  );
}
