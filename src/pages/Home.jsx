import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import PetCard from '../components/PetCard';
import SectionHeading from '../components/SectionHeading';
import LoadingSpinner from '../components/LoadingSpinner';
import heroImage from '@images/Pet Home.jpg';
import dogImage from '@images/dog friend.jpg';
import catImage from '@images/cat men.webp';

const heroStats = [
  { value: '500+', label: 'Pets listed' },
  { value: '1,200+', label: 'Happy adoptions' },
  { value: '50+', label: 'Partner shelters' },
];

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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(249,115,22,0.18) 0%, transparent 45%), radial-gradient(circle at 80% 10%, rgba(16,185,129,0.15) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(251,146,60,0.12) 0%, transparent 45%)',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left hero-fade-in">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-orange-100 dark:border-slate-700 shadow-sm mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 tracking-wide">
                  Trusted pet adoption platform
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold text-slate-900 dark:text-white leading-[1.08] tracking-tight">
                Find your next{' '}
                <span className="bg-gradient-to-r from-brand-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  best friend
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Browse verified listings, connect with caring owners, and bring home a companion who is ready to love your family.
              </p>

              <div className="mt-10 flex justify-center lg:justify-start">
                <Link
                  to="/all-pets"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-brand-600/40"
                >
                  Adopt Now
                  <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 pt-8 border-t border-slate-200/80 dark:border-slate-700/80">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end hero-fade-in-delay">
              <div className="relative w-full max-w-md lg:max-w-lg pb-6">
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-400/30 via-transparent to-emerald-400/25 rounded-[2rem] blur-3xl" aria-hidden />

                <div className="relative rounded-[1.75rem] overflow-hidden shadow-2xl shadow-slate-900/15 dark:shadow-black/50 ring-1 ring-white/60 dark:ring-slate-700/80">
                  <img
                    src={heroImage}
                    alt="Dog, cat, and parrot welcoming you to PetHome"
                    className="w-full aspect-[4/5] sm:aspect-[5/6] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 right-5 flex -space-x-2">
                    <img src={dogImage} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                    <img src={catImage} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                  </div>
                </div>

                <div className="absolute left-5 bottom-0 translate-y-1/4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-slate-100/80 dark:border-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Featured today</p>
                  <p className="font-display font-bold text-slate-900 dark:text-white mt-0.5">Ready for adoption</p>
                </div>

                <div className="absolute -left-4 sm:-left-8 top-8 hidden sm:block w-36 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white dark:ring-slate-900 rotate-[-6deg] hover:rotate-0 transition-transform duration-300">
                  <img src={dogImage} alt="Adoptable dog" className="w-full h-28 object-cover" />
                </div>

                <div className="absolute -right-4 sm:-right-8 top-16 sm:top-20 hidden sm:block w-36 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white dark:ring-slate-900 rotate-[6deg] hover:rotate-0 transition-transform duration-300">
                  <img src={catImage} alt="Adoptable cat" className="w-full h-28 object-cover" />
                </div>

                <div className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-1/2 hidden lg:flex items-center gap-2 bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-xl border border-slate-100 dark:border-slate-700">
                  <span className="text-2xl" aria-hidden>⭐</span>
                  <div>
                    <p className="font-display font-bold text-slate-900 dark:text-white leading-none">4.9/5</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Adopter rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Hand-picked for you"
            title="Featured Pets"
            subtitle="Meet loving companions waiting for their forever home — vaccinated, cared for, and ready to join your family."
          />
          {loading ? (
            <LoadingSpinner />
          ) : pets.length === 0 ? (
            <p className="text-center py-16 text-slate-500 glass-card">No featured pets yet. Check back soon!</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/all-pets" className="btn-primary px-8">
              View all pets →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why PetHome"
            title="Adoption that feels right"
            subtitle="Every listing is verified, every pet is cared for, and every adoption is handled with transparency."
          />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="premium-card p-8 sm:p-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-2xl mb-6" aria-hidden>💚</div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Why Adopt Pets?</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                Adoption saves lives and gives animals a second chance. Rescue pets are vaccinated, cared for, and ready to love your family from day one.
              </p>
            </div>
            <div className="premium-card p-8 sm:p-10 bg-gradient-to-br from-brand-50 to-white dark:from-brand-950/30 dark:to-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-2xl mb-6" aria-hidden>✨</div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Success Stories</h3>
              <blockquote className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-brand-400 pl-4">
                "We adopted Buddy through PetHome. He brought joy to our entire family within the first week."
              </blockquote>
              <p className="mt-4 text-sm font-bold text-brand-600 dark:text-brand-400">— Sarah M., Happy adopter</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-900 dark:via-emerald-950 dark:to-slate-950" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, white 0%, transparent 50%)' }} aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200 mb-3">Expert guidance</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Pet Care Tips</h2>
          <p className="mt-4 max-w-2xl mx-auto text-emerald-100 text-lg leading-relaxed">
            Provide fresh water daily, schedule regular vet visits, use positive reinforcement training, and give plenty of exercise and affection.
          </p>
          <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            {[
              { icon: '💧', title: 'Hydration', text: 'Fresh water available at all times.' },
              { icon: '🏥', title: 'Health checks', text: 'Annual vet visits keep pets thriving.' },
              { icon: '🎾', title: 'Play & exercise', text: 'Daily activity builds trust and joy.' },
            ].map((tip) => (
              <div key={tip.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <span className="text-2xl" aria-hidden>{tip.icon}</span>
                <h3 className="mt-3 font-display font-bold text-lg">{tip.title}</h3>
                <p className="mt-2 text-sm text-emerald-100">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="premium-card p-8 sm:p-10 hover:border-brand-200 dark:hover:border-brand-800">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-2xl mb-6" aria-hidden>🤝</div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Volunteer With Us</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                Join our foster network and help pets transition into forever homes while they wait for adoption.
              </p>
            </div>
            <div className="premium-card p-8 sm:p-10 hover:border-brand-200 dark:hover:border-brand-800">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-2xl mb-6" aria-hidden>🏠</div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">List Your Pet</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                Shelters and owners can list pets securely. Manage requests and approvals from your dashboard.
              </p>
              <Link to="/add-pet" className="inline-flex mt-6 text-brand-600 dark:text-brand-400 font-bold text-sm hover:underline">
                Go to dashboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-900 dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Ready to meet your new companion?</h2>
          <p className="mt-4 text-slate-400 text-lg">Browse available pets and start your adoption journey today.</p>
          <Link to="/all-pets" className="btn-primary mt-8 px-10 py-4 text-base">
            Explore all pets
          </Link>
        </div>
      </section>
    </>
  );
}
