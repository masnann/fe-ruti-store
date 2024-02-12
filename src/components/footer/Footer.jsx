// Footer.jsx
const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-8 md:py-12">
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 lg:px-8 lg:mx-auto lg:max-w-7xl">
              <h2 className="text-xl font-semibold mb-4">Tentang Kami</h2>
              <p className="text-gray-500">
              SANDER’STORE adalah tujuan Anda untuk produk berkualitas dan
                layanan pelanggan yang luar biasa. Jelajahi berbagai macam produk
                kami dan berbelanja dengan percaya diri.
              </p>
            </div>
            <div className="p-6 lg:px-8 lg:mx-auto lg:max-w-7xl">
              <h2 className="text-xl font-semibold mb-4">Kontak</h2>
              <p className="text-gray-500">
                Alamat: Jalan Ruti 123, Kota Raya, Negara
                <br />
                Telepon: +123 456 789
                <br />
                Email: info@sander'store.com
              </p>
            </div>
          </div>
          <div className="container mx-auto flex flex-col items-center justify-center">
            <p className="text-gray-500 footer-text text-center">
              &copy; 2024 SANDER’STORE. Seluruh hak cipta dilindungi.
            </p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
