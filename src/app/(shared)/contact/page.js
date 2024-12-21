import React from "react";

function Contact() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-screen-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-[25rem] rounded-sm shadow-lg"
            src="/images/c1.jpg"
            alt="Contact Us"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
          <p className="font-sans font-light text-sm md:text-base leading-relaxed">
            You are welcome to contact us by phone, chat, or email. 
            We strive to respond to inquiries within 2 days. Our team is here to 
            assist you with any questions or concerns you may have.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-16">
        <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-bold">Contact Information</h3>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="mt-8">
              <p className="font-sans font-light text-sm">Karina Mundt Holst</p>
              <p className="font-sans font-light text-sm">
                Owner and Creative Director
              </p>
              <p className="font-sans font-light text-sm">
                kmh@decadentcopenhagen.dk
              </p>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2">
          <img
            className="w-full h-[25rem] rounded-sm shadow-lg"
            src="/images/c2.jpg"
            alt="Contact"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
