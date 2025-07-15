"use client";
import Accessories from "@/components/Accessories/Accessories";
import BannerFirstPage from "@/components/BannerFirstPage/BannerFirstPage";
import Compromising from "@/components/Compromising/Compromising";
import CrossbodyBags from "@/components/CrossBodyBags/CrossBodyBags";
import Forside from "@/components/Forside/Forside";
import LandingInsta from "@/components/Instagram/LandingInsta";
import SecondBanner from "@/components/SecondBanner/SecondBanner";
import SelectedFavor from "@/components/SelectedFavor/SelectedFavor";
import SelectedSuede from "@/components/SelectedSuede/SelectedSuede";
import { useContext, useEffect, useState } from "react";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [best, setBest] = useState([]);
  const [promote1, setPromote1] = useState([]);
  const [promote2, setPromote2] = useState([]);
  const [settings, setSettings] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const [countryRes, bestRes, settingsRes] = await Promise.all([
          fetch("http://ip-api.com/json/"),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/top-sales`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`),
        ]);
        const countryData = await countryRes.json();
        const bestData = await bestRes.json();
        const settingsData = await settingsRes.json();

        setCountry(countryData.country);
        setBest(bestData);
        setSettings(settingsData);

        const promote1Ids = settingsData.promote1.checkedId.join(",");
        const promote2Ids = settingsData.promote2.checkedId.join(",");

        const promote1Res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/promoted-products?ids=${promote1Ids}`
        );
        const promote2Res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/promoted-products?ids=${promote2Ids}`
        );

        const promote1Data = await promote1Res.json();
        const promote2Data = await promote2Res.json();

        setPromote1(promote1Data);
        setPromote2(promote2Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // console.log("Country:", country);

  return (
    <div className="min-h-screen container mx-auto -mt-20 md:mt-40 z-0 mb-20">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full animate-spin border-4 border-solid border-cyan-500 border-t-transparent shadow-lg"></div>
            <p className="mt-4 text-lg font-semibold text-cyan-700">
              Loading, please wait...
            </p>
          </div>
        </div>
      ) : (
        <>
          <BannerFirstPage settings={settings}/>
          <div className="text-center mt-20">
            <p className="font-semibold font-sans text-2xl">
              Decadent Copenhagen, a name that stands for luxury, elegance and
              versatility.
            </p>
            <p className="mt-5 font-sans">
              Subtly sophisticated, not characterized by large logos, but by a
              unified aesthetic consisting of quality leather <br /> and simple
              design, intertwined with incredible functionality.
            </p>
          </div>
          <SelectedFavor best={best} settings={settings} />
          <Compromising />
          <SecondBanner />
          <SelectedSuede promote1={promote1} settings={settings} />
          <CrossbodyBags />
          <Forside />
          <Accessories promote2={promote2} settings={settings} />
          <LandingInsta />
        </>
      )}
    </div>
  );
}
