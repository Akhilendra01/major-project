import { Avatar, Badge, Button, Card, Title } from "@mantine/core";

import { Article as ArticleObject } from "src/interfaces";

function Article({ article }: { article: ArticleObject }) {
  return (
    <Card key={article._id} shadow="sm" padding="lg" radius="md" withBorder>
      <div className="flex gap-3 items-center mb-3">
        <Avatar radius="xl" />
        <div>
          <p className="font-semibold">{article.author}</p>
          <p className="text-sm text-gray-500">
            Posted {new Date(article.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <Title order={3}>{article.title}</Title>
      <p>{article.content}</p>
      {article.tags.length > 0 && (
        <div className="mt-2 flex gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} color="blue" variant="light">
              {tag}
            </Badge>
          ))}
        </div>
      )}
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
        <Button variant="outline" size="xs">
          Upvote ({article.upvotes})
        </Button>
        <Button variant="outline" size="xs" className="ml-2">
          Downvote ({article.downvotes})
        </Button>
      </div>
    </Card>
  );
}

export default Article;
