"use client";

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import axios from "axios";

const PieChart = dynamic(() => import('../PieChart/PieChart'), {
  ssr: false,
  loading: () => <div>Loading chart...</div>
});

function ChartsComponent() {
  const [data, setData] = useState({
    personData: [],
    categoryData: [],
    subCategoryData: [],
  });

  const [data2, setData2] = useState({
    personData: [],
    categoryData: [],
    subCategoryData: [],
  });

  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pie-chart-data`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pie-chart-sales`)
    ])
    .then(([response1, response2]) => {
      setData(response1.data);
      setData2(response2.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Failed to fetch chart data", error);
      setLoading(false);
    });
  }, [mounted]);

  if (!mounted) {
    return <div className="mt-10 text-center">Initializing...</div>;
  }

  if (loading) {
    return <div className="mt-10 text-center">Loading charts data...</div>;
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-1 justify-center items-center">
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
            <h3 className="my-8 text-center text-2xl">
              Products Sales Distribution
            </h3>
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