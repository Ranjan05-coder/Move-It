import React from 'react';
import logo from '../assets/moveit.png';

export default function Footer(){
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-900 dark:bg-black text-neutral-300 dark:text-neutral-400 py-16 md:py-24 overflow-hidden border-t border-neutral-800 dark:border-neutral-900">
      {/* ANIMATED GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:from-black dark:via-neutral-900 dark:to-black pointer-events-none" />
      
      {/* GLOW EFFECTS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="MoveIt Logo" className="h-8 w-auto" />
              <h6 className="text-xl font-bold text-white dark:text-neutral-50">Move It</h6>
            </div>
            <p className="text-neutral-400 dark:text-neutral-500 leading-relaxed">
              Moving made simple — packing, loading, transport, delivery.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                𝕏
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                f
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                in
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h6 className="text-white dark:text-neutral-200 font-semibold tracking-wide">Product</h6>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Packages</a></li>
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">FAQs</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h6 className="text-white dark:text-neutral-200 font-semibold tracking-wide">Company</h6>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h6 className="text-white dark:text-neutral-200 font-semibold tracking-wide">Legal</h6>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-neutral-800 dark:border-neutral-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-600">
            © {currentYear} Move It. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-neutral-400 dark:text-neutral-600 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Privacy</a>
            <a href="#" className="text-neutral-400 dark:text-neutral-600 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Terms</a>
            <a href="#" className="text-neutral-400 dark:text-neutral-600 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
