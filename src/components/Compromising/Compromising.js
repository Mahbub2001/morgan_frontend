import React from "react";

function Compromising() {
  return (
    <div className="mt-20">
      <div className="flex flex-col md:flex-row justify-center items-center place-items-center gap-24">
        <video
          className="w-[400px] h-[600px] object-cover"
          controls
          preload="auto"
          autoPlay
          muted
          loop
        >
          <source src="/videos/first.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="px-5">
          <h3 className="text-1xl md:text-2xl">
            Decadent - Classic, refined, uncompromising.
          </h3>
          <p className="font-sans text-sm md:text-xl mt-2 font-light text-justify">
            The woman who chooses a Decadent bag uncompromisingly goes for a <br/>
            logo-free and stylish expression. For her, it is more than an<br/>
            accessory; it is an investment in timeless design and exceptional<br/>
            craftsmanship. NY's bags are created to follow her through the<br/>
            changing seasons and everyday needs, where function and design merge<br/>
            in harmonious balance. With their refined and unique details, the<br/>
            bags pay homage to her sense of quality and classic aesthetics.<br/>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Compromising;
