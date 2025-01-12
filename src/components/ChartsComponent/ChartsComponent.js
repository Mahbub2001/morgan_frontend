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

  const [data2, setData2] = useState({
    personData: [],
    categoryData: [],
    subCategoryData: [],
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/pie-chart-sales`)
      .then((response) => {
        setData2(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch chart data", error);
      });
  }, []);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
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
          <div>
            <h3 className="my-8 text-center text-2xl">Products Sales Distribution</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <PieChart title="Persons Distribution" data={data2.personData} />
              <PieChart
                title="Categories Distribution"
                data={data2.categoryData}
              />
              <PieChart
                title="Subcategories Distribution"
                data={data2.subCategoryData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartsComponent;
