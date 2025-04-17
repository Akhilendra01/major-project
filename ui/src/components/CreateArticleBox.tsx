import {
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

import { Article } from "src/interfaces";
import ContentService from "src/services/ContentService";
import { IconPhoto } from "@tabler/icons-react";

function CreateArticleBox({
  setArticles,
}: {
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const openRef = useRef<() => void>(null);

  const handleImageDrop = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (fileName: string) => {
    setImages((prev) => prev.filter((f) => f.name !== fileName));
    URL.revokeObjectURL(fileName);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await ContentService.createArticle({
      title: title,
      content: content,
      // tags: tags,
      images: images,
    });
    setArticles((prev) => [response.data, ...prev]);
    setTitle("");
    setContent("");
    setImages([]);
    // setTags([]);
    setLoading(false);
  };

  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder className="bg-white">
      <Text className="mb-4 text-gray-500">Share you experiences ....</Text>

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
