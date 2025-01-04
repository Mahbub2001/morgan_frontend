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
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [reviewStats, setReviewStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const limit = 5; 
  const loadMoreLimit = 3; 

  const fetchReviews = async (currentOffset, currentLimit) => {
    try {
      setLoading(true); 
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/${pageDataI?.allData?._id}?color=${pageDataI?.utility?.color}&limit=${currentLimit}&offset=${currentOffset}`
      );
      const data = await response.json();

      if (currentOffset === 0) {
        setReviewStats({
          averageRating: data.averageRating,
          totalRatings: data.totalRatings,
          oneStar: data.oneStar,
          twoStar: data.twoStar,
          threeStar: data.threeStar,
          fourStar: data.fourStar,
          fiveStar: data.fiveStar,
        });
      }

      if (data.reviews.length < currentLimit) {
        setHasMore(false); 
      }

      setReviews((prevReviews) => [...prevReviews, ...data.reviews]);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    const productId = pageDataI?.allData?._id;
    const productColor = pageDataI?.utility?.color;
    if (productId && productColor) {
      fetchReviews(0, limit); 
    }
  }, [pageDataI?.allData?._id, pageDataI?.utility?.color]);

  const loadMoreReviews = () => {
    const newOffset = offset + loadMoreLimit;
    fetchReviews(newOffset, loadMoreLimit);
    setOffset(newOffset);
  };

  // console.log(reviewStats);
    // Conditional rendering to handle loading and data availability
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p>Loading reviews...</p>
        </div>
      );
    }
  
    // if (!reviewStats) {
    //   return (
    //     <div className="flex justify-center items-center h-screen">
    //       <p>No reviews found.</p>
    //     </div>
    //   );
    // }
  

  return (
    <section>
      <div className="bg-white antialiased dark:bg-gray-900 ">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="md:flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Reviews
            </h2>
            <div className="flex items-center gap-2">
              <AvgRating averageRating={reviewStats?.averageRating} />
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({reviewStats?.averageRating})
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
              >
                {reviewStats?.totalRatings} Reviews
              </a>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                {reviewStats?.averageRating} out of 5
              </p>
              {eligibleDat?.eligible && <WriteReview pageDataI={pageDataI} />}
            </div>
            <ProductReviewStar reviewStats={reviewStats} />
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
