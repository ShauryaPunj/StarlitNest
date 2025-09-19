import { useState, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, Zap } from 'lucide-react';
import heroAurora from '@/assets/hero-aurora.jpg';

const Hero = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Chennai'];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchValue || selectedCity;
    if (query) {
      // Navigate to listings with selected city/query
      window.location.hash = `#listings?city=${query}`;
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearchValue(city);
  };

  return (
    <section className="min-h-screen flex items-center aurora-bg relative overflow-hidden">
      {/* Cinematic Background Layers */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroAurora}
          alt="Premium aurora background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/30 to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-float blur-sm" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-secondary/80 rounded-full animate-float blur-sm" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-accent-teal/70 rounded-full animate-float blur-sm" style={{ animationDelay: '3s' }} />
      </div>
      
      {/* Main Content */}
      <div className="container-x relative z-10 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Cinematic Headline */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-none mb-8 text-shadow">
              Predict real-estate value
              <br />
              <span className="gradient-text text-glow">with AI</span>
            </h1>
          </div>
          
          {/* Enhanced Subtitle */}
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto font-body leading-relaxed">
              Search listings, estimate prices, and compare neighborhoods in seconds.
            </p>
            <p className="text-lg text-white/70 mb-16 max-w-2xl mx-auto font-body">
              Powered by advanced AI models and real-time market data.
            </p>
          </div>
          
          {/* Premium Search Section */}
          <div className={`mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="glass-strong p-6 mb-8 rounded-2xl border border-white/20">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Enter property address, area, or neighborhood..."
                      className="input pl-12 pr-4 py-4 text-lg w-full"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-grad px-8 py-4 text-lg shrink-0 animate-magnetic group font-semibold"
                  >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Search Properties
                  </button>
                </div>
              </div>
              
              {/* Enhanced City Chips */}
              <div className="flex flex-wrap justify-center items-center gap-3">
                <span className="text-sm text-white/60 font-medium">Popular cities:</span>
                {cities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className={`badge transition-all duration-300 hover:scale-105 cursor-pointer px-4 py-2 ${
                      selectedCity === city 
                        ? 'bg-white/25 border-white/40 text-white shadow-lg' 
                        : 'hover:bg-white/20 hover:border-white/30'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </form>
          </div>
          
          {/* Premium CTA Button */}
          <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <button className="btn-grad text-xl px-12 py-6 animate-magnetic group font-bold shadow-2xl">
              <Zap className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Get Instant AI Estimate
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-sm text-white/60 mt-4 font-body">
              Free analysis • No registration required • Instant results
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-primary/20 blur-2xl animate-float glow-primary" />
      <div className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-secondary/20 blur-2xl animate-float glow-secondary" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-accent-teal/20 blur-2xl animate-float glow-accent" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-1/4 left-20 w-16 h-16 rounded-full bg-accent-rose/20 blur-xl animate-float" style={{ animationDelay: '6s' }} />
    </section>
  );
};

export default Hero;