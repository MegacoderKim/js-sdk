import { HtLocation, IPageData } from "./common";
export interface IEvent {
  id: string;
  user_id: string;
  recorded_at: string;
  location: HtLocation | Object;
  created_at: string;
  modified_at: string;
  type: string;
  data: {
    source: string;
    percentage: string;
    charging: string;
    power_saver: boolean;
    idle_mode: boolean;
  };
}

export interface ITimelineEvent {
  id: string;
  recorded_at: string;
  type: string;
  user_id: string;
  position?: number[];
  info?: string;
}

export interface IEventPage extends IPageData {
  results: IEvent[];
}
