import React from "react";
import SingleReviewsRating from "../SingleReviewsRating/SingleReviewsRating";

function SingleProductReview({ reviews }) {
  return (
    <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
      {reviews?.map((review, index) => (
        <div key={index} className="gap-3 pb-6 sm:flex sm:items-start">
          <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
            <SingleReviewsRating rating={review?.rating} />
            <div className="space-y-0.5">
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {review?.user_name}
              </p>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {new Date(review.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {review?.comment}
            </p>

            <div className="flex items-center gap-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Was it helpful to you?
              </p>
              <div className="flex items-center">
                <input
                  id="reviews-radio-1"
                  type="radio"
                  value=""
                  name="reviews-radio"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
                <label
                  htmlFor="reviews-radio-1"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="reviews-radio-2"
                  type="radio"
                  value=""
                  name="reviews-radio"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
                <label
                  htmlFor="reviews-radio-2"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SingleProductReview;
