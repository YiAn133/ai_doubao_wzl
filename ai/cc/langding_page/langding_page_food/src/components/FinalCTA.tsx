import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section id="final-cta" className="py-20 lg:py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
            Download Foodiez and get your
            <br className="hidden lg:block" />
            food faster than ever
          </h2>
          <p className="mt-6 text-gray-400 text-lg max-w-lg mx-auto">
            Join over 2 million hungry customers. Available on iOS and Android.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-dark font-semibold px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl active:scale-95 w-48"
              aria-label="Download on the App Store"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-60">Download on the</div>
                <div className="text-base font-semibold -mt-0.5">App Store</div>
              </div>
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-dark font-semibold px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl active:scale-95 w-48"
              aria-label="Get it on Google Play"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm14.166 6.037l-2.958 2.379 2.958 2.956L20.4 12l-2.625-4.149zM5.083 21.253l8.398-8.398-2.285-2.285-6.113 10.683zm.731-18.73L13.5 9.75l2.244-2.244L5.814 2.523zM16.1 10.828l3.075-2.409c.45-.36 1.08-.3 1.44.15.36.45.3 1.08-.15 1.44l-1.912 1.488L16.1 10.828z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-60">Get it on</div>
                <div className="text-base font-semibold -mt-0.5">Google Play</div>
              </div>
            </a>
          </motion.div>

          <p className="mt-8 text-gray-600 text-sm">
            Free delivery on your first order. No commitment, cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
