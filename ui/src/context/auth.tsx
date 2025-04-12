import { AuthProps, Credentials, User } from "src/interfaces";
import { createContext, useState } from "react";

import AuthService from "src/services/AuthService";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";

const Auth = createContext<AuthProps>({
  user: {},
  setUser: (): string => "",
  isLoggedIn: false,
  setIsLoggedIn: (): boolean => true,
  loginHandler: () => null,
  logoutHandler: () => null,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  async function loginHandler(values: Credentials) {
    const res = await AuthService.login(values);

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);
      if ("isAdmin" in res.data.user) {
        setUser(res.data.user);
      } else {
        setUser({
          ...res.data.user,
          isAdmin: false,
        });
      }
      setIsLoggedIn(true);
      localStorage.setItem("lastlogin", JSON.stringify(Date.now()));
      notifications.show({
        title: "Logged In Successfully",
        message: `Hello, @${res.data.user.username}!`,
      });
      return true;
    } else if (res.status === 401) {
      notifications.show({
        title: "Login Failure",
        message: `Bad Credentials`,
      });
      return false;
    } else if (res.status === 404) {
      notifications.show({
        title: "Bad Credentials",
        message: `User not exists`,
      });
      return false;
    }
    navigate("/dashboard");
  }

  function logoutHandler() {
    AuthService.logout();
    localStorage.clear();
    setIsLoggedIn(false);
    notifications.show({
      title: "Logged Out Successfully",
      message: `Bye! Good Day, @${user.username}`,
    });
    setUser({});
    navigate("/", { replace: true });
  }

  return (
    <Auth.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </Auth.Provider>
  );
}
export { Auth };
