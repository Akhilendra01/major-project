import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{}}>
      <Notifications position="bottom-right" limit={5} />
      {children}
    </MantineProvider>
  );
}
