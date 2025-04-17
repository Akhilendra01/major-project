import { Loader as Circle } from "@mantine/core";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Circle color="blue" size="xl" />
    </div>
  );
}

export default Loader;
