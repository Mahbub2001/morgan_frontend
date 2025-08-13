"ues client";
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AuthContext } from "@/hooks/AuthProvider";

function WriteReview({ pageDataI }) {
  // console.log("WriteReview pageDataI", pageDataI);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleStarClick = (index) => {
    setRating(index);
  };
  const handleSubmit = () => {
    const token = Cookies.get("ny-token");
    const reviewData = {
      rating,
      comment,
      productId: pageDataI.allData._id,
      color: pageDataI.utility.color,
      user_name: user.firstName,
      user_email: user.email,
      helpful: {
        yes: 0,
        no: 0,
      },
    };

    // console.log("reviewData", reviewData);

    const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/add_reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });
    response
      .then((res) => res.json())
      .then((data) => {
        // console.log("Review submitted successfully!", data);
        setIsModalOpen(false);
        toast.success(
          "Review submitted successfully! Thank you for your feedback."
        );
      })
      .catch((error) => {
        toast.error("Error submitting review. Please try again.", error);
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="mb-2 me-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Write a review
      </button>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h2 className="text-lg font-medium mb-4">Write a Review</h2>

              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleStarClick(index)}
                    className={`text-2xl ${
                      index <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                className="w-full border rounded-lg p-2 mb-4"
                rows="4"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 mr-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default WriteReview;
