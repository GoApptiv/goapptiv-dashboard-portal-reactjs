export interface ChangePassword {
  change(params: ChangePassword.Params): Promise<any>;
}

export namespace ChangePassword {
  export type Params = {
    password: string;
    new_password: string;
    confirm_new_password: string;
  };
}
