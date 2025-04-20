import {
  ApiResponse,
  Article,
  CreateArticleRequest,
  CreatePostRequest,
  EmptyResponse,
  Profile,
  ProfileFormValues,
  ProfileResponse,
  UserBadge,
  VoteResponse,
} from "src/interfaces";

import { ApiService } from "./ApiService";

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

  static async updateProfile(
    profile: ProfileFormValues
  ): Promise<ApiResponse<Profile>> {
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
    formData.append("companyName", postValues.companyName);
    formData.append("jobDescription", postValues.jobDescription);
    formData.append("applyLink", JSON.stringify(postValues.applyLink));
    if (postValues.images) {
      for (let i = 0; i < postValues.images.length; i++) {
        formData.append("images", postValues.images[i]);
      }
    }
    return await this.apiService.post<EmptyResponse>(`create-post`, formData);
  }

  static async createArticle(
    createPostRequest: CreateArticleRequest
  ): Promise<ApiResponse<Article>> {
    const formData = new FormData();
    formData.append("title", createPostRequest.title);
    formData.append("content", createPostRequest.content);
    formData.append("tags", JSON.stringify(createPostRequest.tags));

    if (createPostRequest.images) {
      for (let i = 0; i < createPostRequest.images.length; i++) {
        formData.append("images", createPostRequest.images[i]);
      }
    }
    return await this.apiService.post<Article>(`create-article`, formData);
  }

  static async getArticlesForFeed(
    page: number
  ): Promise<ApiResponse<Article[]>> {
    return await this.apiService.get<Article[]>(`feed?page=${page}`);
  }

  static async getTrendingTags(): Promise<ApiResponse<string[]>> {
    return await this.apiService.get<string[]>(`get-trending-tags`);
  }
  static async getFollowRecommendations(): Promise<ApiResponse<UserBadge[]>> {
    return await this.apiService.get<UserBadge[]>(`get-follow-recommendations`);
  }

  static async upvote(id: string): Promise<ApiResponse<VoteResponse>> {
    return await this.apiService.get<VoteResponse>(`upvote/${id}`);
  }
  static async downvote(id: string): Promise<ApiResponse<VoteResponse>> {
    return await this.apiService.get<VoteResponse>(`downvote/${id}`);
  }

  static async searchArticles(query: string): Promise<ApiResponse<{articles: Article[]}>> {
    return await this.apiService.get<{articles: Article[]}>(`search-articles?q=${query}`);
  }
}

export default ContentService;
