import { Container, Grid, TextInput, Group, Button, Text, Loader } from '@mantine/core';
import { JobCard } from 'src/components/JobCard';
import { JobListing } from 'src/interfaces';
import { useState, useEffect } from 'react';
import { IconSearch } from '@tabler/icons-react';

export default function OffCampus() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        `https://api.cuvette.tech/api/v1/externaljobs?search=${search}&pageNumber=${page}`
      );
      const data = await response.json();
      setJobs(data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const handleSearch = () => {
    setLoading(true);
    setPage(1);
    fetchJobs();
  };

  return (
    <Container size="xl" py="xl">
      <Group mb="xl">
        <TextInput
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} leftIcon={<IconSearch size={14} />}>
          Search
        </Button>
      </Group>

      {loading ? (
        <Loader />
      ) : jobs.length === 0 ? (
        <Text align="center">No jobs found</Text>
      ) : (
        <Grid>
          {jobs.map((job) => (
            <Grid.Col key={job._id} xs={12} sm={6} md={4} lg={3}>
              <JobCard job={job} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
}