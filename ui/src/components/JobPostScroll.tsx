import { Loader, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";

import ContentService from "src/services/ContentService";
import InfiniteScroll from "react-infinite-scroll-component";
import JobPost from "./Jobpost";
import { State } from "src/context";

function JobPostScroll() {
  const { jobPosts, setJobPosts } = useContext(State);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobPosts = async (pageNum: number) => {
    setIsLoading(true);
    try {
      const response = await ContentService.getJobPostsForFeed(pageNum);
      return Array.isArray(response) ? response : [];
    } catch (err) {
      setError("Failed to load articles");
      console.error("Error fetching articles:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreJobPosts = async () => {
    if (isLoading || !hasMore) return;
    const newPosts = await fetchJobPosts(page);
    setJobPosts((prev) => [...prev, ...newPosts]);
    console.log(jobPosts);
    setHasMore(newPosts.length > 0);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    loadMoreJobPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {error && <Text color="red">{error}</Text>}
      <InfiniteScroll
        dataLength={jobPosts.length}
        next={loadMoreJobPosts}
        hasMore={hasMore}
        loader={<Loader size="sm" />}
        endMessage={<Text color="dimmed">No more articles</Text>}
      >
        {jobPosts.map((jobPost) => (
          <JobPost key={jobPost._id} jobPost={jobPost} />
        ))}
      </InfiniteScroll>
    </>
  );
}

export default JobPostScroll;
