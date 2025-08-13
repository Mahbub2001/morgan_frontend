import Cookies from "js-cookie";

export const getUserRole = async (email) => {
  const token = Cookies.get("ny-token");
  
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

export const getUserProfile = async (email) => {
  const token = Cookies.get("ny-token");

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
  return user;
};
