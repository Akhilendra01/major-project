import { AiOutlineOrderedList, AiOutlinePlus, AiOutlineSearch, AiOutlineWechat } from "react-icons/ai";
import { Button, Navbar } from "@mantine/core";

import Navlink from "src/components/appshell/Navlink";
import { State } from "src/context";
import { useContext } from "react";
import { useNavigate } from "react-router";

const links = [
  { label: "View Feed", icon: <AiOutlineOrderedList/>, to: "/feed" },
  { label: "Create Post", icon: <AiOutlinePlus/>, to: "/create-post" },
  { label: "Chat", icon: <AiOutlineWechat/>, to: "/chat" },
  { label: "Search", icon: <AiOutlineSearch/>, to: "/search" },
 ]

export default function NavbarContent() {
  const navigate=useNavigate();
  const {opened, setOpened}=useContext(State);
  return (
    opened &&
    <Navbar >

      {
        links.map((link) => (
          <Navlink key={link.label}>
            <Button
              size="md"
              sx={{ width: "140px" }}
              onClick={() => {
                navigate(link.to);
                setOpened(false);
              }}
            >
              {link.icon}
              {link.label}
            </Button>
          </Navlink>
        ))
      }
    </Navbar>
  );
}
