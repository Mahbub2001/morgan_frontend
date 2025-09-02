import React from "react";
import Image from "next/image";

function Strength() {
  return (
    <div className="bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Our Core Strengths
        </h1>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
      </div>

      <section className="max-w-6xl mx-auto mb-16 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 sm:p-10">
            <div className="uppercase tracking-wide text-sm text-amber-600 font-semibold mb-1">
              Innovation Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ny Morgen Development Centre
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Ny Morgen Development Centre is a dedicated hub for creativity, innovation, 
                and development in the field of bag design and manufacturing. Our goal is to 
                empower artisans, designers, and entrepreneurs to create high-quality, 
                market-ready bags that meet international standards.
              </p>
              <p>
                Our team specializes in brainstorming upcoming design trends, sketching, 
                2D/3D design, and prototyping various types of bags including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fashion handbags</li>
                <li>Backpacks</li>
                <li>Travel bags</li>
                <li>School bags</li>
                <li>Laptop sleeves</li>
                <li>Eco-friendly alternatives</li>
              </ul>
              <p>
                We offer comprehensive end-to-end support from concept to finished product.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <Image
              src="/images/strength10.jpg"
              alt="Design Center"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-16 bg-amber-50 rounded-xl p-8 sm:p-10 overflow-hidden">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Diversifying Sourcing: Unlocking Leather Industry Potential
        </h2>
        <div className="space-y-6 text-gray-700">
          <p>
            As global supply chains adapt to shifting economic conditions, labor costs, 
            and trade policies, brands and buyers are looking beyond traditional sourcing 
            markets. Bangladesh's leather industry has emerged as a promising alternative—offering 
            competitive pricing, skilled craftsmanship, and expanding manufacturing capacity 
            across a wide range of leather goods.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-4 h-4 bg-amber-500 rounded-full mr-3"></span>
              Why Choose Bangladesh?
            </h3>
            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-gray-900">1. Strategic Cost Advantage</h4>
                <p className="text-gray-700 mt-1">
                  Bangladesh offers lower production costs compared to China, India, and Vietnam—without 
                  compromising on material quality or skilled labor.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">2. Skilled Workforce & Growing Expertise</h4>
                <p className="text-gray-700 mt-1">
                  With decades of experience in leather tanning and goods manufacturing, Bangladesh is home 
                  to a large pool of artisans and trained professionals.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">3. Government Support & Incentives</h4>
                <p className="text-gray-700 mt-1">
                  Exporters in the leather & leather related manufacturing sectors benefit from tax incentives, 
                  duty drawbacks, and special economic zones focused on leather clusters including the Savar 
                  Leather Industrial Park.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">4. Improved Infrastructure</h4>
                <p className="text-gray-700 mt-1">
                  Investments in modern tanning facilities, eco-friendly production plants, and logistics hubs 
                  have significantly improved product quality and lead times.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">5. Diverse Product Range</h4>
                <p className="text-gray-700 mt-1">
                  All kinds of leather and leather related goods with excellent business connections to China, 
                  South Korea, India & Taiwan markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex flex-row-reverse">
            <div className="md:w-1/2 p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Operational Excellence
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Bangladesh's leather goods industry is a rapidly expanding sector known for its 
                  skilled craftsmanship, cost-effective production, and growing global presence. 
                  With strong government support and access to raw materials, the country has 
                  become a reliable hub for leather goods manufacturing, especially in:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Handbags</li>
                  <li>Footwear</li>
                  <li>Wallets</li>
                  <li>Belts</li>
                  <li>Industrial leather products</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-100 p-8 sm:p-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Operational Strengths
              </h3>
              <ul className="space-y-4">
                {[
                  "Communication (Marketing & Merchandising team)",
                  "Business potentiality analysis",
                  "Design & Development expertise",
                  "Competitive pricing strategies",
                  "Efficient production operations",
                  "Stringent quality control",
                  "Reliable logistics network"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Our Product Range
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            "/images/strength2.jpg",
            "/images/strength3.jpg",
            "/images/strength4.jpg",
            "/images/strength7.jpg",
            "/images/strength6.jpg",
            "/images/strength1.jpg"
          ].map((src, index) => (
            <div key={index} className="relative h-48 sm:h-56 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <Image
                src={src}
                alt={`Product ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Strength;