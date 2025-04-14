import { Avatar, Badge, Button, Card, Title } from "@mantine/core";
import { useEffect, useState } from "react";

import Article from "src/components/Article";
import { Article as ArticleObject } from "src/interfaces";
import CreateArticleBox from "src/components/CreateArticleBox";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "@mantine/hooks";

function Feed() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // States for articles and pagination
  const [articles, setArticles] = useState<ArticleObject[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1); // for pagination

  const fetchArticles = async (page: number) => {
  return new Promise<ArticleObject[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          _id: `id-${page}`, // Mock _id
          title: `Sample Article ${page}`,
          content: "This is a sample article content.",
          author: "John Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
          upvotes: 10,
          downvotes: 2,
          tags: ["Sample", "Tech"], // Sample tags
          images: [], // Sample images array
        },
      ]);
    }, 1000); // Simulate network delay of 1 second
  });
  };

  useEffect(() => {
    const loadArticles = async () => {
      ``;
      const newArticles = await fetchArticles(page);
      if (newArticles.length) {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      } else {
        setHasMore(false);
      }
    };
    loadArticles();
  }, [page]);

  return (
    <div className="flex w-full justify-center px-4 py-6 gap-6">
      {/* Feed Center */}
      <div className={`${isMobile ? "w-full" : "w-7/12"} space-y-6`}>
        {/* Create Post */}
        <CreateArticleBox setArticles={setArticles}/>

        {/* Infinite Scroll for Feed Posts */}
        <InfiniteScroll
          dataLength={articles.length} // Current length of articles
          next={() => setPage((prevPage) => prevPage + 1)} // Increment page to fetch more
          hasMore={hasMore} // Control whether there are more articles
          loader={<h4>Loading...</h4>} // Loading message while fetching
          endMessage={<p>No more articles to show.</p>} // Message when no more articles
          scrollThreshold={0.9} // Trigger when reaching 90% of the page
        >
          {articles.map((article) => (
            <Article key={article._id} article={article} />
          ))}
        </InfiniteScroll>
      </div>

      {/* Right Sidebar */}
      {!isMobile && (
        <div className="w-3/12 space-y-6">
          {/* Trending Topics */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={5} className="mb-3">
              Trending Topics
            </Title>
            {["AI", "React", "Cloud", "Startups"].map((topic) => (
              <Badge key={topic} className="mr-2 mb-2">
                {topic}
              </Badge>
            ))}
          </Card>

          {/* Friend Suggestions */}
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={5} className="mb-3">
              People You May Know
            </Title>
            {[1, 2, 3].map((id) => (
              <div key={id} className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar radius="xl" />
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-xs text-gray-500">Software Engineer</p>
                  </div>
                </div>
                <Button size="xs">Add</Button>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}

export default Feed;
