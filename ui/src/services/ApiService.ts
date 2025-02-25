export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  error?: string;
}

export class ApiService {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || import.meta.env.VITE_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: unknown,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}/${endpoint}`;

    const token=localStorage.getItem("token");

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && {"Authorization": `Bearer ${token}`}),
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `Error ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error: ${error}`);
      throw error;
    }
  }

  get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, "GET", undefined, headers);
  }

  post<T>(endpoint: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, "POST", body, headers);
  }

  put<T>(endpoint: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>(endpoint, "PUT", body, headers);
  }

  delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, "DELETE", undefined, headers);
  }
}

export default new ApiService();
