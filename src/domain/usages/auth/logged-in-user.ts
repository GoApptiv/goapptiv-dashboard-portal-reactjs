import { User } from "../../models/auth/user";

export interface LoggedInUser {
  setUser(user: User): void;
  getUser(): User | null;
  resetUser(user: User): void;
  logout(): void;
  setToken(token: string): void;
  getToken(): string | null;
}

export namespace LoggedInUser {
  export type Params = {};
}
