import React from "react";

function Announcement() {
  return (
    <div>
      <div className="bg-black text-white upper flex flex-col justify-center items-center">
        <p className="py-2 tracking-widest text-sm">
          BLACK WEEK - SAVE 20% ON EVERYTHING
        </p>
      </div>
      <div className="bg-gray-100 upper flex flex-col justify-center items-center text-black">
        <p className="py-2 tracking-wider text-sm">
          Free shipping / Christmas gifts are exchanged until 15-01-25 / Easy
          returns
        </p>
      </div>
    </div>
  );
}

export default Announcement;
