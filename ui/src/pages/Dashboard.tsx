import { Auth } from "src/context/auth";
import { useContext } from "react";

export function Dashboard() {
  const { user } = useContext(Auth);
  return (
    <div className="flex flex-col items-center justify-center w-full text-lg">
      Hello {user.username}
    </div>
  );
}
