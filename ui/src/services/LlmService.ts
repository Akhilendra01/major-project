import { ApiService } from "./ApiService";

interface PredictResponse {
  text: string;
}

class LlmService {
  private static apiService = new ApiService(
    import.meta.env.VITE_BASE_LLM_SERVICE
  );

  static async predict(prompt: string, onTokenReceived: (token: string) => void) {
    const response = await fetch(`${import.meta.env.VITE_BASE_LLM_SERVICE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let partialMessage = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      partialMessage += decoder.decode(value, { stream: true });
      onTokenReceived(partialMessage);
    }
  }
}

export default LlmService;
