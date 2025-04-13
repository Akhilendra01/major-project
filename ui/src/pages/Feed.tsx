import { Avatar, Badge, Button, Card, Title } from "@mantine/core";

import CreateArticleBox from "src/components/CreateArticleBox";
import { useMediaQuery } from "@mantine/hooks";

function Feed() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex w-full justify-center px-4 py-6 gap-6">
      {/* Feed Center */}
      <div className={`${isMobile ? "w-full" : "w-7/12"} space-y-6`}>
        {/* Create Post */}
        <CreateArticleBox />

        {/* Feed Posts */}
        {[1, 2, 3].map((id) => (
          <Card key={id} shadow="sm" padding="lg" radius="md" withBorder>
            <div className="flex gap-3 items-center mb-3">
              <Avatar radius="xl" />
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">Posted 1h ago</p>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </Card>
        ))}
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
