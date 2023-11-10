export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdAt?: string;
}

export interface IRegisterFormInput {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginFormInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export type NoteType = {
  id: number;
  note_title: string;
  note_body: string;
  isPinned: number;
  category_name: string;
  createdAt: string;
  user_id: number;
};

export type CategoryType = {
  id: number;
  category_name: string;
  createdAt: string;
  user_id: number;
};

export interface ICategoryFormInput {
  category_name: string;
}
