import RelatedProductSlider from "@/containers/common/RelatedProductSlider/RelatedProductSlider";
import React, { useState, useEffect } from "react";

function RelatedProduct({ relatedProducts }) {
  const [pictures, setPictures] = useState([]);
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    const extractedPictures = relatedProducts.map((product) => {
      const id = product?._id;
      const productName = product?.productName;
      const askingPrice = product?.askingPrice;
      const discount = product?.discount;
      let validUtility = product?.utilities.find(
        (utility) => utility?.numberOfProducts > 0
      );
      const isSoldOut = !validUtility;

      if (isSoldOut) {
        validUtility = product?.utilities[0];
      }

      const color = validUtility?.color;

      const productDetails = {
        productName,
        _id: id,
        askingPrice,
        color,
        discount,
      };

      return {
        picture: [validUtility?.pictures?.[0], validUtility?.pictures?.[1]],
        productDetails,
      };
    });

    const picturesArray = extractedPictures.map((item) => item.picture);
    const productInfoArray = extractedPictures.map(
      (item) => item.productDetails
    );

    setPictures(picturesArray);
    setProductInfo(productInfoArray);
  }, [relatedProducts]);

  console.log(productInfo);

  return (
    <div>
      <div>
        <RelatedProductSlider productInfo={productInfo} pictures={pictures} />
      </div>
    </div>
  );
}

export default RelatedProduct;
