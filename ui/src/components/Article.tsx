import { ArrowDown, ArrowUp } from "lucide-react";
import { Badge, Button, Card, Text } from "@mantine/core";

import { Article as ArticleObject } from "src/interfaces";
import ContentService from "src/services/ContentService";
import { Link } from "react-router-dom";
import { useState } from "react";

function Article({ article }: { article: ArticleObject }) {
  const [upvotes, setUpvotes] = useState<number>(article.upvotes);
  const [downvotes, setDownvotes] = useState<number>(article.downvotes);

  const doUpvote = async () => {
    const response = await ContentService.upvote(article._id);
    setUpvotes(response.data.upvotes);
    setDownvotes(response.data.downvotes);
  };

  const doDownvote = async () => {
    const response = await ContentService.downvote(article._id);
    setUpvotes(response.data.upvotes);
    setDownvotes(response.data.downvotes);
  };

  return (
    <Card key={article._id} shadow="sm" padding="lg" radius="md" withBorder>
      <div className="flex gap-3 items-center mb-3">
        <div>
          <Link to={`/@/${article.author}`} className="no-underline">
            <p className="font-semibold">{article.author}</p>
          </Link>
          <p className="text-sm text-gray-500">
            Posted {new Date(article.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <Text className="text-lg font-medium">{article.title}</Text>
      {article.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 my-4">
          {article.tags.map((tag) => (
            <Badge
              key={tag}
              size="xs"
              color="blue"
              variant="light"
              className="whitespace-normal break-words max-w-full text-xs px-3 py-1 font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <p>{article.content}</p>
      {article.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {article.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Article Image ${index + 1}`}
              className="max-w-full max-h-[400px] w-full object-cover rounded-xl shadow-sm border border-gray-200 hover:scale-[1.01] transition-transform duration-200"
            />
          ))}
        </div>
      )}
      <div className="votes mt-3">
        <Button variant="outline" size="xs" onClick={doUpvote}>
          <ArrowUp /> {upvotes}
        </Button>
        <Button
          variant="outline"
          size="xs"
          className="ml-2"
          onClick={doDownvote}
        >
          <ArrowDown /> {downvotes}
        </Button>
      </div>
    </Card>
  );
}

export default Article;
