import { Text, TextInput } from "@mantine/core";

import Article from "src/components/Article";
import { Article as ArticleObject } from "src/interfaces";
import ContentService from "src/services/ContentService";
import { IconSearch } from "@tabler/icons-react";
import Loader from "src/components/Loader";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<ArticleObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSearch = async () => {
    console.log("Searching for:", query);
    setLoading(true);
    const res = await ContentService.searchArticles(query);
    setArticles(res.data.articles);
    setLoading(false);
  };
  return (
    <>
      <Text size={14} className="text-center my-2">
        Search Articles
      </Text>
      <div className={`pd-4 mx-auto ${isMobile ? "w-10/12" : "w-2/4"}`}>
        <TextInput
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          rightSection={
            <IconSearch cursor={`pointer`} onClick={handleSearch} />
          }
        />
      </div>
      {loading && <Loader />}
      <div className={`pd-4 mx-auto ${isMobile ? "w-11/12" : "w-3/4"}`}>
        {articles.map(
          (article) =>
            article && <Article key={article._id} article={article} />
        )}
      </div>
    </>
  );
}
