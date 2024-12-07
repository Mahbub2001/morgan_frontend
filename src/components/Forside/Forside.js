import Button2 from "@/containers/common/Button2/Button2";
import React from "react";

function Forside() {
  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row items-center place-items-center justify-between px-6 md:px-12 py-12 bg-white">
        <div className="">
          <img
            src="/images/forside.jpg"
            alt="Crossbody bags"
            className="w-full"
          />
        </div>
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-thin font-serif italic mb-4">
            Decadent work bags
          </h2>
          <p className="font-sans mb-6">
            Our work bags combine the best of Danish design, where functionality
            meets uncompromising quality. Perfect for your everyday life with
            space for all your necessities and a laptop.
          </p>
          <Button2 text=" See them all here →" />
        </div>
      </div>
    </div>
  );
}

export default Forside;
