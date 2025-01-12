import React, { useEffect, useState } from "react";
import PieChart from "../PieChart/PieChart";
import axios from "axios";

function ChartsComponent() {
  const [data, setData] = useState({
    personData: [],
    categoryData: [],
    subCategoryData: [],
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/pie-chart-data`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch chart data", error);
      });
  }, []);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h3 className="my-8 text-center text-2xl">Products Distribution</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <PieChart title="Persons Distribution" data={data.personData} />
            <PieChart
              title="Categories Distribution"
              data={data.categoryData}
            />
            <PieChart
              title="Subcategories Distribution"
              data={data.subCategoryData}
            />
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default ChartsComponent;
