export const fetchProducts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
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
