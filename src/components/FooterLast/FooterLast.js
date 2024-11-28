import {
    FaCcVisa,
    FaCcMastercard,
    FaCcApplePay,
    FaGooglePay,
  } from "react-icons/fa";
  
  function FooterLast() {
    return (
      <div className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center py-5">
            <div className="text-gray-600 text-sm text-center md:text-left">
              &copy; 2024 Ny Morgen. All rights reserved.
            </div>
  
            <div className="flex justify-center space-x-4">
              <FaCcVisa className="text-blue-600 text-2xl" />
              <FaCcMastercard className="text-red-600 text-2xl" />
              <FaGooglePay className="text-gray-800 text-2xl" />
              <FaCcApplePay className="text-black text-2xl" />
            </div>
  
            <div className="flex justify-center lg:justify-end items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
                <span className="text-sm text-gray-600">ny morgen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default FooterLast;
  