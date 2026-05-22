import { motion } from 'framer-motion';

const restaurants = [
  'Burger House', 'Pizza Roma', 'Sushi Zen', 'Green Bowl',
  'Taco Fiesta', 'Noodle Bar', 'Curry King', 'Bella Pasta',
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    avatar: 'SJ',
    role: 'Regular Customer',
    quote:
      'Foodiez has completely changed how I order food. The real-time tracking is a game-changer, and delivery is always on time!',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    avatar: 'MC',
    role: 'Food Enthusiast',
    quote:
      'I love the personalized recommendations. I\'ve discovered so many amazing local restaurants I never knew existed.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    avatar: 'ER',
    role: 'Busy Professional',
    quote:
      'Lightning-fast checkout saves me so much time. As someone who orders lunch daily, Foodiez is essential to my routine.',
    rating: 5,
  },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Trusted by top restaurants
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {restaurants.map((name) => (
              <span
                key={name}
                className="text-lg font-bold text-gray-400 hover:text-primary transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-gray-light rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-500 text-sm">★</span>
                ))}
              </div>
              <blockquote className="text-gray-text leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-dark text-sm">{t.name}</div>
                  <div className="text-xs text-gray-text">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
