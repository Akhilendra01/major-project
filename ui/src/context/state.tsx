import { createContext, useState } from "react";

import { StateProps } from "src/interfaces";

const State = createContext<StateProps>({
  opened: false,
  setOpened: (): boolean => false,
});

export default function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  return (
    <State.Provider
      value={{
        opened: opened,
        setOpened: setOpened,
      }}
    >
      {children}
    </State.Provider>
  );
}
export { State };