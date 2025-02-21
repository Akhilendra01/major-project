import { User } from "src/interfaces";
import { notifications } from "@mantine/notifications";

const reqheader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export async function getUserData(username: string | null): Promise<User> {
  if (!username) return {};
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user-data/${username}`,
    {
      method: "GET",
      headers: reqheader
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
}

export async function addFriend(username: string, friend: string): Promise<boolean>{
  return await fetch(`${import.meta.env.VITE_BASE_URL}/add-friend`, {
    method: 'POST',
    headers:{
      ...reqheader,
      "Content-Type":'application/json'
    },
    body:JSON.stringify({
      username:username,
      friend:friend
    })
  }).then(data=> {
    console.log(data);
    notifications.show({
      title:'Sucess',
      message: `@${friend} is added to your friends list.`
    })
    return true;
  }).catch(err=>{
    console.log(err);
    return false;
  })
}

export async function createUser(values: Record<string, any>){
  await fetch(`${import.meta.env.VITE_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 200) {
        notifications.show({
          title: "Success",
          message: "User added successfully! Please login to continue.",
        });
        close();
      } else if (data.status === 500) {
        notifications.show({
          title: "Try again!",
          message: "Username or email already exists.",
        });
      }
    });
}