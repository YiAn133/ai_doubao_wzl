import { motion } from 'framer-motion';

const screens = [
  {
    title: 'Browse',
    subtitle: 'Discover restaurants',
    color: 'bg-gradient-to-b from-orange-400 to-primary',
    content: (
      <div className="space-y-2">
        {['🍕 Italian Spot', '🍣 Sushi Bar', '🥗 Green Eats', '🌮 Taqueria'].map(
          (item, i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur rounded-xl px-3 py-2.5 text-white text-xs font-medium flex items-center gap-2"
            >
              <span>{item}</span>
            </div>
          )
        )}
      </div>
    ),
  },
  {
    title: 'Order',
    subtitle: 'Customize & pay',
    color: 'bg-gradient-to-b from-green-400 to-green-600',
    content: (
      <div className="space-y-2">
        <div className="bg-white/20 backdrop-blur rounded-xl p-3">
          <div className="text-white text-xs font-bold mb-2">Pepperoni Pizza</div>
          <div className="flex gap-1">
            {['Size M', 'Extra cheese', 'Coke'].map((opt) => (
              <span key={opt} className="bg-white/30 text-white text-[10px] px-2 py-0.5 rounded-full">
                {opt}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-white text-xs font-bold text-center">
          Add to cart — $18.99
        </div>
      </div>
    ),
  },
  {
    title: 'Track',
    subtitle: 'Real-time map',
    color: 'bg-gradient-to-b from-blue-400 to-blue-600',
    content: (
      <div className="space-y-2">
        <div className="bg-white/20 backdrop-blur rounded-xl p-3">
          <div className="text-white text-xs font-bold flex items-center gap-2">
            <span className="w-3 h-3 bg-green-300 rounded-full animate-pulse" />
            Rider nearby
          </div>
          <div className="text-white/80 text-[10px] mt-1">Arriving in 8 minutes</div>
          <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-white rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Enjoy',
    subtitle: 'Rate & reorder',
    color: 'bg-gradient-to-b from-purple-400 to-purple-600',
    content: (
      <div className="space-y-2">
        <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
          <div className="text-2xl mb-1">🍕</div>
          <div className="text-white text-xs font-bold">Delivered!</div>
          <div className="flex justify-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-yellow-300 text-xs">★</span>
            ))}
          </div>
          <div className="bg-white/30 text-white text-[10px] px-3 py-1 rounded-full mt-2 inline-block">
            Reorder
          </div>
        </div>
      </div>
    ),
  },
];

export default function AppPreview() {
  return (
    <section className="py-20 lg:py-28 bg-gray-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
            App Preview
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark mt-4">
            A look inside the Foodiez app
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-6 px-4 animate-scroll"
          style={{ width: 'max-content' }}
        >
          {[...screens, ...screens].map((screen, i) => (
            <div
              key={i}
              className={`w-56 h-[380px] rounded-[2rem] p-3 shadow-xl flex-shrink-0 ${screen.color}`}
            >
              <div className="w-full h-full bg-black/10 rounded-[1.7rem] p-4 flex flex-col">
                <div className="text-white/60 text-[10px] font-medium mb-1">
                  {screen.subtitle}
                </div>
                <div className="text-white text-base font-bold mb-4">
                  {screen.title}
                </div>
                {screen.content}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-light to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-light to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
