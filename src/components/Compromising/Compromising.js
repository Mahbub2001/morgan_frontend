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
          <source src="/Videos/strength5v.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="px-5">
          <h3 className="text-1xl md:text-2xl">
            Morgen - Classic, refined, uncompromising.
          </h3>
          <p className="font-sans text-sm md:text-xl mt-2 font-light text-justify">
            A woman who selects a Ny Morgen bag embraces a sophisticated and{" "}
            <br />
            understated style, free from logos yet rich in character. For her,{" "}
            <br />
            it is not just an accessory but a lasting investment in timeless{" "}
            <br />
            design and masterful craftsmanship. Each NY bag is thoughtfully
            <br />
            designed to accompany her through shifting seasons and daily life,{" "}
            <br />
            where practicality and elegance come together in perfect harmony.{" "}
            <br />
            With their distinctive, refined details, the bags reflect her <br />
            appreciation for quality and enduring aesthetics. <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Compromising;
