import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Text,
} from "@mantine/core";
import {
  IconBriefcase,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

export function UserProfile () {
  const user = {
    name: "Jane Doe",
    username: "jane_doe_25",
    bio: "Full-stack developer. Passionate about clean code and beautiful UI.",
    location: "San Francisco, CA",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Software Engineer",
    skills: ["React", "Node.js", "Tailwind CSS", "MongoDB"],
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&q=80",
  };

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <Card
        shadow="md"
        padding="lg"
        radius="md"
        withBorder
        className="bg-white"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar src={user.avatar} alt={user.name} size={120} radius="xl" />

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <Text size="xl" fw={600}>
                  {user.name}
                </Text>
                <Text size="sm" c="dimmed">
                  @{user.username}
                </Text>
              </div>
              <Button className="mt-4 sm:mt-0" variant="light" color="blue">
                Edit Profile
              </Button>
            </div>

            <Text className="mt-4">{user.bio}</Text>

            <Divider className="my-4" />

            <Group spacing="xs" className="flex-wrap">
              <Badge leftSection={<IconMapPin size={14} />} variant="light">
                {user.location}
              </Badge>
              <Badge leftSection={<IconMail size={14} />} variant="light">
                {user.email}
              </Badge>
              <Badge leftSection={<IconPhone size={14} />} variant="light">
                {user.phone}
              </Badge>
              <Badge leftSection={<IconBriefcase size={14} />} variant="light">
                {user.jobTitle}
              </Badge>
            </Group>

            <div className="mt-6">
              <Text fw={500} mb={4}>
                Skills
              </Text>
              <Group spacing="xs" className="flex-wrap">
                {user.skills.map((skill) => (
                  <Badge key={skill} color="teal" variant="outline">
                    {skill}
                  </Badge>
                ))}
              </Group>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
