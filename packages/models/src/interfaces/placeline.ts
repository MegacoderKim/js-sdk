import {IPlace} from "./common";

export interface IPlaceline {
  id: string,
  user_id: string,
  lookup_id: string,
  type: string,
  unknown_reason: string,
  started_at: string,
  ended_at: string
  duration: number,
  distance: number,
  start_location: IPlace,
  end_location: IPlace,
  route: string,
  location_time_series: string,
  health: {
    type: string,
    recorded_at: string
  },
  place?: IPlace,
  step_count: number | null
}