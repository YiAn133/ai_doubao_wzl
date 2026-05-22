const footerLinks = {
  Company: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'],
  Product: ['How it Works', 'Restaurants', 'Pricing', 'FAQs', 'Gift Cards'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'],
};

export default function Footer() {
  return (
    <footer className="bg-dark-secondary text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍕</span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Foodiez
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs">
              Your favorite food, delivered fast. We partner with the best local restaurants to bring you restaurant-quality meals in under 30 minutes.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { label: 'Twitter', icon: 'X', href: '#' },
                { label: 'Instagram', icon: 'IG', href: '#' },
                { label: 'Facebook', icon: 'FB', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center text-xs font-bold transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-primary transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Foodiez. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              aria-label="Download on the App Store"
            >
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              aria-label="Get it on Google Play"
            >
              Google Play
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
