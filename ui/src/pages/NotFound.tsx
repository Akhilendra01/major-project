import {
  Button,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Center style={{ height: "100vh" }}>
      <Container size="sm">
        <Stack align="center" spacing="md">
          <Title order={2} align="center">
            Oops! Page Not Found
          </Title>
          <Text color="dimmed" align="center">
            The page you're looking for doesn't exist or has been moved.
          </Text>
          <Group>
            <Button
              variant="light"
              leftIcon={<IconArrowLeft />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </Group>
        </Stack>
      </Container>
    </Center>
  );
}
