import { useContext } from "react";
import { Auth } from "src/context";

export default function RequiredLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useContext(Auth);
  if (!isLoggedIn) {
    return <div className="flex flex-row justify-center items-center text-lg">Please Login</div>;
  }
  return (<>{children}</>)
}
