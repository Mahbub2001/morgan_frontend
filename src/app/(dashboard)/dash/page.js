import ChartBox from "@/components/ChartBox/ChartBox";
import LastTransaction from "@/components/LastTransaction/LastTransaction";
import {
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
  chartOrder,
} from "@/Data/chart";
import React from "react";
const transactions = [
  { id: "#5089", date: "31 March 2023", total: "$1200" },
  { id: "#5089", date: "31 March 2023", total: "$1200" },
  { id: "#5089", date: "31 March 2023", total: "$1200" },
  { id: "#5089", date: "31 March 2023", total: "$1200" },
  { id: "#5089", date: "31 March 2023", total: "$1200" },
];
function Dash() {
  return (
    <div className="pt-20 ml-10 text-black">
      <div className="flex gap-10 flex-wrap justify-center md:justify-start">
        <div className="">
          <ChartBox {...chartBoxUser} />
        </div>
        <div>
          <ChartBox {...chartBoxProduct} />
        </div>
        <div>
          <ChartBox {...chartOrder} />
        </div>
        <div>
          <ChartBox {...chartBoxRevenue} />
        </div>
      </div>
      <div className="mt-10 px-5">
       <LastTransaction transactions={transactions} />
      </div>
    </div>
  );
}

export default Dash;
