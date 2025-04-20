import { Card, Image, Text, Badge, Button, Group, Grid } from '@mantine/core';
import { JobListing } from 'src/interfaces';

export function JobCard({ job }: { job: JobListing }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* Row 1: Image and Details */}
      <Grid>
        {/* Left side - Image */}
        <Grid.Col span={3}>
          <Image
            src={job.imageUrl || "https://placehold.co/600x400?text=Company+Logo"}
            height={100}
            alt={job.companyName}
            fit="contain"
            bg="white"
            p="sm"
          />
        </Grid.Col>

        {/* Right side - Details */}
        <Grid.Col span={9}>
          <Group position="apart" mb="xs">
            <Text weight={500} size="lg">{job.title}</Text>
            <Badge color="blue" variant="light">
              {job.type}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed" mb="xs">
            {job.companyName} • {job.location}
          </Text>

          <Group spacing="xl">
            <Text size="sm">💰 {job.salary}</Text>
            <Text size="sm">🎯 {job.requiredExperience}</Text>
          </Group>

          <Text size="sm" mt="xs">
            🛠️ {job.skills}
          </Text>
        </Grid.Col>
      </Grid>

      {/* Row 2: Apply Button */}
      <Button 
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan' }}
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