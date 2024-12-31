'use client'
import ProductDetailspage from "@/components/ProductDetailsPage/ProductDetailspage";
import { useSearchParams } from "next/navigation";
import React from "react";

function ProductDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const color = searchParams.get("color");

  return (
    <>
      <ProductDetailspage id={id} color={color} />
    </>
  );
}
export default ProductDetails;
