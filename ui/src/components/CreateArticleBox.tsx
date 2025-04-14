import {
  Badge,
  Button,
  Card,
  CloseButton,
  Group,
  Image,
  Text,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useRef, useState } from "react";

import { IconPhoto } from "@tabler/icons-react";

function CreateArticleBox() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const openRef = useRef<() => void>(null); // ✅ function ref for Dropzone

  const handleImageDrop = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (fileName: string) => {
    setImages((prev) => prev.filter((f) => f.name !== fileName));
    URL.revokeObjectURL(fileName);
  };

  const addTagToList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") return;
    e.preventDefault();
    const newTag = e.currentTarget.value.trim();
    if (!newTag || tags.includes(newTag)) return;
    setTags((prev) => [...prev, newTag]);
    e.currentTarget.value = "";
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((img) => formData.append("images", img));
    console.log("Submit post", { title, content, images });
    setTitle("");
    setContent("");
    setImages([]);
    setLoading(false);
    // axios.post('/api/posts', formData)
  };

  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder className="bg-white">
      <Text className="mb-4 text-gray-500">
        Share you experiences ....
      </Text>

      <div className="space-y-4">
        <TextInput
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          minRows={4}
        />

        {/* Tags input (optional) */}
        <div>
          {tags.map((tag) => (
            <Badge
              key={tag}
              color="blue"
              className="mr-2 mb-2 cursor-pointer"
              onClick={() => removeTag(tag)}
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
          <TextInput
            placeholder="Type a tag and press Enter"
            onKeyDown={addTagToList}
          />
        </div>
        {/* Hidden Dropzone for image upload */}
        <Dropzone
          openRef={openRef}
          onDrop={handleImageDrop}
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.webp]}
          multiple
          className="hidden"
          children={undefined}
        />

        <Group position="right">
          <Tooltip label="Attach Images">
            <Button
              variant="light"
              color="blue"
              onClick={() => openRef.current?.()}
              leftIcon={<IconPhoto size={18} />}
              compact
            >
              Add Images
            </Button>
          </Tooltip>
        </Group>

        {images.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {images.map((file) => (
              <div key={file.name} className="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  width={100}
                  height={100}
                  radius="md"
                  alt={file.name}
                  withPlaceholder
                />
                <CloseButton
                  onClick={() => removeImage(file.name)}
                  className="absolute -top-2 -right-2 bg-white shadow"
                  size="sm"
                />
              </div>
            ))}
          </div>
        )}

        <Button onClick={handleSubmit} loading={loading} fullWidth radius="xl">
          Post
        </Button>
      </div>
    </Card>
  );
}

export default CreateArticleBox;
