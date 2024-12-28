// export const fetchProducts = async () => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };

export const fetchProducts = async (filterParams) => {
  try {
    const queryParams = new URLSearchParams();

    if (filterParams.availability.length) {
      queryParams.append("availability", filterParams.availability.join(","));
    }
    if (filterParams.color.length) {
      queryParams.append("color", filterParams.color.join(","));
    }
    if (filterParams.price) {
      queryParams.append(
        "price",
        `${filterParams.price[0]}-${filterParams.price[1]}`
      );
    }
    if (filterParams.size.length) {
      queryParams.append("size", filterParams.size.join(","));
    }
    if (Object.keys(filterParams.typeOfProducts).length) {
      queryParams.append(
        "typeOfProducts",
        JSON.stringify(filterParams.typeOfProducts)
      );
    }

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
