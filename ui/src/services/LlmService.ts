// import { ApiService } from "./ApiService";

// interface PredictResponse {
//   text: string;
// }

class LlmService {
  static async predict(prompt: string, onData: (chunk: string) => void) {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_LLM_SERVICE}/predict`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let accumulatedText = "";
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      accumulatedText += chunk;
      onData(accumulatedText);
    }
  }
}

export default LlmService;
