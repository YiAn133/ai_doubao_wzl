import { motion } from 'framer-motion';

const steps = [
  {
    icon: '🔍',
    title: 'Browse Restaurants',
    description:
      'Explore hundreds of local restaurants, from neighborhood favorites to trending new spots. Filter by cuisine, rating, or delivery time.',
  },
  {
    icon: '📱',
    title: 'Order in Seconds',
    description:
      'Tap to reorder your favorites or customize every detail. Secure checkout with saved payment methods makes ordering effortless.',
  },
  {
    icon: '🛵',
    title: 'Fast Delivery',
    description:
      'Track your order in real-time from kitchen to doorstep. Most deliveries arrive in under 30 minutes, hot and fresh.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark mt-4">
            Get food delivered in 3 easy steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative text-center"
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gray-200 text-3xl lg:text-4xl">
                {step.icon}
              </div>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 lg:top-12 left-[60%] w-[80%] lg:w-[80%]">
                  <svg viewBox="0 0 200 20" className="w-full h-5 text-primary/30">
                    <path
                      d="M0 10 L160 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      fill="none"
                    />
                    <path d="M170 10 L185 5 L185 15 Z" fill="currentColor" />
                  </svg>
                </div>
              )}

              <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
              <p className="text-gray-text leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
