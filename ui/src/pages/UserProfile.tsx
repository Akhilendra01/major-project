import {
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Modal,
  Progress,
  Text,
  rem,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  IconBriefcase,
  IconBulb,
  IconMail,
  IconMapPin,
  IconPhoto,
  IconSchool,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";

import { Auth } from "src/context";
import ContentService from "src/services/ContentService";
import { EditProfile } from "src/components/forms/EditProfile";
import { Profile } from "src/services/ContentService";
import { useParams } from "react-router";

export default function UserProfile() {
  const username = useParams<string>().username;
  const { user } = useContext(Auth);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    ContentService.getProfileByUsername(username)
      .then((response) => {
        setProfile(response);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [username]);

  const handleAvatarClick = () => {
    if (user?.username === username) {
      setUploadModalOpen(true);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("id", profile?._id || "");
      formData.append("oldImgUrl", profile?.imgUrl || "");

      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const response = await ContentService.uploadProfileImage(
        formData
        // (progressEvent: { loaded: number; total: number; }) => {
        //   const percentCompleted = Math.round(
        //     (progressEvent.loaded * 100) / progressEvent.total
        //   );
        //   setUploadProgress(percentCompleted);
        // }
      );

      clearInterval(interval);
      setUploadProgress(100);

      setProfile((prevProfile) => {
        if (prevProfile) {
          return {
            ...prevProfile,
            imgUrl: response.imageUrl,
          };
        }
        return prevProfile;
      });

      setTimeout(() => {
        setUploadModalOpen(false);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
    }
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
          <div className="relative group">
            <Avatar
              src={profile?.imgUrl}
              alt={profile?.username}
              size={120}
              radius="xl"
              className="cursor-pointer"
            />
            {user?.username === username && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                onClick={handleAvatarClick}
              >
                <IconPhoto size={32} color="white" />
              </div>
            )}
          </div>

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
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Button
                    variant="light"
                    color="blue"
                    onClick={() => setShowForm(!showForm)}
                  >
                    Edit Profile
                  </Button>
                </div>
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
              <Badge leftSection={<IconBulb size={14} />} variant="light">
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
                {profile?.skills?.map((skill, index) => (
                  <Badge
                    key={`${skill}-${index}`}
                    color="teal"
                    variant="outline"
                  >
                    {skill}
                  </Badge>
                ))}
              </Group>
            </div>
          </div>
        </div>
      </Card>

      {showForm && <EditProfile profile={profile} />}

      <Modal
        opened={uploadModalOpen}
        onClose={() => !isUploading && setUploadModalOpen(false)}
        title="Update Profile Picture"
        centered
        overlayProps={{
          blur: 3,
        }}
      >
        {isUploading ? (
          <div>
            <Text align="center" mb="md">
              Uploading your image...
            </Text>
            <Progress value={uploadProgress} striped />
            <Center mt="md">
              <Text size="sm" color="dimmed">
                {uploadProgress}%
              </Text>
            </Center>
          </div>
        ) : (
          <Dropzone
            onDrop={(files) => handleImageUpload(files[0])}
            onReject={() => console.log("rejected")}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(220), pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload size="3.2rem" stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="3.2rem" stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag image here or click to select
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  File should not exceed 5MB
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}
      </Modal>
    </div>
  );
}
