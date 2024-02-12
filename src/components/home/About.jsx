import React from "react";

const AboutUs = () => {
  const alasan = [
    {
      title: "Kemudahan Berbelanja",
      description:
        "Capai pelanggan di seluruh dunia. Nikmati kemudahan berbelanja tanpa batasan geografis.",
    },
    {
      title: "Kemudahan Berbelanja 24/7",
      description:
        "Berbelanja kapan saja, di mana saja. Kami menyediakan kemudahan berbelanja tanpa henti di ujung jari Anda.",
    },
    {
      title: "Efisiensi Biaya",
      description:
        "Hemat biaya operasional dengan keberadaan online kami. Fokuslah pada pertumbuhan bisnis, bukan pengeluaran.",
    },
  ];

  return (
    <div className="bg-gray-100 p-4">
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Tentang Kami</h2>
        <div className="flex flex-col lg:flex-row lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4 bg-white rounded-lg shadow-lg p-4 lg:p-8">
          <div className="flex items-center justify-center lg:w-1/2 p-2">
            <img
              src="src\assets\about us.jpg"
              alt="Gambar tentang kami"
              className="w-full h-auto rounded-lg shadow-lg mb-8 lg:mb-0"
            />
          </div>
          <div className="w-full lg:w-1/2 text-gray-600 p-4 lg:p-8">
            <p className="font-bold">Selamat datang di  SANDER’STORE</p>
            <br></br>
            <p>
              Di SANDER’STORE, kami percaya pada kekuatan transformatif dari
              berbelanja online. Perjalanan kami dimulai dengan tujuan yang
              sederhana namun ambisius: menyediakan pengalaman berbelanja yang
              mulus dan menyenangkan bagi setiap pelanggan.
            </p>
            <br></br>
            <p>
              Kami membayangkan dunia di mana setiap orang dapat mengakses
              berbagai produk berkualitas tinggi hanya dengan satu kali klik.
              SANDER’STORE bukan hanya platform e-commerce; ini adalah tujuan di
              mana inovasi bertemu dengan keterjangkauan.
            </p>
            <br></br>
            <p>
              Terima kasih telah memilih SANDER’STORE. Kami berharap dapat
              melayani Anda dengan semangat, dedikasi, dan sentuhan inovatif.
            </p>
            <br></br>
            <p className="font-bold">Selamat berbelanja!</p>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center mt-12 mb-6">
          Mengapa Memilih Kami?
        </h2>
        <p className="text-center text-gray-600 mb-8 lg:w-2/3 mx-auto">
          Di SANDER’STORE, kami bangga menyediakan pengalaman berbelanja online
          yang tak tertandingi. Komitmen kami tidak hanya tentang produk; ini
          tentang memberikan kemudahan, aksesibilitas, dan solusi yang efisien
          biaya bagi pelanggan kami yang berharga.
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8 mb-10">
          {alasan.map((reason, index) => (
            <div
              key={index}
              className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-4 lg:p-8 text-center lg:text-left"
            >
              <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
              <p className="text-gray-600 mb-8">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
