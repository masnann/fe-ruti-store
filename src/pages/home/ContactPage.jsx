// ContactPage.jsx
import React, { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = () => {
    // Mengganti nomor telepon WhatsApp dengan nomor Anda sendiri
    const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp yang diinginkan
    const whatsappMessage = `Halo, saya ${name}. Email: ${email}. Pesan: ${message}`;

    // Membuat URL wa.me dengan nomor dan pesan
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Mengarahkan pengguna ke URL WhatsApp
    window.location.href = whatsappURL;
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Hubungi Kami</h2>
        <div className="bg-white p-8 rounded-md shadow-md">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Nama:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Pesan:
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="button"
              onClick={handleFormSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              Kirim Pesan ke WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
