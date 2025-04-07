import {ApiService} from "./ApiService";

interface Profile {
  name: string;
  username: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  designation: string;
  skills: string[];
  avatar: string;
}

interface ProfileResponse{
    profile: Profile;
}
class ContentService{
    static apiService= new ApiService(import.meta.env.VITE_BASE_CONTENT);

    static async getProfileByUsername(username: string|undefined) {
        if(!username)return null;
        const response = await this.apiService.get<ProfileResponse>(`get-profile/${username}`);
        return response.data.profile;
    }   
}

export default ContentService;