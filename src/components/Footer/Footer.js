import Link from "next/link";
import React from "react";
import Newsletter from "../NewsLetter/Newsletter";
import FooterLast from "../FooterLast/FooterLast";

function Footer() {
  
  return (
    <div>
      {/* <Newsletter/> */}
      <div className="bg-gradient-to-r from-gray-100 via-[#f1f2f2] to-gray-100">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <p className="max-w-xs">Ny Morgen</p>
              <div className="flex flex-col mt-2 font-thin text-sm">
                <Link href="" className="hover:opacity-75">
                  Greisvej 54,1th.2300 
                </Link>
                <Link href="" className="hover:opacity-75">
                  Copenhagen S, Denmark.
                </Link>
                <Link href="" className="hover:opacity-75">
                 info@nymorgen.com
                </Link>
                <Link href="" className="hover:opacity-75">
                 +45 91 42 91 64
                </Link>
                <Link href="" className="hover:opacity-75">
                  CVR no.45064840
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="font-medium">Informaton</p>
                <nav className="flex flex-col mt-2 space-y-2 text-sm font-thin">
                  <Link className="hover:opacity-75" href="/about">
                    About Us
                  </Link>
                  <Link className="hover:opacity-75" href="/about/responsibility">
                    Our Responsibility
                  </Link>
                  <Link className="hover:opacity-75" href="/strength">
                    Our Strength
                  </Link>
                  <Link className="hover:opacity-75" href="/about/sustainability">
                    Our Sustainability
                  </Link>
                </nav>
              </div>
              <div>
                <p className="font-medium">Customer Services</p>
                <nav className="flex flex-col mt-2 space-y-2 text-sm font-thin">
                  <Link className="hover:opacity-75" href="/strength">
                    FAQ
                  </Link>
                  <Link className="hover:opacity-75" href="/contact">
                    Contact
                  </Link>
                  {/* <Link className="hover:opacity-75" href="">
                    Delivery & Return
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Trading Condition
                  </Link> */}
                </nav>
              </div>
              {/* <div>
                <p className="font-medium">Explore</p>
                <nav className="flex flex-col mt-2 space-y-2 text-sm font-thin">
                  <Link className="hover:opacity-75" href="">
                    Stories
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Collections
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Ny Morgen Community
                  </Link>
                </nav>
              </div> */}
              <div>
                <p className="font-medium">Follow</p>
                <nav className="flex flex-col mt-2 space-y-2 text-sm font-thin">
                  <Link className="hover:opacity-75" href="">
                    Facebook
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Instagram
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Printerest
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Linkedin
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-800">© 2024 Ny Morgen</p>
        </div>
      </div>
      <FooterLast/>
    </div>
  );
}

export default Footer;
