import {IAction, ITrackingData} from "./model";

export const actionToTrackingData = (action: IAction): ITrackingData => {
  return {
    id: action.id,
    encodedTimeAwarePolyline: action.time_aware_polyline,
    destination: action.expected_place,
    isLive: !action.display.show_summary,
    vehicleType: action.vehicle_type
  };
};