import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

const floatingCards = [
  { emoji: '🍔', label: 'Burgers', delay: 0, x: '-10%', y: '15%' },
  { emoji: '🍕', label: 'Pizza', delay: 0.3, x: '70%', y: '5%' },
  { emoji: '🍣', label: 'Sushi', delay: 0.6, x: '80%', y: '55%' },
  { emoji: '🥗', label: 'Salads', delay: 0.9, x: '5%', y: '72%' },
  { emoji: '🌮', label: 'Tacos', delay: 1.2, x: '55%', y: '80%' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-dark leading-[1.05] tracking-tight"
            >
              Your favorite food,
              <br />
              <span className="text-primary">delivered fast</span>
            </motion.h1>

            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-gray-text max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Order from hundreds of local restaurants, track your delivery in
              real-time, and enjoy restaurant-quality meals at your doorstep in
              under 30 minutes.
            </motion.p>

            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-dark hover:bg-dark-secondary text-white font-semibold px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl active:scale-95"
                aria-label="Download on the App Store"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-base font-semibold -mt-0.5">App Store</div>
                </div>
              </a>

              <a
                href="#"
                className="inline-flex items-center gap-3 bg-dark hover:bg-dark-secondary text-white font-semibold px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl active:scale-95"
                aria-label="Get it on Google Play"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm14.166 6.037l-2.958 2.379 2.958 2.956L20.4 12l-2.625-4.149zM5.083 21.253l8.398-8.398-2.285-2.285-6.113 10.683zm.731-18.73L13.5 9.75l2.244-2.244L5.814 2.523zM16.1 10.828l3.075-2.409c.45-.36 1.08-.3 1.44.15.36.45.3 1.08-.15 1.44l-1.912 1.488L16.1 10.828z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="text-base font-semibold -mt-0.5">Google Play</div>
                </div>
              </a>
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-gray-text"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">★★★★★</span>
                <span className="font-semibold text-dark">4.9</span>
                <span>(12k+ reviews)</span>
              </div>
              <div className="w-px h-5 bg-gray-medium hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span>
                  <span className="font-semibold text-dark">30 min</span> delivery
                </span>
              </div>
              <div className="w-px h-5 bg-gray-medium hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏪</span>
                <span>
                  <span className="font-semibold text-dark">500+</span> restaurants
                </span>
              </div>
            </motion.div>
          </div>

          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative"
            >
              <div className="w-64 sm:w-72 lg:w-80 h-[500px] sm:h-[560px] lg:h-[600px] bg-dark rounded-[2.5rem] p-3 shadow-2xl shadow-primary/20 relative z-10">
                <div className="w-full h-full bg-gray-light rounded-[2rem] overflow-hidden flex flex-col">
                  <div className="bg-primary h-12 flex items-center justify-center text-white font-bold text-sm">
                    Foodiez
                  </div>
                  <div className="flex-1 p-4 space-y-3">
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="h-3 bg-gray-medium rounded-full w-3/4" />
                      <div className="h-2 bg-gray-medium rounded-full w-1/2 mt-2" />
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex gap-3">
                        <div className="w-14 h-14 bg-orange-100 rounded-xl flex-shrink-0" />
                        <div className="flex-1">
                          <div className="h-3 bg-gray-medium rounded-full w-2/3" />
                          <div className="h-2 bg-gray-medium rounded-full w-full mt-2" />
                          <div className="h-2 bg-gray-medium rounded-full w-1/2 mt-1" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex gap-3">
                        <div className="w-14 h-14 bg-green-100 rounded-xl flex-shrink-0" />
                        <div className="flex-1">
                          <div className="h-3 bg-gray-medium rounded-full w-2/3" />
                          <div className="h-2 bg-gray-medium rounded-full w-full mt-2" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <div className="flex gap-3">
                        <div className="w-14 h-14 bg-purple-100 rounded-xl flex-shrink-0" />
                        <div className="flex-1">
                          <div className="h-3 bg-gray-medium rounded-full w-1/2" />
                          <div className="h-2 bg-gray-medium rounded-full w-full mt-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {floatingCards.map((card) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + card.delay, type: 'spring' }}
                className="absolute z-20 animate-float"
                style={{ left: card.x, top: card.y }}
              >
                <div className="bg-white rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2 text-sm font-semibold">
                  <span className="text-xl">{card.emoji}</span>
                  {card.label}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="absolute -right-6 top-1/3 z-30 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">
                🛵
              </div>
              <div>
                <div className="text-xs text-gray-text">Your order is</div>
                <div className="text-sm font-bold text-green-600">On the way!</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C757D" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
