export interface IAuth {
  cif?: string;
  fullName?: string;
  userMisEmployee?: string;
  employeeId?: string;
  email?: string;
}

export interface ILoginParam {
  token?: string;
  email?: string;
  password?: string;
}

export interface IGetUserInfoParam {
  check_token: boolean;
}
