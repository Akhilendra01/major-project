import { Button, Group, Text, rem } from "@mantine/core";
import { IconPdf, IconUpload, IconX } from "@tabler/icons-react";

import { Dropzone } from "@mantine/dropzone";
import LlmService from "src/services/LlmService";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

function formatLLMOutput(text: string): string {
  if (!text) return ""; // Handle empty input

  // Bold **Title** or **Headings**
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Italics *text*
  text = text.replace(/\*(.*?)\*/g, "<i>$1</i>");

  // Convert markdown-style lists (`- item`) into HTML lists
  text = text.replace(/^- (.*?)$/gm, "<li>$1</li>");

  // Convert Markdown-style headers to HTML headers
  text = text.replace(/(#+) (.*)/g, (_, hashes: string, title: string) => {
    const level = Math.min(hashes.length, 6); // Ensure max h6
    return `<h${level}>${title}</h${level}>`;
  });

  // Fix Python Code Blocks (` ```python ... ``` `)
  text = text.replace(
    /```python([\s\S]*?)```/g,
    '<pre><code class="language-python">$1</code></pre>'
  );

  // Convert inline code (single backticks `code`) to <code> tags

  // Fix Python Code Blocks (` ```python ... ``` `)
  text = text.replace(
    /```python([\s\S]*?)```/g,
    '<pre><code class="language-python">$1</code></pre>'
  );

  // Convert inline code (single backticks `code`) to <code> tags
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Replace new lines with `<br>` for better readability
  text = text.replace(/\n/g, "<br>");

  return text;
}

function ResumeAnalyser() {
  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSubmit = async () => {
    if (file) {
      setLoading(true);
      const response = await LlmService.analyseResume(file);
      setData(response);
      console.log(response);
      setLoading(false);
    }
  };

  return (
    <div className={`${isMobile ? "w-10/12" : "w-6/12"} mx-auto`}>
      <Text size="xl" mb="sm" className="text-center">
        Resume Analyser
      </Text>

      <Dropzone
        multiple={false}
        accept={{ "application/pdf": [".pdf"] }}
        maxSize={5 * 1024 ** 2}
        onDrop={(files) => setFile(files[0])}
        onReject={(files) => console.log("Rejected", files)}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(110), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload size="3.2rem" stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size="3.2rem" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPdf size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag resume here or click to select
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              PDF only • Max 5MB
            </Text>
          </div>
        </Group>
      </Dropzone>

      {file && (
        <div className="flex flex-row my-2 justify-around">
          <Text mt="sm" color="green">
            Selected file: {file.name}
          </Text>
          <Button onClick={handleSubmit} loading={loading}>
            {loading ? "Analysing" : "Analyse"}
          </Button>
        </div>
      )}

      {data && (
        <div className="my-2 py-10 text-justify"
          dangerouslySetInnerHTML={{
            __html: formatLLMOutput(data.analysis.detailed_feedback),
          }}
        />
      )}
    </div>
  );
}

export default ResumeAnalyser;
