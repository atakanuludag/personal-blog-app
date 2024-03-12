export interface UserModel {
  userName: string;
  email: string;
  name: string;
  surname: string;
}

export type UserProfileFormModel = {
  userName: string;
  email: string;
  name: string;
  surname: string;
  password?: string;
  rePassword?: string;
};
