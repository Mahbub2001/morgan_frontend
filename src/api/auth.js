import Cookies from "js-cookie";

export const setAuthToken = (data) => {
  const currentUser = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    display_url: data.display_url,
  };

  console.log("User to be saved:", currentUser);

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${currentUser.email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Server Response:", response);

      if (response.token) {
        // Save token in LocalStorage
        localStorage.setItem("ny-token", response.token);

        Cookies.set("ny-token", response.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        console.log("Token saved in both localStorage and cookies");
      } else {
        console.error("Token not received from server");
      }
    })
    .catch((err) => {
      console.error("Error saving user or token:", err);
    });
};
