export const getUserRole = async (email) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const token = getCookie("ny-token");

  if (!token) {
    throw new Error("Authorization token not found");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${email}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );

  const user = await response.json();
  return user?.role;
};
