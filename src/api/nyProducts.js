// export const fetchProducts = async () => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };

import Cookies from "js-cookie";

export const fetchProducts = async (filterParams = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (
      Array.isArray(filterParams.availability) &&
      filterParams.availability.length
    ) {
      queryParams.append("availability", filterParams.availability.join(","));
    }
    if (Array.isArray(filterParams.color) && filterParams.color.length) {
      queryParams.append("color", filterParams.color.join(","));
    }
    if (filterParams.price && Array.isArray(filterParams.price)) {
      queryParams.append(
        "price",
        `${filterParams.price[0]}-${filterParams.price[1]}`
      );
    }
    if (Array.isArray(filterParams.size) && filterParams.size.length) {
      queryParams.append("size", filterParams.size.join(","));
    }
    if (
      filterParams.typeOfProducts &&
      Object.keys(filterParams.typeOfProducts).length
    ) {
      queryParams.append(
        "typeOfProducts",
        JSON.stringify(filterParams.typeOfProducts)
      );
    }
    if (filterParams.sortPar) {
      queryParams.append("sortPar", filterParams.sortPar);
    }

    // console.log("queryParams", queryParams.toString());

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${queryParams.toString()}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// get product by id
export const fetchProduct = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// get related products
export const fetchRelatedProducts = async (
  productName,
  category,
  subCategory,
  limit
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/related-products?productName=${productName}&category=${category}&subCategory=${subCategory}&limit=${limit}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching related products:", error);
  }
};

// get elibility of review of a product
export const fetchReviewEligibility = async (user,pageDataI) => {
  const token = Cookies.get("ny-token");
  // console.log(pageDataI);
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/eligible_reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          pageData: pageDataI,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch eligibility");
    }

    const data = await response.json();

    return data;
    // console.log(data);
  } catch (error) {
    console.error("Error checking eligibility:", error.message);
  }
};
