import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { JobListing } from 'src/interfaces';

export function JobCard({ job }: { job: JobListing }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={job.imageUrl || "https://placehold.co/600x400?text=Company+Logo"}
          height={100}
          alt={job.companyName}
          fit="contain"
          bg="white"
          p="sm"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{job.title}</Text>
        <Badge color="blue" variant="light">
          {job.type}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {job.companyName} • {job.location}
      </Text>

      <Text mt="md" size="sm">
        💰 {job.salary}
      </Text>
      
      <Text size="sm">
        🎯 {job.requiredExperience}
      </Text>

      <Text size="sm">
        🛠️ {job.skills}
      </Text>

      <Button 
        variant="light" 
        color="blue" 
        fullWidth 
        mt="md" 
        radius="md"
        component="a"
        href={job.redirectLink}
        target="_blank"
      >
        Apply Now
      </Button>
    </Card>
  );
}