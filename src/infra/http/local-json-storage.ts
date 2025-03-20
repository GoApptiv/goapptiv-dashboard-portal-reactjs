import { JsonStorage } from "../../data/protocols/storage/json-storage";

export class LocalJsonStorage implements JsonStorage {
  private static instance: LocalJsonStorage;

  /**
   * Singleton class private contructor
   */
  private constructor() {}

  /**
   * Singleton class create instance
   */
  public static getInstance(): LocalJsonStorage {
    if (!LocalJsonStorage.instance) {
      LocalJsonStorage.instance = new LocalJsonStorage();
    }
    return LocalJsonStorage.instance;
  }

  /**
   * Add key and value
   *
   * @param key
   * @param value
   */
  add(key: string, value: any): void {
    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
  }

  /**
   * Get value for key
   *
   * @param key
   * @returns
   */
  get(key: string): any {
    let value = sessionStorage.getItem(key);
    if (!value || value === "") return null;
    return JSON.parse(value);
  }

  /**
   * Remove value for key
   *
   * @param key
   */
  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
