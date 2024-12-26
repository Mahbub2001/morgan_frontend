import ProductDetailspage from "@/components/ProductDetailsPage/ProductDetailspage";
import React from "react";

async function ProductDetails({ params, searchParams }) {
  const { id } = await params;

  const { color } = await searchParams;
  console.log("ProductDetails", id, color);

  return (
    <>
      <ProductDetailspage id={id} color={color} />
    </>
  );
}
export default ProductDetails;
