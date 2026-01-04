import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import sambhavLogo from './../../assets/sambhav_logo.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Team', href: '/team' },
  ];

  const getInvolved = [
    { label: 'Donate', href: '/donate' },
    { label: 'Become a Member', href: '/membership' },
    { label: 'Volunteer', href: '/membership' },
    { label: 'Partner With Us', href: '/about' },
  ];

  const motos = [
    'Financial Learning',
    'Entrepreneurship',
    'Social Service',
    'Mental Health',
    'Innovation',
  ];

  return (
    <footer className="relative bg-primary text-primary-foreground">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 h-16 -translate-y-full overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-16"
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 64H1440V32C1440 32 1320 0 1080 16C840 32 720 48 480 48C240 48 120 16 0 32V64Z"
            fill="hsl(var(--primary))"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              {/* ✅ LOGO ONLY */}
              <img
                src={sambhavLogo}
                alt="Sambhav Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering communities through financial literacy,
              entrepreneurship, and holistic development.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {motos.map((moto) => (
                <span
                  key={moto}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary-foreground/10 border border-primary-foreground/20"
                >
                  {moto}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              Get Involved
            </h4>
            <ul className="space-y-3">
              {getInvolved.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-secondary" />
                <span className="text-primary-foreground/80">
                  123 Community Center Road
                  <br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary" />
                <a
                  href="tel:+919876543210"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary" />
                <a
                  href="mailto:hello@empower.org"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  hello@empower.org
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Sambhav Foundation. All rights reserved.
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="text-primary-foreground hover:text-secondary hover:bg-primary-foreground/10"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
