// Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 lg:px-8 lg:mx-auto lg:max-w-7xl">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-500">
              Ruti Store is your one-stop destination for quality products and
              exceptional customer service. Explore our wide range of items and
              shop with confidence.
            </p>
          </div>
          <div className="p-6 lg:px-8 lg:mx-auto lg:max-w-7xl">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <p className="text-gray-500">
              Address: 123 Ruti Street, Cityville, Country
              <br />
              Phone: +123 456 789
              <br />
              Email: info@rutistore.com
            </p>
          </div>
        </div>
        <div className="container mx-auto flex flex-col items-center justify-center">
          <p className="text-gray-500 footer-text">
            &copy; 2024 Ruti Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
