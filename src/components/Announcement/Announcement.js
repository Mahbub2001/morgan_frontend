import React from "react";

function Announcement({ settings }) {
  return (
    <div>
      {settings?.firstTopVisible && (
        <div className="bg-black text-white upper flex flex-col justify-center items-center">
          <p className="py-2 tracking-widest text-sm">
            {settings.firstTop || "BLACK WEEK - SAVE 20% ON EVERYTHING"}
          </p>
        </div>
      )}
      {settings?.secondTopVisible && (
        <div className="bg-gray-100 upper flex flex-col justify-center items-center text-black">
          <p className="py-2 tracking-wider text-sm">
            {settings.secondTop || "Free shipping / Christmas gifts are exchanged until 15-01-25 / Easy returns"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Announcement;