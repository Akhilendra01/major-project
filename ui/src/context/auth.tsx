import { AuthProps, Credentials, User } from "src/interfaces";
import { createContext, useEffect, useState } from "react";
import { login, logout } from "src/services";

import { getUserData } from "src/services";
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
    const res = await login(values, setUser, setIsLoggedIn);
    if (res) navigate("/dashboard");
  }

  function logoutHandler() {
    logout(setIsLoggedIn, user, setUser);
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (localStorage.getItem("username")) {
      getUserData(localStorage.getItem("username")).then((data) => {
        if (data) {
          if (data) {
            setUser(data);
            setIsLoggedIn(true);
            localStorage.setItem("lastlogin", JSON.stringify(Date.now()));
          }
        }
      });
    }
  }, [isLoggedIn]);

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
