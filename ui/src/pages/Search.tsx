import { Text, TextInput } from "@mantine/core";

import Article from "src/components/Article";
import { Article as ArticleObject } from "src/interfaces";
import ContentService from "src/services/ContentService";
import { IconSearch } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<ArticleObject[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSearch = async () => {
    console.log("Searching for:", query);
    const res = await ContentService.searchArticles(query);
    console.log(res.data.articles);
    setArticles(res.data.articles);
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
      {articles.map((article) => (
        <Article key={article._id} article={article} />
      ))}
    </>
  );
}
