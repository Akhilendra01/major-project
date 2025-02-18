import { UserData } from "src/interfaces";

export async function fetchData(
  username: string | undefined
): Promise<UserData> {
  return await fetch(`${import.meta.env.VITE_BASE_URL}/@/${username}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data: UserData) => {
      if (data.status === 200) {
        return data;
      } else {
        return { status: 400 };
      }
    })
    .catch((err) => {
      console.log(err);
      return { status: 404 };
    });
}
