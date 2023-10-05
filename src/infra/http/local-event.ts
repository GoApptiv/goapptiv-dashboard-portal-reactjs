import { EventEmitter, Events } from "../../data/protocols/events/event";

export class LocalEventEmitter implements EventEmitter {
  _events: {[key in Events]?: Function[]} = {};

  private static instance: LocalEventEmitter;

  /**
   * Singleton class private contructor 
   */
  private constructor() { }

  /**
   * Singleton class create instance
   */
  public static getInstance(): LocalEventEmitter {
      if (!LocalEventEmitter.instance) {
        LocalEventEmitter.instance = new LocalEventEmitter();
      }
      return LocalEventEmitter.instance;
  }

  dispatch(event: Events, data: any): void {
    if (!this._events || !this._events[event]) return;
    this._events[event]?.forEach(callback => callback(data))
  }

  subscribe(event: Events, callback: (data: any) => any): void {
    if (!this._events[event]) 
      this._events[event] = [];
    this._events[event]?.push(callback);
  }

  unsubscribe(event: Events) {
    if (!this._events[event]) return;
    delete this._events[event];
  }
}