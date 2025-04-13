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

import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

interface CreatePostValues {
  title: string | "";
  content: string | "";
  tags: string[];
  images: File[] | null | undefined;
}

function CreatePost() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [loading, setLoading] = useState(false);
  const form = useForm<CreatePostValues>({
    initialValues: {
      title: "",
      content: "",
      tags: [],
      images: null,
    },
  });

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !form.values.tags.includes(newTag)) {
        form.setFieldValue("tags", [...form.values.tags, newTag]);
        e.currentTarget.value = "";
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setFieldValue(
      "tags",
      form.values.tags.filter((tag) => tag !== tagToRemove)
    );
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
        Create New Post
      </Title>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log("submitted!!!!", values);
        })}
        className="space-y-4"
      >
        <TextInput
          label="Title"
          placeholder="Enter post title"
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Content"
          minRows={5}
          placeholder="Your content goes here...."
          {...form.getInputProps("content")}
        />

        <div>
          <TextInput
            label="Tags"
            placeholder="Type a tag and press Enter"
            onKeyDown={handleTagKeyDown}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {form.values.tags.map((tag) => (
              <Badge
                key={tag}
                rightSection={
                  <CloseButton
                    onClick={() => removeTag(tag)}
                    size="xs"
                    style={{ marginLeft: 5 }}
                  />
                }
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
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
                      form.values.images?.filter((f) => f.name !== file.name)
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
