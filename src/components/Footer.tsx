import { Search, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Property Search', href: '#listings' },
        { name: 'AI Predictions', href: '#predict' },
        { name: 'Chat Assistant', href: '#chat' },
        { name: 'Market Analytics', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'API Docs', href: '#' },
        { name: 'Status', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900/30 to-background border-t border-white/5">
      <div className="container-x">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-500 flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-xl font-bold gradient-text">
                  RealEstate AI
                </span>
              </div>
              
              <p className="text-white/70 mb-6 max-w-md leading-relaxed">
                Revolutionary AI-powered real estate platform providing instant property valuations, 
                market insights, and intelligent investment guidance.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 animate-magnetic"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-heading text-lg font-semibold text-white mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-white/50">
              <a href="#" className="hover:text-white/70 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white/70 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white/70 transition-colors">
                Cookie Policy
              </a>
            </div>

            {/* Copyright & Compliance */}
            <div className="text-center text-sm text-white/50">
              <div className="mb-1">
                © {currentYear} RealEstate AI
              </div>
              <div className="text-xs">
                Made By - ShAuRyA & DhIngRA
              </div>
            </div>
          </div>
        </div>

        {/* Aurora Glow Effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm" />
      </div>
    </footer>
  );
};

export default Footer;