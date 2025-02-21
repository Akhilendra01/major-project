import ApiService from "./ApiService";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

class AuthService {
  static async login(credentials: LoginRequest) {
    return ApiService.post<LoginResponse>("login", credentials);
  }

  static async getProfile() {
    return ApiService.get<LoginResponse>("profile");
  }

  static async logout() {
    return ApiService.post("logout", {});
  }
}

export default AuthService;
