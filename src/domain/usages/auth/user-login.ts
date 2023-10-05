export interface UserLogin {
  login(params: UserLogin.Params): Promise<any>;
}

export namespace UserLogin {
  export type Params = {
    user_name: string;
    password: string;
  };
}
