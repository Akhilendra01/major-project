import { Credentials, SetUser, User } from "src/interfaces";
import { Dispatch, SetStateAction } from "react";

import { notifications } from "@mantine/notifications";

export async function login(
  fData: Credentials,
  setUser: SetUser,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
): Promise<boolean> {
  console.log(JSON.stringify(fData));
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("lastlogin", JSON.stringify(Date.now()));
        notifications.show({
          title: "Logged In Successfully",
          message: `Hello, @${data.username}!`,
        });
        return true;
      } else if (data.status === 401) {
        notifications.show({
          title: "Login Failure",
          message: `Bad Credentials`,
        });
        return false;
      } else if (data.status === 404) {
        notifications.show({
          title: "Bad Credentials",
          message: `User not exists`,
        });
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return res != null && res != false;
}

export function logout(
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
  user: User,
  setUser: SetUser
) {
  localStorage.clear();
  setIsLoggedIn(false);
  notifications.show({
    title: "Logged Out Successfully",
    message: `Bye! Good Day, @${user.username}`,
  });
  setUser({});
}
