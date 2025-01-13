import React, { useEffect, useState } from "react";

function SalesProfit() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/total-sales`);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  console.log(data);
  

  return (
    <div>
      <div></div>
    </div>
  );
}

export default SalesProfit;
