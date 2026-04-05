import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PackageCard from '../components/PackageCard';
import logo from '../assets/moveit.png';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/packages');

        // Optional: show popular packages first
        const sorted = [...res.data].sort(
          (a, b) => (b.isPopular === true) - (a.isPopular === true)
        );

        setPackages(sorted);
      } catch (err) {
        console.error('Failed to load packages', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="relative bg-white dark:bg-neutral-950 min-h-screen">
      {/* Gradient background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-950 pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center py-8">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-3">Our Packages</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Choose a plan that fits your moving needs
          </p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg text-neutral-600 dark:text-neutral-400">Loading packages...</p>
          </div>
        )}

        {/* NO PACKAGES STATE */}
        {!loading && packages.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg text-neutral-600 dark:text-neutral-400">No packages available yet.</p>
          </div>
        )}

        {/* PACKAGES GRID */}
        {!loading && packages.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map(pkg => (
                  <PackageCard pkg={pkg} key={pkg._id} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* LOGO AT BOTTOM */}
        <section className="py-12 text-center relative">
          <div className="mb-4">
            <div className="inline-block bg-white/90 dark:bg-neutral-900/90 p-4 rounded-2xl backdrop-blur-md">
              <img src={logo} alt="Move It" className="h-20 w-auto" />
            </div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">© 2024 MoveIt - Your Trusted Moving Partner</p>
        </section>
      </div>
    </div>
  );
}
