import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

interface ShowcaseItem {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  type: string;
}

const ShowcaseReel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const showcaseItems: ShowcaseItem[] = [
    {
      id: '1',
      title: 'Luxury Glass Villa',
      location: 'Bandra West, Mumbai',
      price: '₹12.5 Cr',
      image: property1,
      type: 'Villa'
    },
    {
      id: '2',
      title: 'Modern Apartment Complex',
      location: 'Connaught Place, Delhi',
      price: '₹8.9 Cr',
      image: property2,
      type: 'Apartment'
    },
    {
      id: '3',
      title: 'Premium Penthouse',
      location: 'Koramangala, Bangalore',
      price: '₹18.7 Cr',
      image: property3,
      type: 'Penthouse'
    },
    // Duplicate for continuous scroll effect
    {
      id: '4',
      title: 'Executive Suite',
      location: 'Powai, Mumbai',
      price: '₹15.2 Cr',
      image: property1,
      type: 'Suite'
    },
    {
      id: '5',
      title: 'Designer Loft',
      location: 'Cyber City, Gurgaon',
      price: '₹11.8 Cr',
      image: property2,
      type: 'Loft'
    }
  ];

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Card width + gap
      const newScrollLeft = scrollRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons(); // Initial check
      
      return () => scrollContainer.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scroll('left');
      } else if (e.key === 'ArrowRight') {
        scroll('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <section id="showcase" className="py-20 bg-gradient-to-b from-background to-slate-900/30 overflow-hidden">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Property Showcase
            </h2>
            <p className="text-xl text-white/70 max-w-2xl">
              Explore our curated collection of premium properties with immersive parallax effects.
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="text-sm text-white/60">
              Use ← → keys or scroll
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="btn-ghost p-3 disabled:opacity-30 disabled:cursor-not-allowed animate-magnetic"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="btn-ghost p-3 disabled:opacity-30 disabled:cursor-not-allowed animate-magnetic"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Showcase Reel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {showcaseItems.map((item, index) => (
              <div
                key={item.id}
                className="flex-none w-80 group cursor-pointer"
                style={{ 
                  scrollSnapAlign: 'start',
                  transform: 'perspective(1000px)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div className="card-hover overflow-hidden group-hover:scale-105 transition-all duration-500 group-hover:-rotate-1">
                  {/* Image Container with Parallax */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{
                        transform: `translateZ(${index * 10}px)`,
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Scanline Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse" />
                    
                    {/* View Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="btn-ghost p-2 backdrop-blur-xl">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="badge backdrop-blur-xl">
                        {item.type}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="font-heading text-lg font-semibold text-white mb-1 group-hover:gradient-text transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {item.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                        {item.price}
                      </div>
                      
                      <button className="text-sm text-white/60 hover:text-white transition-colors">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="btn-grad px-8 py-4 text-lg animate-magnetic">
            Explore All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseReel;