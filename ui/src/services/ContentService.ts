import { ApiResponse, ApiService } from "./ApiService";

export interface Profile {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  location: string;
  email: string;
  branch: string;
  designation: string;
  skills: string[];
  avatar: string;
  imageUrl: string;
  batch: number;
}

interface ProfileResponse {
  profile: Profile;
}
class ContentService {
  static apiService = new ApiService(import.meta.env.VITE_BASE_CONTENT);

  static async getProfileByUsername(
    username: string | undefined
  ): Promise<Profile | null> {
    if (!username) return null;
    const response = await this.apiService.get<ProfileResponse>(
      `get-profile/${username}`
    );
    return response.data.profile;
  }

  static async updateProfile(profile: Profile): Promise<ApiResponse<Profile>> {
    return await this.apiService.put(`update-profile`, profile);
  }
}

export default ContentService;
