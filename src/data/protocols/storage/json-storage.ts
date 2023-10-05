export interface JsonStorage {
  add: (key: string, value: any) => void;
  get: (key: string) => any;
  remove: (key: string) => void;
}