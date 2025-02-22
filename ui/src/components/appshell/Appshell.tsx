import { AppShell } from "@mantine/core";
import { Auth } from "src/context";
import HeaderContent from "src/components/appshell/HeaderContent";
import NavbarContent from "src/components/appshell/NavbarContent";
import { useContext } from "react";

export default function Appshell({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useContext(Auth);
  return (
    <AppShell
      navbar={isLoggedIn ? <NavbarContent /> : <></>}
      header={<HeaderContent />}
    >
      {children}
    </AppShell>
  );
}
