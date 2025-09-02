"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Cookies from "js-cookie";

function AdminResponsibility() {
  const [content, setContent] = useState({
    title: "Our Responsibility",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    quote1: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(content);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("idle");

  useEffect(() => {
    fetchAboutUsContent();
  }, []);

  const fetchAboutUsContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/responsibility`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.title) {
          setContent(data);
          setTempContent(data);
        }
      } else {
        console.error("Failed to fetch responsibility content");
      }
    } catch (error) {
      console.error("Error fetching responsibility content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setTempContent(content);
    setIsEditing(true);
    setSaveStatus("idle");
  };

  const handleSave = async () => {
    const token = Cookies.get("ny-token");
    try {
      setSaveStatus("saving");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/responsibility`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(tempContent),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setContent(result.data);
        setIsEditing(false);
        setSaveStatus("success");

        // Reset success status after 2 seconds
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        console.error("Failed to save responsibility content");
      }
    } catch (error) {
      setSaveStatus("error");
      console.error("Error saving responsibility content:", error);
    }
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
    setSaveStatus("idle");
  };

  const handleInputChange = (field, value) => {
    setTempContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Admin - Our Responsibility Content
        </h1>

        {saveStatus === "success" && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Content saved successfully!
          </div>
        )}

        {saveStatus === "error" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error saving content. Please try again.
          </div>
        )}

        {isEditing ? (
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={tempContent.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Paragraph Inputs */}
            {["paragraph1", "paragraph2", "paragraph3"].map((field, index) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paragraph {index + 1}
                </label>
                <textarea
                  value={tempContent[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}

            {/* Quote Inputs */}
            {["quote1"].map((field, index) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quote {index + 1}
                </label>
                <input
                  type="text"
                  value={tempContent[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end pt-4">
              <button
                onClick={handleCancel}
                disabled={saveStatus === "saving"}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {saveStatus === "saving" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Preview Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  {content.title}
                </h1>
                <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
                  {content.paragraph1}
                </p>
              </motion.div>

              <motion.div
                className="mt-6 sm:mt-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
                  {content.paragraph2}
                </p>
              </motion.div>

              <motion.div
                className="mt-6 sm:mt-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
                  {content.paragraph3}
                </p>
              </motion.div>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <p className="italic text-gray-500 text-sm sm:text-base mb-4">
                  {content.quote1}
                </p>
              </motion.div>
            </div>

            {/* Edit Button */}
            <div className="text-center">
              <button
                onClick={handleEdit}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Edit Content
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminResponsibility;
