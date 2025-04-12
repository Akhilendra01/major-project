import {
  AiOutlineApi,
  AiOutlineOrderedList,
  AiOutlineSearch,
  AiOutlineWechat,
} from "react-icons/ai";
import { Auth, State } from "src/context";
import { Button, Navbar } from "@mantine/core";

import Navlink from "src/components/appshell/Navlink";
import { useContext } from "react";
import { useNavigate } from "react-router";

const links = [
  {
    label: "View Feed",
    icon: <AiOutlineOrderedList />,
    to: "/feed",
    admin: false,
  },
  {
    label: "Admin-Actions",
    icon: <AiOutlineApi />,
    to: "/admin-actions",
    admin: true,
  },
  { label: "Chat", icon: <AiOutlineWechat />, to: "/chat", admin: false },
  { label: "Search", icon: <AiOutlineSearch />, to: "/search", admin: false },
];

export default function NavbarContent() {
  const navigate = useNavigate();
  const { opened, setOpened } = useContext(State);
  const { user } = useContext(Auth);

  return (
    opened && (
      <Navbar>
        {links.map(
          (link) =>
            user.isAdmin === link.admin && (
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
            )
        )}
      </Navbar>
    )
  );
}
