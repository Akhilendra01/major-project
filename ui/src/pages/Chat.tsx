import { Button, Container, Paper, ScrollArea, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import LlmService from "src/services/LlmService";
import { Send } from "lucide-react";

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

export function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { text: input, sender: "user" };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  // eslint-disable-next-line prefer-const
  let botMessage = { text: "", sender: "bot" };
  setMessages((prev) => [...prev, botMessage]);

  await LlmService.predict(input, (chunk) => {
    botMessage.text = formatLLMOutput(chunk);
    setMessages((prev) => [...prev.slice(0, -1), botMessage]);
  });
};

  return (
    <Container className="flex flex-col h-[calc(100vh-50px)] p-0 w-full-xl overflow-hidden bg-gray-100">
      {/* Chat Messages Scroll Area */}
      <ScrollArea
        className="flex-1 p-4 space-y-2"
        style={{ height: "calc(100vh - 160px)" }} // Adjust height as needed
        type="auto" // Ensures scrollbar only appears when needed
      >
        {messages.map((msg, index) => (
          <Paper
            key={index}
            shadow="xs"
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-green-100 ml-auto my-4"
                : "bg-gray-200 my-4"
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
          </Paper>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input Box */}
      <div className="flex items-center p-4 border-t border-gray-100 bg-gray-300">
        <TextInput
          className="flex-1 p-2 bg-gray-200 text-white rounded-lg outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <Button
          className="ml-3 p-2 bg-cyan-600 rounded-lg"
          onClick={sendMessage}
        >
          <Send size={20} />
        </Button>
      </div>
    </Container>
  );
}
