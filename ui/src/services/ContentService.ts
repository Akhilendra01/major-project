import { ApiResponse, ApiService } from "./ApiService";
import { CreatePostRequest, EmptyResponse } from "src/interfaces";

export interface Profile {
  _id: string;
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
  imgUrl: string;
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
  static async uploadProfileImage(
    formData: FormData
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // onUploadProgress?: (progressEvent: ProgressEvent) => void
  ): Promise<{ imageUrl: string }> {
    const response = await this.apiService.post<{ imageUrl: string }>(
      `update-avatar`,
      formData
    );
    return { imageUrl: response.data.imageUrl };
  }

  static async createPost(
    postValues: CreatePostRequest
  ): Promise<ApiResponse<EmptyResponse>> {
    const formData = new FormData();
    formData.append("title", postValues.title);
    formData.append("content", postValues.content);
    formData.append("tags", JSON.stringify(postValues.tags));
    if (postValues.images) {
      for (let i = 0; i < postValues.images.length; i++) {
        formData.append("images", postValues.images[i]);
      }
    }
    return await this.apiService.post<EmptyResponse>(
      `create-post`,
      formData
    );
  }
}

export default ContentService;
