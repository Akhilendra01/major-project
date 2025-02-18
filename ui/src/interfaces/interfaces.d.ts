import {Dispatch, SetStateAction} from 'react';

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthProps {
  user: Record<string, string>;
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
  friends?: Array<string>|[];
  topics?: Array<string>|[];
}

export type User=Record<string, any>;
export type SetUser=Dispatch<SetStateAction<Record<string, any>>>
export type SetProfileData=Dispatch<SetStateAction<UserData>>