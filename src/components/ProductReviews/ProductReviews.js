"use client";
import React, { useContext, useEffect, useState } from "react";
import SingleProductReview from "../SingleProductReview/SingleProductReview";
import ProductReviewStar from "../ProductReviewStar/ProductReviewStar";
import WriteReview from "../WriteReview/WriteReview";
import AvgRating from "../AvgRating/AvgRating";

function ProductReviews({ pageDataI, eligibleDat }) {
  // console.log("ProductReviews pageDataI", pageDataI);
  // console.log("ProductReviews eligibleData", eligibleDat);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (pageDataI && eligibleDat) {
      const productId = pageDataI?.allData?._id;
      const productColor = pageDataI?.utility?.color;
      if (productId && productColor) {
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/${productId}?color=${productColor}`
        )
          .then((response) => response.json())
          .then((data) => {
            setReviews(data);
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
          });
      }
    }
  }, [pageDataI, eligibleDat]);

  console.log("ProductReviews reviews", reviews);

  return (
    <section>
      <div className="bg-white antialiased dark:bg-gray-900 ">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="md:flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Reviews
            </h2>
            <div className="flex items-center gap-2">
              <AvgRating averageRating={reviews?.averageRating} />
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({reviews?.averageRating})
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
              >
                {reviews?.totalRatings} Reviews
              </a>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                {reviews?.averageRating} out of 5
              </p>
              {eligibleDat?.eligible && <WriteReview pageDataI={pageDataI} />}
            </div>

            <ProductReviewStar reviews={reviews} />
          </div>

          <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
            <SingleProductReview />
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              View more reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;
