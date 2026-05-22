import { motion } from 'framer-motion';

const features = [
  {
    title: 'Real-Time Order Tracking',
    description:
      'Know exactly where your food is from the moment you place your order. Watch your delivery rider move on the map in real-time and get notified at every step.',
    icon: '📍',
    image: (
      <div className="w-full h-64 sm:h-80 lg:h-96 bg-primary/10 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border-4 border-primary/20 rounded-full animate-pulse" />
          <div className="absolute w-6 h-6 bg-primary rounded-full shadow-lg shadow-primary/50" />
          <div className="absolute w-2 h-2 bg-primary-dark rounded-full animate-float" style={{ left: '35%', top: '30%' }} />
        </div>
        <span className="text-5xl relative z-10">🛵💨</span>
      </div>
    ),
  },
  {
    title: 'Personalized Recommendations',
    description:
      'Our AI learns your taste preferences and suggests dishes you\'ll love. Discover new restaurants based on your order history and dietary needs.',
    icon: '🤖',
    image: (
      <div className="w-full h-64 sm:h-80 lg:h-96 bg-amber-100/50 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="grid grid-cols-2 gap-3 p-6 w-full max-w-xs">
          {['🍕', '🍣', '🥗', '🌮'].map((emoji, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2 animate-float"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-semibold text-dark">
                {['Pizza', 'Sushi', 'Salad', 'Tacos'][i]}
              </span>
              <span className="text-xs text-primary font-bold">92% match</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Lightning-Fast Checkout',
    description:
      'Reorder with one tap, use saved payment methods, and check out in seconds. Apple Pay, Google Pay, and all major cards supported.',
    icon: '⚡',
    image: (
      <div className="w-full h-64 sm:h-80 lg:h-96 bg-green-100/50 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="bg-white rounded-3xl p-6 shadow-xl w-56">
          <div className="text-sm font-bold text-dark mb-3">Your Order</div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs text-gray-text">
              <span>2x Burgers</span><span className="font-semibold text-dark">$24.00</span>
            </div>
            <div className="flex justify-between text-xs text-gray-text">
              <span>1x Fries</span><span className="font-semibold text-dark">$5.50</span>
            </div>
          </div>
          <div className="border-t border-gray-medium pt-2 flex justify-between text-sm font-bold text-dark mb-4">
            <span>Total</span><span>$29.50</span>
          </div>
          <div className="bg-primary text-white text-center py-2.5 rounded-xl font-bold text-sm cursor-default">
            Pay in 1 tap ⚡
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Exclusive Local Restaurants',
    description:
      'Access hidden gems and local favorites you won\'t find on other apps. We partner directly with neighborhood restaurants to bring you unique options.',
    icon: '🏪',
    image: (
      <div className="w-full h-64 sm:h-80 lg:h-96 bg-purple-100/50 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="grid grid-cols-3 gap-2 p-4">
          {[
            { color: 'bg-red-100', emoji: '🏠' },
            { color: 'bg-blue-100', emoji: '🍜' },
            { color: 'bg-yellow-100', emoji: '🥘' },
            { color: 'bg-green-100', emoji: '🥑' },
            { color: 'bg-pink-100', emoji: '🧁' },
            { color: 'bg-orange-100', emoji: '🌯' },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.color} rounded-2xl p-3 flex flex-col items-center gap-1 shadow-sm`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <div className="h-1.5 bg-gray-400/30 rounded-full w-8" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function FeatureHighlights() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
            Why Foodiez
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark mt-4">
            Everything you need for a better
            <br />
            food delivery experience
          </h2>
        </motion.div>

        <div className="space-y-20 lg:space-y-28">
          {features.map((feature, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7 }}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:direction-rtl'
                }`}
              >
                <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-text text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <motion.div
                  className={isEven ? 'lg:order-2' : 'lg:order-1'}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {feature.image}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
