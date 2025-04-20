import { Container, Grid, Button, Text, Loader, Center } from '@mantine/core';
import { JobCard } from 'src/components/JobCard';
import { JobListing } from 'src/interfaces';
import { useState, useEffect } from 'react';

export default function OffCampus() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.cuvette.tech/api/v1/externaljobs?pageNumber=${pageNum}`
      );
      const data = await response.json();
      
      if (data.data.length === 0) {
        setHasMore(false);
        return;
      }

      setJobs(prevJobs => [...prevJobs, ...data.data]);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    fetchJobs(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchJobs(nextPage);
  };

  return (
    <Container size="xl" py="xl">
      {jobs.length === 0 && loading ? (
        <Center>
          <Loader size="xl" />
        </Center>
      ) : jobs.length === 0 ? (
        <Text align="center" size="xl">No jobs found</Text>
      ) : (
        <>
          <Grid>
            {jobs.map((job) => (
              <Grid.Col key={job._id} xs={12} sm={12} md={6} lg={6}>
                <JobCard job={job} />
              </Grid.Col>
            ))}
          </Grid>

          {hasMore && (
            <Center mt="xl">
              <Button 
                size="lg"
                onClick={handleLoadMore}
                loading={loading}
                disabled={loading}
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
              >
                {loading ? 'Loading more jobs...' : 'Load More Jobs'}
              </Button>
            </Center>
          )}
        </>
      )}
    </Container>
  );
}