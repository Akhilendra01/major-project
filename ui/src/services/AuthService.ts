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

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

interface ValidateResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
  iat: number;
  name: string;
  message: string;
}
class AuthService {
  static async login(credentials: LoginRequest) {
    return ApiService.post<LoginResponse>("login", credentials);
  }

  static async signup(data: SignupRequest) {
    return ApiService.post<void>("signup", data);
  }

  static async getProfile() {
    return ApiService.get<LoginResponse>("profile");
  }

  static async validateToken() {
    return ApiService.post<ValidateResponse>("validate", {});
  }
  static async logout() {
    return ApiService.post("logout", {});
  }
}

export default AuthService;
