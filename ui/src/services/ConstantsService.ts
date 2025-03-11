import { ApiService } from "./ApiService";

interface ConstantsServiceResponse {
  companies: object[];
  positions: object[];
}

class ConstantsService {
  private static apiService = new ApiService(import.meta.env.VITE_BASE_CONTENT);

  static async getConstants() {
    return this.apiService.get<ConstantsServiceResponse>("constants");
  }
}

export default ConstantsService;
