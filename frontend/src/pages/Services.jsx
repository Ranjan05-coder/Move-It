import logo from '../assets/moveit.png';

export default function Services() {
  return (
    <div className="relative bg-white dark:bg-neutral-950 min-h-screen">
      {/* Light mode: Amber/Orange + Blue theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-950 pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-warning-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
      {/* ================= SERVICES GRID ================= */}
      <div className="py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-2">Our Services</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Reliable moving solutions designed for every need.
        </p>
      </div>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* HOME RELOCATION */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow p-6 h-full flex flex-col">
              <div className="mb-4 text-4xl">🏠</div>
              <h5 className="font-semibold text-lg text-neutral-900 dark:text-white">Home Relocation</h5>
              <p className="text-neutral-600 dark:text-neutral-400 mt-3 flex-grow">
                Safe and secure moving for homes and apartments with trained
                professionals handling packing, transport, and delivery.
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <a href="/packages" className="inline-block text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                  View Packages →
                </a>
              </div>
            </div>

            {/* OFFICE RELOCATION */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow p-6 h-full flex flex-col">
              <div className="mb-4 text-4xl">🏢</div>
              <h5 className="font-semibold text-lg text-neutral-900 dark:text-white">Office Relocation</h5>
              <p className="text-neutral-600 dark:text-neutral-400 mt-3 flex-grow">
                Fast and organized office shifting with minimal downtime,
                ideal for startups, SMEs, and corporate moves.
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <a href="/packages" className="inline-block text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                  View Packages →
                </a>
              </div>
            </div>

            {/* STUDENT / BACHELORS */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow p-6 h-full flex flex-col">
              <div className="mb-4 text-4xl">🎓</div>
              <h5 className="font-semibold text-lg text-neutral-900 dark:text-white">Student & Bachelors Moving</h5>
              <p className="text-neutral-600 dark:text-neutral-400 mt-3 flex-grow">
                Budget-friendly and flexible moving services tailored for
                students and individuals with limited belongings.
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <a href="/packages" className="inline-block text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                  View Packages →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-2xl md:text-3xl font-semibold mb-4 text-neutral-900 dark:text-white">
            Why Choose MoveIt?
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-white mb-2">✔ Trained Staff</p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Experienced professionals handle your goods.
              </p>
            </div>

            <div>
              <p className="font-semibold text-neutral-900 dark:text-white mb-2">✔ Secure Transport</p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Well-maintained vehicles with safety checks.
              </p>
            </div>

            <div>
              <p className="font-semibold text-neutral-900 dark:text-white mb-2">✔ Real-time Updates</p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Track your order status at every stage.
              </p>
            </div>

            <div>
              <p className="font-semibold text-neutral-900 dark:text-white mb-2">✔ Transparent Pricing</p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                No hidden charges or last-minute surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-semibold mb-3 text-neutral-900 dark:text-white">
            Find the Right Move for You
          </h3>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
            Compare packages and book your move in minutes.
          </p>

          <a href="/packages" className="inline-block bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Explore Packages
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