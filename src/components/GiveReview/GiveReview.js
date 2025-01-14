import { AuthContext } from "@/hooks/AuthProvider";
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function GiveReview({ order }) {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log(order);

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setRating(5);
    setComment("");
  };

  const handleSubmit = () => {
    if (!selectedProduct) {
      toast.error("Please select a product to review.");
      return;
    }

    const token = Cookies.get("ny-token");
    const reviewData = {
      rating,
      comment,
      productId: selectedProduct.id,
      color: selectedProduct.color,
      user_name: user.displayName,
      user_email: user.email,
      helpful: {
        yes: 0,
        no: 0,
      },
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/add_reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(
          "Review submitted successfully! Thank you for your feedback."
        );
        handleCloseModal();
      })
      .catch((error) => {
        toast.error("Error submitting review. Please try again.", error);
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="rounded-lg bg-primary-700 px-2 text-xs py-2 text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Give Review
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
              <h2 className="text-lg font-medium mb-4">
                Select a Product to Review
              </h2>

              <div className="mb-4">
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className={`flex items-center p-2 border rounded-lg mb-2 cursor-pointer ${
                      selectedProduct && selectedProduct.id === product.id
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 mr-4"
                    />
                    <div>
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <p className="text-xs text-gray-600">
                        Color: {product.color}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedProduct && (
                <>
                  <h3 className="text-md font-medium mb-2">
                    Write a Review for {selectedProduct.name}
                  </h3>
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
                </>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 mr-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
                  disabled={!selectedProduct}
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

export default GiveReview;
