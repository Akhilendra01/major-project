import { Auth, State } from "src/context";
import { Burger, Header, Title } from "@mantine/core";

import HeaderDropdown from "src/components/appshell/HeaderDropdown";
import { useContext } from "react";

export default function HeaderContent() {
  const { isLoggedIn } = useContext(Auth);
  const { opened, setOpened } = useContext(State);
  return (
    <Header
      height={50}
      className="flex flex-row items-center justify-center m-0 p-0"
    >
      <Burger
        opened={opened}
        onClick={() => {
          setOpened(!opened);
        }}
      />
      <Title order={3} className="py-2 m-auto" align="center">
        Placement Data Portal
      </Title>
      {isLoggedIn && <HeaderDropdown />}
    </Header>
  );
}
