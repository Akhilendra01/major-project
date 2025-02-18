import { AiOutlineOrderedList, AiOutlinePlus, AiOutlineSearch, AiOutlineWechat } from "react-icons/ai";
import { Button, Navbar } from "@mantine/core";

import Navlink from "src/components/appshell/Navlink";
import { useNavigate } from "react-router";

export default function NavbarContent() {
  const navigate=useNavigate();
  return (
    <Navbar width={{ base: 200, sm: 200 }} height={800}>
      <Navlink>
        <Button
          size="md"
          sx={{ width: "140px" }}
          onClick={() => {
            navigate("/feed");
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
          }}
        >
          <AiOutlineSearch />
          Search
        </Button>
      </Navlink>
    </Navbar>
  );
}
