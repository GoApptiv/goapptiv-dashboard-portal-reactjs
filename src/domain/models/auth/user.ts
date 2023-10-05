type Errors = {
  message: string;
};

export type User = {
  user_id: number;
  role: string;
  auth_token: string;
  user_name: string;
  password: string;
  errors?: Errors;
  mobile: string;
  department: string;
};
