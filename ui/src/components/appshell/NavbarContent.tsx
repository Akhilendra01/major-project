import { AiOutlineOrderedList, AiOutlinePlus, AiOutlineSearch, AiOutlineWechat } from "react-icons/ai";
import { Button, Navbar } from "@mantine/core";

import Navlink from "src/components/appshell/Navlink";
import { State } from "src/context";
import { useContext } from "react";
import { useNavigate } from "react-router";

export default function NavbarContent() {
  const navigate=useNavigate();
  const {opened, setOpened}=useContext(State);
  return (
    opened &&
    <Navbar >
      <Navlink>
        <Button
          size="md"
          sx={{ width: "140px" }}
          onClick={() => {
            navigate("/feed");
            setOpened(false);
          }}
        >
          <AiOutlineOrderedList />
          View Feed
        </Button>
      </Navlink>
      <Navlink>
        <Button size="md" sx={{ width: "140px" }}>
          <AiOutlinePlus />
          Create Post
        </Button>
      </Navlink>
      <Navlink>
        <Button
          size="md"
          sx={{ width: "140px" }}
          onClick={() => {
            navigate("/chat");
            setOpened(false);
          }}
        >
          <AiOutlineWechat />
          Chat
        </Button>
      </Navlink>
      <Navlink>
        <Button
          size="md"
          sx={{ width: "140px" }}
          onClick={() => {
            navigate("/search");
            setOpened(false);
          }}
        >
          <AiOutlineSearch />
          Search
        </Button>
      </Navlink>
    </Navbar>
  );
}
