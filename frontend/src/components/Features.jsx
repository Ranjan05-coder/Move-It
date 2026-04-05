import React from 'react';

const features = [
  { 
    title: 'Professional', 
    text: 'Our team of professional movers are trained to prioritize efficiency and safety.', 
    icon: '👥',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    title: 'Countrywide', 
    text: 'We offer services for local and long-distance moves with transparent pricing.', 
    icon: '🚚',
    color: 'from-primary-500 to-primary-600'
  },
  { 
    title: 'Personal Touch', 
    text: 'We provide a personalized experience and attentive customer support.', 
    icon: '💬',
    color: 'from-secondary-500 to-secondary-600'
  }
];

export default function Features(){
  return (
    <section className="relative py-24 px-5 overflow-hidden bg-white dark:bg-neutral-900">
      {/* VISIBLE COLOR THEME FOR LIGHT MODE */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-900 pointer-events-none" />
      {/* Light mode: Teal + Blue theme */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-50 dark:to-neutral-200 bg-clip-text text-transparent">
            Why Move With Us?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Industry-leading service with a personal touch and professional expertise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div 
              key={idx} 
              className="group h-full"
            >
              <div className="relative bg-white/70 dark:bg-neutral-800/90 backdrop-blur-md dark:backdrop-blur-sm rounded-2xl p-8 border border-white/40 dark:border-neutral-700/50 shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${f.color} text-white text-3xl mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 shadow-md`}>
                  {f.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                  {f.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {f.text}
                </p>

                {/* Accent line animation */}
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-16 transition-all duration-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
