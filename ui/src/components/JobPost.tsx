import { Button, Card, Group, Image, Text } from "@mantine/core";

import { JobPostObj } from "src/interfaces";

const normalizeUrl = (url: string) => {
  // Decode URI-encoded parts and strip surrounding quotes if they exist
  const cleanUrl = decodeURIComponent(url).replace(/^['"]|['"]$/g, "");
  if (!/^https?:\/\//i.test(cleanUrl)) {
    return `https://${cleanUrl}`;
  }
  return cleanUrl;
};

const JobPost = ({ jobPost }: { jobPost: JobPostObj }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="2xl"
      className="max-w-2xl w-full mx-auto bg-white border border-gray-600 my-4"
    >
      <Group spacing="sm" className="overflow-x-auto pb-2">
        {jobPost.images?.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`${jobPost.companyName} image ${index + 1}`}
            radius="md"
            width={80}
            height={80}
            className="object-cover"
          />
        ))}
      </Group>

      <Text size="xl" weight={600} className="mt-4 text-gray-900">
        {jobPost.companyName}
      </Text>

      <Text size="sm" className="text-gray-700 mt-2">
        {jobPost.jobDescription}
      </Text>

      <div className="mt-6 flex justify-end">
        <Button
          component="a"
          href={normalizeUrl(jobPost.applyLink)}
          target="_blank"
          rel="noopener noreferrer"
          radius="xl"
          color="blue"
          variant="filled"
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
};

export default JobPost;
