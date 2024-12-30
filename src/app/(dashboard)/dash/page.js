"use client";

import { getUserRole } from "@/api/user";
import ChartBox from "@/components/ChartBox/ChartBox";
import LastTransaction from "@/components/LastTransaction/LastTransaction";
import {
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
  chartOrder,
} from "@/Data/chart";
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
        <div className="">
          <div className="">
            <div className="">{/* <ChartBox {...chartBoxUser} /> */}</div>
          </div>
          <LastTransaction />
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
