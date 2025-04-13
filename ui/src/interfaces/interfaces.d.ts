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

export interface EmptyResponse{
  message: string;
}