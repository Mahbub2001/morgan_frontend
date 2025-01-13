"use client";

import { getUserRole } from "@/api/user";
import AddedSalesChart from "@/components/AddedSalesChart/AddedSalesChart";
import ChartsComponent from "@/components/ChartsComponent/ChartsComponent";
import LastFiveOrders from "@/components/LastFiveOrders/LastFiveOrders";
import LastTransaction from "@/components/LastTransaction/LastTransaction";
import SalesProfit from "@/components/SalesProfit/SalesProfit";
import TopSaleFiveProduct from "@/components/TopSaleFiveProduct/TopSaleFiveProduct";
import { AuthContext } from "@/hooks/AuthProvider";
import React, { useContext, useEffect, useState } from "react";

function Dash() {
  const { user } = useContext(AuthContext);

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      getUserRole(user.email).then((data) => {
        setRole(data);
        setLoading(false);
      });
    }
  }, [user]);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : role === "admin" ? (
        <div className="font-futura-sans font-thin">
          <div className="">
            {/* <AddedSalesChart /> */}
          </div>
          <div>
            <ChartsComponent />
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <TopSaleFiveProduct />
            <LastFiveOrders />
            <SalesProfit/>
          </div>
          {/* <LastTransaction /> */}
        </div>
      ) : (
        <div className="">
          <p> You are User........</p>
        </div>
      )}
    </>
  );
}

export default Dash;
