import { AiOutlineDashboard, AiOutlineLogout } from "react-icons/ai";
import { Button, Menu } from "@mantine/core";

import { AiOutlineProfile } from "react-icons/ai";
import { Auth } from "src/context";
import { useContext } from "react";
import { useNavigate } from "react-router";

export default function HeaderDropdown() {
  const { user, logoutHandler } = useContext(Auth);
  const navigate = useNavigate();
  return (
    <Menu trigger="click" openDelay={100} closeDelay={400} width={150}>
      <Menu.Target>
        <Button
          sx={{
            borderRadius: "100%",
            width: "35px",
            padding: "0",
            margin: "10px",
          }}
        >
          {user.username[0].toUpperCase()}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>@{user.username}</Menu.Label>
        <Menu.Item
          onClick={() => {
            navigate(`/dashboard`);
          }}
        >
          <AiOutlineDashboard />
          Dashboard
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            navigate(`/@/${user.username}`);
          }}
        >
          <AiOutlineProfile />
          Profile
        </Menu.Item>
        <Menu.Item onClick={logoutHandler}>
          <AiOutlineLogout />
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
