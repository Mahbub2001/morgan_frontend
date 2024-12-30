export const adminGetProducts = async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/products?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  };
  