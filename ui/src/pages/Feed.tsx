import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

import ArticleScroll from "src/components/ArticleScroll";
import ContentService from "src/services/ContentService";
import CreateArticleBox from "src/components/CreateArticleBox";
import JobPostScroll from "src/components/JobpostScroll";
import { UserBadge } from "src/interfaces";
import { useMediaQuery } from "@mantine/hooks";

function Feed() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [tags, setTags] = useState<string[]>([]);
  const [followRecommend, setFollowRecommend] = useState<UserBadge[]>([]);
  const [show, setShow]=useState<string>("articles");

  const loadTrendingTags = async () => {
    setTags((await ContentService.getTrendingTags()).data);
  };

  const loadFollowRecommend = async () => {
    setFollowRecommend((await ContentService.getFollowRecommendations()).data);
  };

  useEffect(() => {
    loadTrendingTags();
    loadFollowRecommend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full justify-center px-4 py-6 gap-6">
      {/* Center Feed */}
      <div className={`${isMobile ? "w-full" : "w-[600px]"} space-y-6`}>
        <CreateArticleBox/>
        <div className="w-full flex flex-row justify-around">
          <Badge className="cursor-pointer" onClick={()=>setShow("articles")}>Articles</Badge>
          <Badge className="cursor-pointer" onClick={()=>setShow("jobposts")}>Job Posts</Badge>
        </div>
        {show=="articles" && <ArticleScroll />}
        {show=="jobposts" && <JobPostScroll />}
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
