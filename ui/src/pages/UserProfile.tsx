import { Box, Image, Text, Button } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineUserAdd } from "react-icons/ai";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ListGenerator from "src/components/ListGenerator";
import { Auth } from "src/context";
import { UserData } from "src/interfaces";
import { addFriend, fetchData } from "src/services";

export function UserProfile() {
  const { user } = useContext(Auth);
  const { username } = useParams<string>();
  const [data, setData] = useState<UserData>({});
  const [update, setUpdate] = useState<number>(0);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetchData(username).then((data) => setData(data));
      console.log(data);
    }
  }, [username, update]);

  async function addFriendHandler() {
    setData({
      ...data,
      friends: [...data.friends, user.username],
    });

    await addFriend(user.username, data.username);
  }

  if (data.status !== 200) {
    return (
      <Text className="flex flex-col items-center text-lg py-6">
        User not found
      </Text>
    );
  }

  return (
    <>
      <Box className="w-full flex flex-col items-center py-6">
        <Text className="text-lg py-2">
          @{data.username}
          {user.username !== username &&
            data.friends &&
            data.username &&
            data.friends.includes(user.username) === false && (
              <Button className=" px-2 mx-2 text-lg" onClick={addFriendHandler}>
                <AiOutlineUserAdd />
              </Button>
            )}
        </Text>
        <Image
          src={data.photoUrl ? `${data.photoUrl}` : "/images/dummy.jpg"}
          width={200}
        />
        <Text className="text-md py-1">{data.name}</Text>
        <Text className="text-md py-1" sx={{ "&:hover": { color: "blue" } }}>
          <AiOutlineMail />{" "}
          <Link
            to={`mailto:${data.email}`}
            type="email"
            target="_blank"
            className="no-underline text-slate-700"
          >
            {data.email}
          </Link>
        </Text>
      </Box>

      <Box className="py-3 m-auto w-4/5 flex flex-col items-center">
        <Text>Friends</Text>
        <ListGenerator data={data} />
      </Box>
    </>
  );
}
