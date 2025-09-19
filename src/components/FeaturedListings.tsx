import { useState, useEffect } from 'react';
import { Search, MapPin, Home, DollarSign, TrendingUp, Star, Bath, Bed, Square } from 'lucide-react';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

interface Property {
  id: number;
  title: string;
  location: {
    city: string;
    area: string;
  };
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  amenities: string[];
  price: number;
  image: string;
  rating: number;
  type: string;
}

const FeaturedListings = () => {
  const [properties] = useState<Property[]>([
    {
      id: 1,
      title: "Luxury Villa with Pool",
      location: { city: "Mumbai", area: "Bandra West" },
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,  
      amenities: ["Pool", "Garden", "Parking"],
      price: 12500000,
      image: property1,
      rating: 4.8,
      type: "Villa"
    },
    {
      id: 2,
      title: "Modern Apartment Complex",
      location: { city: "Bangalore", area: "Koramangala" },
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      amenities: ["Gym", "Terrace", "Security"],
      price: 8500000,
      image: property2,
      rating: 4.6,
      type: "Apartment"
    },
    {
      id: 3,
      title: "Premium Penthouse Suite",
      location: { city: "Delhi", area: "Connaught Place" },
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      amenities: ["Balcony", "Lift", "Club"],
      price: 15000000,
      image: property3,
      rating: 4.9,
      type: "Penthouse"
    }
  ]);

  const [animatedPrices, setAnimatedPrices] = useState<{ [key: number]: number }>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timers: NodeJS.Timeout[] = [];
    
    properties.forEach((property, index) => {
      const timer = setTimeout(() => {
        animatePrice(property.id, property.price);
      }, index * 200);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [properties]);

  const animatePrice = (propertyId: number, targetPrice: number) => {
    let currentPrice = 0;
    const increment = targetPrice / 50;
    const duration = 1200;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
      currentPrice += increment;
      if (currentPrice >= targetPrice) {
        currentPrice = targetPrice;
        clearInterval(timer);
      }
      setAnimatedPrices(prev => ({ ...prev, [propertyId]: Math.floor(currentPrice) }));
    }, stepTime);
  };

  const formatPrice = (price: number): string => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;  
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container-x relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 text-shadow">
            Featured <span className="gradient-text">Properties</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-body leading-relaxed">
            Discover premium properties with AI-powered valuations and market insights
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className={`card-hover group cursor-pointer transition-all duration-700 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Property Image */}
              <div className="relative overflow-hidden rounded-t-2xl aspect-video">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Property Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge bg-white/20 backdrop-blur-md border-white/30 text-white font-medium">
                    {property.type}
                  </span>
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4">
                  <span className="badge bg-white/20 backdrop-blur-md border-white/30 text-white font-medium">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {property.rating}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Property Details */}
              <div className="p-6 space-y-4">
                {/* Location */}
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm">{property.location.area}, {property.location.city}</span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl text-white group-hover:text-primary transition-colors duration-300">
                  {property.title}
                </h3>

                {/* Property Specs */}
                <div className="flex items-center gap-4 text-white/60 text-sm font-body">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms}BR</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms}BA</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  {property.amenities.slice(0, 3).map((amenity, idx) => (
                    <span key={idx} className="badge text-xs">
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="space-y-1">
                    <p className="text-white/60 text-xs font-body">Estimated Value</p>
                    <p className="font-mono text-2xl font-bold text-white">
                      {formatPrice(animatedPrices[property.id] || 0)}
                    </p>
                  </div>
                  <button className="btn-ghost px-4 py-2 text-sm group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
          <button className="btn-grad px-8 py-4 text-lg animate-magnetic group font-semibold">
            <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            View All Properties
            <span className="ml-2 opacity-60">({properties.length * 10}+ available)</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;