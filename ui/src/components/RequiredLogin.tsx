import {
  Button,
  Center,
  Container,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useContext, useEffect } from "react";

import { Auth } from "src/context";
import AuthService from "src/services/AuthService";
import { IconLogin } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function RequiredLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(Auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    async function validateUser() {
      try {
        const res = await AuthService.validateToken();
        if (res.data.message !== "invalid signature") {
          setUser(res.data.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsLoggedIn(false);
      }
    }

    validateUser();
  }, []);

  if (!isLoggedIn) {
    return (
      <Center style={{ height: "100vh" }}>
        <Container size="sm">
          <Stack align="center" spacing="xl">
            <Title order={2} align="center" style={{ color: "#333" }}>
              Access Restricted
            </Title>
            <Text color="dimmed" align="center">
              You need to be logged in to view this page.
            </Text>
            <Button
              variant="light"
              leftIcon={<IconLogin />}
              size="lg"
              onClick={() => navigate("/")}
            >
              Go to Login
            </Button>
          </Stack>
        </Container>
      </Center>
    );
  }

  return <>{children}</>;
}
