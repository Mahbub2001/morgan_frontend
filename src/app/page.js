import Accessories from "@/components/Accessories/Accessories";
import BannerFirstPage from "@/components/BannerFirstPage/BannerFirstPage";
import Compromising from "@/components/Compromising/Compromising";
import CrossbodyBags from "@/components/CrossBodyBags/CrossBodyBags";
import Forside from "@/components/Forside/Forside";
import LandingInsta from "@/components/Instagram/LandingInsta";
import SecondBanner from "@/components/SecondBanner/SecondBanner";
import SelectedFavor from "@/components/SelectedFavor/SelectedFavor";
import SelectedSuede from "@/components/SelectedSuede/SelectedSuede";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto mt-40 z-0 mb-20">
      <BannerFirstPage />
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
      <SelectedFavor />
      <Compromising />
      <SecondBanner />
      <SelectedSuede/>
      <CrossbodyBags />
      <Forside/>
      <Accessories />
      <LandingInsta />
    </div>
  );
}
