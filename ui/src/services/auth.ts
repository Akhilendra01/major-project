import { Dispatch, SetStateAction } from "react";
import { SetUser, User } from "src/interfaces";

import { notifications } from "@mantine/notifications";

export async function login(
  fData: FormData,
  setUser: SetUser,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
): Promise<boolean> {
  console.log('login called');
  setUser({name:"abcd", username:"abcd", email:"abcd"});
  setIsLoggedIn(true);
  return true;
  // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
  //   method: "POST",
  //   body: fData,
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data.status === 200) {
  //       console.log(data);
  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem("username", data.username);
  //       setUser(data);
  //       setIsLoggedIn(true);
  //       localStorage.setItem("lastlogin", JSON.stringify(Date.now()));
  //       notifications.show({
  //         title: "Logged In Successfully",
  //         message: `Hello, @${data.username}!`,
  //       });
  //       return true;
  //     } else if (data.status === 400) {
  //       notifications.show({
  //         title: "Login Failure",
  //         message: `Bad Credentials`,
  //       });
  //       return false;
  //     } else if (data.status === 500) {
  //       notifications.show({
  //         title: "Bad Credentials",
  //         message: `User not exists`,
  //       });
  //       return false;
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // return res != null && res != false;
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
