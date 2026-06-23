import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-slate-950 text-slate-400 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Logo linked compact />
            <p className="mt-5 text-sm leading-relaxed max-w-sm text-slate-400">
              Connecting rescue pets with loving families. Browse, adopt, and manage listings with a platform built for trust.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>123 Rescue Lane, Pet City</li>
              <li><a href="mailto:hello@pethome.org" className="hover:text-brand-400 transition-colors">hello@pethome.org</a></li>
              <li><a href="tel:+15551234567" className="hover:text-brand-400 transition-colors">(555) 123-4567</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">Follow Us</h4>
            <div className="mt-5 flex flex-wrap gap-3">
              {['Facebook', 'Instagram', 'Twitter'].map((name) => (
                <a
                  key={name}
                  href={`https://${name.toLowerCase()}.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sm font-semibold hover:border-brand-500/50 hover:text-brand-400 transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} PetHome Pet Adoption. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/all-pets" className="hover:text-brand-400 transition-colors">Browse pets</Link>
            <Link to="/login" className="hover:text-brand-400 transition-colors">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
