export interface IAuth {
  cif?: string;
  fullName?: string;
  userMisEmployee?: string;
  employeeId?: string;
  email?: string;
}

export enum LoginFormEnum {
  password = 'password',
  email = 'email',
}

export type LoginForm = Record<LoginFormEnum, any>;

export interface ILogin {
  access_token: string;
}

export interface ILoginParam {
  token?: string;
  email?: string;
  password?: string;
}
