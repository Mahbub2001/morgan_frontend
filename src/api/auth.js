import Cookies from "js-cookie";

export const setAuthToken = (data) => {
  const currentUser = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    display_url: data.display_url,
    verified: data.verified,
  };

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${currentUser.email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.token) {
        Cookies.set("ny-token", response.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
      } else {
        console.error("Token not received from server");
      }
    })
    .catch((err) => {
      console.error("Error saving user or token:", err);
    });
};

export const setAuthToken1 = (data) => {
  const currentUser = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    display_url: data.display_url,
    verified: false,
  };

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${currentUser.email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((response) => {

      if (response.token) {
      } else {
        console.error("Token not received from server");
      }
    })
    .catch((err) => {
      console.error("Error saving user or token:", err);
    });
};
