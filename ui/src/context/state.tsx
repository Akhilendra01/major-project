import { Article, JobPost } from "src/interfaces";
import { createContext, useState } from "react";

import { StateProps } from "src/interfaces";

const State = createContext<StateProps>({
  opened: false,
  articles: [],
  jobPosts: [],
  setArticles: (): any  => [],
  setJobPosts: (): any  => [],
  setOpened: (): boolean => false,
});

export default function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  return (
    <State.Provider
      value={{
        opened: opened,
        setOpened: setOpened,
        articles: articles,
        setArticles: setArticles,
        jobPosts: jobPosts,
        setJobPosts: setJobPosts
      }}
    >
      {children}
    </State.Provider>
  );
}
export { State };