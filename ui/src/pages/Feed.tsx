import { Article as ArticleObject, UserBadge } from "src/interfaces";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

import Article from "src/components/Article";
import ContentService from "src/services/ContentService";
import CreateArticleBox from "src/components/CreateArticleBox";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "@mantine/hooks";

function Feed() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [articles, setArticles] = useState<ArticleObject[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [followRecommend, setFollowRecommend] = useState<UserBadge[]>([]);

  const fetchArticles = async (pageNum: number) => {
    setIsLoading(true);
    try {
      const response = await ContentService.getArticlesForFeed(pageNum);
      return Array.isArray(response) ? response : [];
    } catch (err) {
      setError("Failed to load articles");
      console.error("Error fetching articles:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreArticles = async () => {
    if (isLoading || !hasMore) return;
    const newArticles = await fetchArticles(page);
    setArticles((prev) => [...prev, ...newArticles]);
    setHasMore(newArticles.length > 0);
    setPage((prev) => prev + 1);
  };

  const loadTrendingTags = async () => {
    setTags((await ContentService.getTrendingTags()).data);
  };

  const loadFollowRecommend = async () => {
    setFollowRecommend((await ContentService.getFollowRecommendations()).data);
  };

  useEffect(() => {
    loadMoreArticles();
    loadTrendingTags();
    loadFollowRecommend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full justify-center px-4 py-6 gap-6">
      {/* Center Feed */}
      <div className={`${isMobile ? "w-full" : "w-[600px]"} space-y-6`}>
        <CreateArticleBox setArticles={setArticles} />
        {error && <Text color="red">{error}</Text>}

        <InfiniteScroll
          dataLength={articles.length}
          next={loadMoreArticles}
          hasMore={hasMore}
          loader={<Loader size="sm" />}
          endMessage={<Text color="dimmed">No more articles</Text>}
        >
          {articles.map((article) => (
            <Article key={article._id} article={article} />
          ))}
        </InfiniteScroll>
      </div>

      {/* Right Sidebar */}
      {!isMobile && (
        <div className="w-[300px] space-y-6 hidden md:block">
          {/* Trending */}
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Title order={4}>Trending</Title>
            {tags.map((tag) => (
              <Badge
                key={tag}
                size="sm"
                color="blue"
                className="cursor-pointer hover:underline font-medium"
              >
                {tag}
              </Badge>
            ))}
          </Card>

          {/* Who to follow */}
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Title order={4}>Who to follow</Title>
            <Stack spacing="md" mt="md">
              {followRecommend.map((person) => (
                <Group key={person.username} position="apart">
                  <Group>
                    <Avatar radius="xl" size="sm" src={person.image} />
                    <div>
                      <Text size="sm" weight={500}>
                        {`${person.firstName} ${person.lastName}`}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {person.username}
                      </Text>
                    </div>
                  </Group>
                  <Button size="xs" variant="light">
                    Follow
                  </Button>
                </Group>
              ))}
            </Stack>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Feed;
