import logo from '../assets/moveit.png';

export default function About() {
  return (
    <div className="relative bg-white dark:bg-neutral-950 min-h-screen">
      {/* Light mode: Cyan + Teal theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-950 pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-info-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
      <div className="py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">About MoveIt</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">
          Making relocation simple, secure, and stress-free.
        </p>
      </div>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold mb-4 text-neutral-900 dark:text-white">Who We Are</h3>

        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
          MoveIt is a modern logistics and relocation platform built to simplify
          home and office moving for individuals and businesses.
        </p>

        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          By combining technology, trained professionals, and transparent
          pricing, we ensure your belongings move safely, efficiently, and
          without stress.
        </p>
      </section>

      {/* ================= WHY MOVEIT ================= */}
      <section className="py-12 px-4 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-semibold mb-6 text-neutral-900 dark:text-white">Why MoveIt</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">Safety First</h5>
              <p className="text-neutral-600 dark:text-neutral-400">
                Insurance-backed services and careful handling of every item.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">Timely Delivery</h5>
              <p className="text-neutral-600 dark:text-neutral-400">
                Scheduled pickups and reliable delivery commitments.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">Transparent Pricing</h5>
              <p className="text-neutral-600 dark:text-neutral-400">
                No hidden costs — clear and honest pricing from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold mb-6 text-neutral-900 dark:text-white">How It Works</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">1. Book</h5>
            <p className="text-neutral-600 dark:text-neutral-400">
              Select a package and schedule your move online.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">2. Pickup</h5>
            <p className="text-neutral-600 dark:text-neutral-400">
              Our trained team arrives and secures your belongings.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">3. Transport</h5>
            <p className="text-neutral-600 dark:text-neutral-400">
              Safe transportation with real-time tracking updates.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2">4. Delivery</h5>
            <p className="text-neutral-600 dark:text-neutral-400">
              On-time delivery and careful unloading at destination.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="py-12 px-4 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-semibold mb-4 text-neutral-900 dark:text-white">Why Customers Trust Us</h3>

          <ul className="text-lg text-neutral-600 dark:text-neutral-400 space-y-3">
            <li>✔ Insurance-protected shipments</li>
            <li>✔ Professionally trained staff</li>
            <li>✔ Live order tracking</li>
            <li>✔ Dedicated customer support</li>
          </ul>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-12 px-4 max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-3 text-neutral-900 dark:text-white">
          Ready to Move with Confidence?
        </h3>

        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
          Explore our packages and start your move today.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/packages" className="inline-block bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            View Packages
          </a>
          <a href="/register" className="inline-block bg-white dark:bg-neutral-900 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 font-semibold py-3 px-8 rounded-lg transition-colors">
            Get Started
          </a>
        </div>
      </section>

      {/* ================= LOGO AT BOTTOM ================= */}
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
