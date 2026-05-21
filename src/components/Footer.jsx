import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-400 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">🐾</span>
              <span className="font-display font-bold text-lg text-white">PawHome</span>
            </Link>
            <p className="mt-4 text-sm">Connecting rescue pets with loving families across the community.</p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>123 Rescue Lane, Pet City</li>
              <li><a href="mailto:hello@pawhome.org" className="hover:text-brand-400">hello@pawhome.org</a></li>
              <li><a href="tel:+15551234567" className="hover:text-brand-400">(555) 123-4567</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Follow Us</h4>
            <div className="mt-4 flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-400 font-semibold">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-400 font-semibold">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-400 font-semibold">Twitter</a>
            </div>
          </div>
        </div>
        <p className="mt-10 pt-8 border-t border-slate-800 text-sm text-center">
          © {new Date().getFullYear()} PawHome Pet Adoption. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
