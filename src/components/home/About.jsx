import React from "react";

const AboutUs = () => {
  const reasons = [
    {
      title: "Shopping Convenience",
      description:
        "Reach customers worldwide. Enjoy shopping convenience without geographical limitations.",
    },
    {
      title: "24/7 Shopping Ease",
      description:
        "Shop anytime, anywhere. We provide non-stop shopping convenience at your fingertips",
    },
    {
      title: "Cost Efficiency",
      description:
        "Save on operational costs with our online presence. Focus on business growth, not expenses.",
    },
  ];

  return (
    // <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-100">
      <div className="bg-gray-100 p-4">
      <h2 className="text-4xl font-bold mb-8 text-center">About Us</h2>
      <div className="flex flex-col lg:flex-row lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4 bg-white rounded-lg shadow-lg p-4 lg:p-8">
        <div className="flex items-center justify-center lg:w-1/2 p-2">
          <img
            src="https://res.cloudinary.com/dufa4bel6/image/upload/v1702302550/disappear/pvkmms1w5dvw3o85vvqf.png"
            alt="Gambar tentang kami"
            className="w-full h-auto rounded-lg shadow-lg mb-8 lg:mb-0"
          />
        </div>
        <div className="w-full lg:w-1/2 text-gray-600 p-4 lg:p-8">
          <p className="font-bold">Welcome to Ruti Store</p>
          <br></br>
          <p>
            At Ruti Store, we believe in the transformative power of online
            shopping. Our journey began with a simple yet ambitious goal: to
            provide a seamless and delightful shopping experience for every
            customer.
          </p>
          <br></br>
          <p>
            We envision a world where everyone can access a diverse range of
            high-quality products with just a click. Ruti Store is not just an
            e-commerce platform; it's a destination where innovation meets
            affordability.
          </p>
          <br></br>
          <p>
            Thank you for choosing Ruti Store. We look forward to serving you
            with passion, dedication, and a touch of innovation.
          </p>
          <br></br>
          <p className="font-bold">Happy Shopping!</p>
        </div>
      </div>

      <h2 className="text-4xl font-bold text-center mt-12 mb-12">
        Why Choose Us?
      </h2>
      <p className="text-center text-gray-600 mb-8 lg:w-2/3 mx-auto">
        At Ruti Store, we take pride in providing an unparalleled online
        shopping experience. Our commitment goes beyond products; it's about
        delivering convenience, accessibility, and cost-efficient solutions to
        our valued customers.
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8 mb-10">
        {reasons.map((reason, index) => (
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
  );
};

export default AboutUs;
