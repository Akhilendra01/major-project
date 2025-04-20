import { Loader, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";

import Article from "./Article";
import ContentService from "src/services/ContentService";
import InfiniteScroll from "react-infinite-scroll-component";
import { State } from "src/context";

function ArticleScroll() {
  const {articles, setArticles}=useContext(State);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

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

  useEffect(() => {
    loadMoreArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
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
    </>
  );
}

export default ArticleScroll;
