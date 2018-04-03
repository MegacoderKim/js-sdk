import {HtLocation} from "ht-models";

export interface ISdkEvent {
  id: string,
  type: string,
  user_id: string,
  location: HtLocation,
  recorded_at: string,
  created_at: string,
  stopDistance?: number,
  data: {
    stop_id?: string
  }
};

export const SdkEvents = [
  'stop.started',
  'stop.ended',
  'location.changed',
  'action.completed',
  'tracking.ended',
  'tracking.started',
  'activity.changed',
  'activity.started',
  'activity.ended',
  'activity.updated',
  'device.power.changed',
  'device.radio.changed',
  'device.location_config.changed',
  'device.info.changed',
  'device.service.restarted',
  'activity.created',
  'activity.updated',
  'device.power.state',
  'health.info.changed',
  'health.power.changed',
  'health.radio.changed',
  'health.location.changed'
];

export function GetEventColor(type) {
  let n = SdkEvents.indexOf(type);
  var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
  return colores_g[n % colores_g.length];
}
