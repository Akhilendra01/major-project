import {Dispatch, SetStateAction} from 'react';

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: Record<string, any>;
  setUser: Dispatch<SetStateAction<Record<string, string>>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  loginHandler: (c: Credentials) => void;
  logoutHandler: () => void;
}

export interface StateProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

interface UserData {
  status?: number;
  name?: string;
  username?: string;
  email?: string;
  photoUrl?: string;
  isAdmin: boolean;
  friends?: Array<string>|[];
  topics?: Array<string>|[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type User=Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetUser=Dispatch<SetStateAction<Record<string, any>>>
export type SetProfileData=Dispatch<SetStateAction<UserData>>


export interface CreatePostRequest {
  title: string | "";
  content: string | "";
  tags: string[];
  images: File[] | null | undefined;
}

export interface CreateArticleRequest {
  title: string | "";
  content: string | "";
  tags: string[];
  images: File[] | null | undefined;
}

export interface Article{
  author: string;
  title: string;
  content: string;
  tags: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  upvotes: number;
  downvotes: number;
}

export interface EmptyResponse{
  message: string;
}

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

export interface ProfileFormValues {
  username: string | "";
  firstName: string | "";
  lastName: string | "";
  bio: string | "";
  location: string | "";
  designation: string | "";
  skills: string[];
  batch: number | null;
  branch: string | "";
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  error?: string;
}

export interface UserBadge{
  image: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface VoteResponse{
  upvotes: number;
  downvotes: number;
}

export interface JobListing {
  _id: string;
  companyName: string;
  title: string;
  location: string;
  imageUrl: string;
  type: string;
  salary: string;
  redirectLink: string;
  requiredExperience: string;
  skills: string;
}