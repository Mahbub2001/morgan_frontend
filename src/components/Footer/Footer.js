import Link from "next/link";
import React from "react";
import Newsletter from "../NewsLetter/Newsletter";
import FooterLast from "../FooterLast/FooterLast";

function Footer() {
  
  return (
    <footer>
      <Newsletter/>
      <div className="bg-gradient-to-r from-gray-100 via-[#f1f2f2] to-gray-100">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <p className="max-w-xs">Ny Morgen</p>
              <div className="flex flex-col mt-2 font-thin text-sm">
                <Link href="" className="hover:opacity-75">
                  Store Regnegade 5, 2. TV.
                </Link>
                <Link href="" className="hover:opacity-75">
                  DK-1110 Copenhagen K
                </Link>
                <Link href="" className="hover:opacity-75">
                  info@decadentcopenhagen.dk
                </Link>
                <Link href="" className="hover:opacity-75">
                  +45 70 70 76 37
                </Link>
                <Link href="" className="hover:opacity-75">
                  CVR no. 33583575
                </Link>
                <Link href="" className="mt-4">
                  (Not return address)
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="font-medium">Informaton</p>
                <nav className="flex flex-col mt-2 space-y-2 text-sm font-thin">
                  <Link className="hover:opacity-75" href="">
                    Our History
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Our Responsibility
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Care Instruction
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Sitemap
                  </Link>
                </nav>
              </div>
              <div>
                <p className="font-medium">Customer Services</p>
                <nav className="flex flex-col mt-2 space-y-2 text-sm font-thin">
                  <Link className="hover:opacity-75" href="">
                    FAQ
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Contact
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Delivery & Return
                  </Link>
                  <Link className="hover:opacity-75" href="">
                    Trading Condition
                  </Link>
                </nav>
              </div>
              <div>
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
              </div>
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
          <p className="mt-8 text-xs text-gray-800">© 2022 Comany Name</p>
        </div>
      </div>
      <FooterLast/>
    </footer>
  );
}

export default Footer;
