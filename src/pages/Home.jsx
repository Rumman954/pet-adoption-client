import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import PetCard from '../components/PetCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/pets/featured')
      .then(({ data }) => setPets(data.pets || []))
      .catch(() => setPets([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-brand-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <div className="lg:max-w-xl">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-500/10 text-forest-700 dark:text-forest-400 text-sm font-bold mb-6">
              Find your perfect companion today
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Give a loving home to a <span className="text-brand-600 dark:text-brand-400">furry friend</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              PawHome connects rescue animals with caring families. Browse pets, submit adoption requests, and change a life forever.
            </p>
            <Link
              to="/all-pets"
              className="inline-flex mt-8 px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
            >
              Adopt Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">Featured Pets</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/all-pets" className="text-brand-700 dark:text-brand-400 font-bold hover:underline">
              View all pets →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Why Adopt Pets?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Adoption saves lives and gives animals a second chance. Rescue pets are vaccinated, cared for, and ready to love your family.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Success Stories</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 italic">
              "We adopted Buddy through PawHome. He brought joy to our entire family within the first week." — Sarah M.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600 dark:bg-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold">Pet Care Tips</h2>
          <p className="mt-4 max-w-2xl mx-auto text-emerald-100">
            Provide fresh water daily, schedule regular vet visits, use positive reinforcement training, and give plenty of exercise and affection.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Volunteer With Us</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Join our foster network and help pets transition into forever homes while they wait for adoption.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">List Your Pet</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Shelters and owners can list pets securely. Manage requests and approvals from your dashboard.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
