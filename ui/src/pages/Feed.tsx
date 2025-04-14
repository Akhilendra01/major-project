import {
  Loader,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";

import Article from "src/components/Article";
import { Article as ArticleObject } from "src/interfaces";
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

  const fetchArticles = async (pageNum: number) => {
    setIsLoading(true);
    try {
      const response = await ContentService.getArticlesForFeed(pageNum);
      console.log("API Response:", response); // Debug
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
    loadMoreArticles(); // Initial load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full justify-center px-4 py-6 gap-6">
      <div className={`${isMobile ? "w-full" : "w-7/12"} space-y-6`}>
        <CreateArticleBox setArticles={setArticles} />

        {error && <Text color="red">{error}</Text>}

        {/* Or with InfiniteScroll */}
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

      {!isMobile && (
        <div className="w-3/12 space-y-6">{/* Sidebar content */}</div>
      )}
    </div>
  );
}

export default Feed;