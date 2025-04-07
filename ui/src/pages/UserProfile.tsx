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
  IconBulb,
  IconMail,
  IconMapPin,
  IconSchool,
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";

import { Auth } from "src/context";
import ContentService from "src/services/ContentService";
import {EditProfile} from "src/components/forms/EditProfile";
import { Profile } from "src/services/ContentService";
import { useParams } from "react-router";

export function UserProfile() {
  const username = useParams<string>().username;
  const user = useContext(Auth).user;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    ContentService.getProfileByUsername(username)
      .then((response) => {
        setProfile(response);
        console.log("Profile fetched:", response);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [username]);

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
          <Avatar
            src={profile?.avatar}
            alt={profile?.imageUrl}
            size={120}
            radius="xl"
          />

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <Text size="xl" fw={600}>
                  {`${profile?.firstName} ${profile?.lastName}`}
                </Text>
                <Text size="sm" c="dimmed">
                  @{profile?.username}
                </Text>
              </div>
              {user?.username === username && (
                <Button
                  className="mt-4 sm:mt-0"
                  variant="light"
                  color="blue"
                  onClick={() => {
                    setShowForm(!showForm);
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </div>

            <Text className="mt-4">{profile?.bio}</Text>

            <Divider className="my-4" />

            <Group spacing="xs" className="flex-wrap">
              <Badge leftSection={<IconMapPin size={14} />} variant="light">
                {profile?.location}
              </Badge>
              <Badge leftSection={<IconMail size={14} />} variant="light">
                {profile?.email}
              </Badge>
              <Badge
                leftSection={<IconBulb size={14} />}
                variant="light"
              >
                {profile?.branch}
              </Badge>
              <Badge leftSection={<IconBriefcase size={14} />} variant="light">
                {profile?.designation}
              </Badge>
              <Badge leftSection={<IconSchool size={14} />} variant="light">
                {profile?.batch}
              </Badge>
            </Group>

            <div className="mt-6">
              <Text fw={500} mb={4}>
                Skills
              </Text>
              <Group spacing="xs" className="flex-wrap">
                {profile?.skills.map((skill) => (
                  <Badge key={skill} color="teal" variant="outline">
                    {skill}
                  </Badge>
                ))}
              </Group>
            </div>
          </div>
        </div>
      </Card>
      {showForm && <EditProfile profile={profile} />}
    </div>
  );
}
