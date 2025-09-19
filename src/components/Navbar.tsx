import { useState } from 'react';
import { Search, User, Activity } from 'lucide-react';

const Navbar = () => {
  const [isHealthy] = useState(true);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container-x py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-500 flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold gradient-text">
              RealEstate AI
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#listings" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Listings
            </a>
            <a href="#predict" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Predict
            </a>
            <a href="#chat" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Chat
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Health Dot */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
              <span className="text-xs text-white/60 hidden sm:block">
                {isHealthy ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* User Avatar */}
            <button className="btn-ghost p-2 rounded-full">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;