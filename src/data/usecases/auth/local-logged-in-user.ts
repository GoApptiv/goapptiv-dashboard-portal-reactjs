import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../../../base";
import { User } from "../../../domain/models/auth/user";
import { LoggedInUser } from "../../../domain/usages/auth/logged-in-user";
import { JsonStorage } from "../../protocols/storage/json-storage";

// TODO:: User encryption to store user data to local storage.
export class LocalLoggedInUser implements LoggedInUser {
  userKey: string = AUTH_USER_KEY;
  tokenKey: string = AUTH_TOKEN_KEY;

  constructor(private readonly jsonStorage: JsonStorage) {}

  setUser(user: User): void {
    this.jsonStorage.add(this.userKey, this.encrypt(JSON.stringify(user)));
  }

  getUser(): User | null {
    let user = this.jsonStorage.get(this.userKey);
    if (user && user !== "") return JSON.parse(this.decrypt(user));
    return null;
  }

  getToken(): string | null {
    let token = this.jsonStorage.get(this.tokenKey);
    if (token && token !== "") return this.decrypt(token);
    return null;
  }

  setToken(token: string): void {
    this.jsonStorage.add(this.tokenKey, this.encrypt(token));
  }

  logout(): void {
    this.jsonStorage.remove(this.userKey);
    this.jsonStorage.remove(this.tokenKey);
  }

  resetUser(user: User): void {
    this.jsonStorage.add(this.userKey, this.encrypt(JSON.stringify(user)));
  }

  encrypt(value: string) {
    return btoa(value);
  }

  decrypt(value: string) {
    return atob(value);
  }
}
