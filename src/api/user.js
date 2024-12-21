import Cookies from "js-cookie";

export const getUserRole = async (email) => {
  const token = Cookies.get("ny-token"); 

  console.log("token", token);
  

  if (!token) {
    console.error("Authorization token is missing");
    return null;
  }

  try {
    console.log("fetching user role");
  
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    console.log("Response status:", response.status);
  
    const data = await response.json();
    console.log("Response body:", data);
  
    if (!response.ok) {
      console.error(`Failed to fetch user role: ${response.status}`, data);
      return null;
    }
  
    return data?.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
  
};
