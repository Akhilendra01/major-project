import CreatePost from "src/components/forms/CreatePost";
import { Select } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

function AdminAction() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [form, setForm] = useState<string>("");
  return (
    <div className="p-2">
      <Select
        placeholder="Select"
        data={["Select", "Post a job", "Upload Data", "Others..."]}
        onChange={(value) => {
          setForm(value || "");
        }}
        className={`bg-white ${isMobile ? "max-w-md" : "w-6/12"} mx-auto py-4`}
      />
      {form === "Post a job" && <CreatePost />}
    </div>
  );
}

export default AdminAction;
