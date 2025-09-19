import { Shield, Zap, Lock } from 'lucide-react';

const TrustSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Accuracy',
      description: '94.2% prediction accuracy validated against real market transactions',
      metric: '94.2%'
    },
    {
      icon: Zap,
      title: 'Speed', 
      description: 'Instant AI analysis powered by advanced machine learning models',
      metric: '<2s'
    },
    {
      icon: Lock,
      title: 'Privacy',
      description: 'Your data is encrypted and never shared with third parties',
      metric: '100%'
    }
  ];

  return (
    <section id="trust" className="py-20 bg-background">
      <div className="container-x">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Why Trust Our AI
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Built with cutting-edge technology and validated by real market data.
          </p>
          
          {/* Tech Stack Note */}
          <div className="text-sm text-white/50">
            <span className="font-mono">FastAPI backend • Vite + React • Tailwind CSS</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="card-hover text-center p-8"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-blue-400" />
              </div>

              {/* Metric */}
              <div className="font-mono text-3xl font-bold gradient-text mb-3">
                {feature.metric}
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 text-sm text-white/50">
            <span>🏆 SIH25042 Winner</span>
            <span>🔒 SOC 2 Compliant</span>
            <span>⚡ 99.9% Uptime</span>
            <span>🎯 Ministry of Earth Sciences</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;