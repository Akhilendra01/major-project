import { Button, Container, Paper, ScrollArea, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import { Send } from "lucide-react";

export function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is a bot response!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <Container className="flex flex-col h-[calc(100vh-50px)] p-0 w-full-xl overflow-hidden bg-gray-100">
      {/* Chat Messages Scroll Area */}
      <ScrollArea
        className="flex-1 p-4 space-y-2"
        style={{ height: "calc(100vh - 160px)"}} // Adjust height as needed
        type="auto" // Ensures scrollbar only appears when needed
      >
        {messages.map((msg, index) => (
          <Paper
            key={index}
            shadow="xs"
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user" ? "bg-green-100 ml-auto my-4" : "bg-gray-200 my-4"
            }`}
          >
            {msg.text}
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
