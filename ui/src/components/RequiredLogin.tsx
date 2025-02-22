import { useContext, useEffect } from "react";

import { Auth } from "src/context";
import AuthService from "src/services/AuthService";

export default function RequiredLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(Auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    async function validateUser() {
      try {
        const res = await AuthService.validateToken();
        if (res.data.message!=="invalid signature") {
          setUser(res.data.user)
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsLoggedIn(false);
      }
    }

    validateUser();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-row justify-center items-center text-lg">
        Please Login
      </div>
    );
  }

  return <>{children}</>;
}
