import { motion } from 'framer-motion';

export default function PromoBanner() {
  return (
    <section className="py-16 lg:py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute inset-0 opacity-10">
          {['🍕', '🍔', '🍣', '🥗', '🌮', '🍜', '🥘', '🧁'].map((emoji, i) => (
            <span
              key={i}
              className="absolute text-2xl animate-float"
              style={{
                left: `${10 + i * 11}%`,
                top: `${30 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block bg-white/20 backdrop-blur text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Limited Time Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
            Free delivery on your
            <br className="hidden sm:block" />
            first order
          </h2>
          <p className="mt-4 text-white/80 text-lg max-w-md mx-auto">
            New to Foodiez? Enjoy free delivery on your very first order.
            No minimum spend required.
          </p>
          <motion.a
            href="#final-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl mt-8 shadow-xl hover:shadow-2xl transition-shadow text-lg"
          >
            Claim your free delivery
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
