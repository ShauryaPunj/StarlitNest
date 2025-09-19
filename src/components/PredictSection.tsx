import { useState, useEffect } from 'react';
import { Calculator, Download, MapPin, Home, Bath, Bed, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  city: string;
  neighborhood: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  yearBuilt: string;
  propertyType: string;
}

const PredictSection = () => {
  const [formData, setFormData] = useState<FormData>({
    city: '',
    neighborhood: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    propertyType: 'apartment'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    price: number;
    confidence: number;
    insights: string[];
  } | null>(null);
  
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate realistic prediction
      const basePrice = parseInt(formData.sqft) * (2500 + Math.random() * 1500);
      const cityMultiplier = formData.city.toLowerCase() === 'mumbai' ? 1.8 : 
                            formData.city.toLowerCase() === 'delhi' ? 1.6 : 1.2;
      
      const finalPrice = Math.floor(basePrice * cityMultiplier * (0.9 + Math.random() * 0.2));
      
      setPrediction({
        price: finalPrice,
        confidence: 85 + Math.random() * 10,
        insights: [
          `Property is ${Math.random() > 0.5 ? 'undervalued' : 'fairly priced'} compared to similar listings`,
          `${formData.city} market shows ${Math.random() > 0.5 ? 'upward' : 'stable'} trend this quarter`,
          `Predicted ROI: ${(5 + Math.random() * 8).toFixed(1)}% annually`,
          `Market liquidity: ${Math.random() > 0.5 ? 'High' : 'Medium'} for this property type`
        ]
      });

      toast({
        title: "Prediction Complete",
        description: "AI analysis has been completed successfully.",
      });
      
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Animate price counter
  useEffect(() => {
    if (prediction?.price) {
      let current = 0;
      const target = prediction.price;
      const increment = target / 100;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedPrice(Math.floor(current));
      }, 20);

      return () => clearInterval(timer);
    }
  }, [prediction?.price]);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <section id="predict" className="py-20 bg-gradient-to-b from-background to-slate-900/50">
      <div className="container-x">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Estimate Your Home Price
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Get instant AI-powered property valuations with detailed market insights and predictions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Location */}
              <div className="card p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Property Location
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">City</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input"
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Neighborhood</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      placeholder="e.g., Bandra West"
                      className="input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="card p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-violet-400" />
                  Property Details
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Property Type</label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="house">Independent House</option>
                      <option value="penthouse">Penthouse</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Year Built</label>
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleInputChange}
                      placeholder="2020"
                      min="1950"
                      max={new Date().getFullYear()}
                      className="input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      <Bed className="w-4 h-4 inline mr-1" />
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      placeholder="3"
                      min="1"
                      max="10"
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      <Bath className="w-4 h-4 inline mr-1" />
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      placeholder="2"
                      min="1"
                      max="10"
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Square Feet</label>
                    <input
                      type="number"
                      name="sqft"
                      value={formData.sqft}
                      onChange={handleInputChange}
                      placeholder="1200"
                      min="200"
                      max="10000"
                      className="input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-grad w-full py-4 text-lg animate-magnetic disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Property...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Get AI Prediction
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="card p-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-6">
                Live Summary
              </h3>
              
              {prediction ? (
                <div className="space-y-6">
                  {/* Price Display */}
                  <div className="text-center">
                    <div className="font-mono text-4xl font-bold gradient-text mb-2">
                      {formatPrice(animatedPrice)}
                    </div>
                    <div className="text-sm text-white/60 mb-2">
                      Confidence: {prediction.confidence.toFixed(1)}%
                    </div>
                    <div className="text-xs text-white/50">
                      AI Model: GPT-4 Real Estate Valuation v2.1
                    </div>
                  </div>

                  {/* Insights */}
                  <div>
                    <h4 className="font-medium text-white mb-3">Key Insights</h4>
                    <ul className="space-y-2">
                      {prediction.insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Download Button */}
                  <button className="btn-ghost w-full py-3 animate-magnetic">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report (DOCX)
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-white/40" />
                  </div>
                  <p className="text-white/60">
                    Fill out the form to get an instant AI-powered property valuation
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictSection;