export enum Events {
  STATEMENT_UPLOADED = "statement_uploaded",
  DOCTOR_LIST_REFRESHED = "doctor_list_refreshed",
}

export interface EventEmitter {
  _events: { [key in Events]?: Function[] };

  dispatch: (event: Events, data: any) => void;

  subscribe: (event: Events, callback: (data: any) => any) => void;

  unsubscribe: (event: Events) => void;
}
