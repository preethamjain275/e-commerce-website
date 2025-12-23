import { Link } from "react-router-dom";

const footerLinks = {
  "Get to Know Us": ["About Us", "Careers", "Press Releases", "ShopKart Science"],
  "Connect with Us": ["Facebook", "Twitter", "Instagram"],
  "Make Money with Us": ["Sell on ShopKart", "Sell under ShopKart Accelerator", "Become an Affiliate"],
  "Let Us Help You": ["COVID-19 and ShopKart", "Your Account", "Returns Centre", "100% Purchase Protection", "ShopKart App Download", "Help"],
};

export function Footer() {
  return (
    <footer>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-amazon-light hover:bg-opacity-90 text-white text-sm py-4"
      >
        Back to top
      </button>

      {/* Links */}
      <div className="bg-amazon-light py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-bold mb-3">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link to="#" className="text-gray-300 text-sm hover:text-white hover:underline">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-amazon-dark py-6">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="inline-block mb-4">
            <span className="text-xl font-bold text-white">shop</span>
            <span className="text-xl font-bold text-amazon-orange">Kart</span>
          </Link>
          <p className="text-gray-400 text-xs">
            © 2024 ShopKart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
