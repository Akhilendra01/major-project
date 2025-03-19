import { ApiService } from "./ApiService";

interface PredictResponse{
  text: string;
}

class LlmService {
  private static apiService = new ApiService(
    import.meta.env.VITE_BASE_LLM_SERVICE
  );

  static async predict(prompt: string) {
    return await this.apiService.post<PredictResponse>("predict", { prompt: prompt });
  }
}

export default LlmService;
