import {
  Badge,
  Button,
  Card,
  CloseButton,
  Group,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

import ContentService from "src/services/ContentService";
import { CreatePostRequest } from "src/interfaces";
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

function CreatePost() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [loading, setLoading] = useState(false);
  const form = useForm<CreatePostRequest>({
    initialValues: {
      companyName: "",
      jobDescription: "",
      applyLink: "",
      images: [],
    },
  });

  const handleSubmit = async (values: CreatePostRequest) => {
    setLoading(true);
    console.log(values);
    await ContentService.createPost(values)
      .then((response) => {
        console.log(response);
        form.reset();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating post", error);
      });
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={`bg-white ${isMobile ? "w-full" : "w-6/12"} mx-auto py-4`}
    >
      <Title order={4} className="mb-4 text-center">
        Post a job
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
        <TextInput
          label="Company name"
          placeholder="Enter company name"
          {...form.getInputProps("companyName")}
          required
        />

        <TextInput
          label="Apply Link"
          placeholder="Enter the...."
          {...form.getInputProps("applyLink")}
          required
        />
        <Textarea
          label="Job Description"
          minRows={5}
          placeholder="Give brief description for the job...."
          {...form.getInputProps("jobDescription")}
          required
        />

        <Dropzone
          multiple={true}
          onDrop={(files) => {
            form.setFieldValue("images", files);
          }}
          onReject={() => console.log("rejected")}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(110), pointerEvents: "none" }}
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

        <Group mt="md" spacing="xs">
          {form.values.images?.map((file) => (
            <Badge
              key={file.name}
              rightSection={
                <CloseButton
                  onClick={() => {
                    form.setFieldValue(
                      "images",
                      form.values.images.filter((f) => f.name !== file.name)
                    );
                  }}
                  size="xs"
                  style={{ marginLeft: 5 }}
                />
              }
            >
              {file.name}
            </Badge>
          ))}
        </Group>

        <Button type="submit" loading={loading} fullWidth>
          Create Post
        </Button>
      </form>
    </Card>
  );
}

export default CreatePost;
