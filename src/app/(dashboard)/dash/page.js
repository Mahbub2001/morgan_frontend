import ChartBox from "@/components/ChartBox/ChartBox";
import LastTransaction from "@/components/LastTransaction/LastTransaction";
import {
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
  chartOrder,
} from "@/Data/chart";
import React from "react";

function Dash() {
  return (
    <div className="">
      {/* <div className="">
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
      </div> */}
     <LastTransaction />
    </div>
  );
}

export default Dash;
