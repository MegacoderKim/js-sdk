

export interface IPageData {
  count: number,
  next: string,
  previous: string,
  results: any[],
  summary?: any
}

export interface HtLocation {
  bearing?: number,
  activity_confidence?: number,
  activity: string,
  provider?: string,
  geojson: GeoJson,
  recorded_at: string,
  accuracy?: number,
  altitude?: number,
  speed?: number
}

export interface GeoJson {
  type: string,
  coordinates: [number, number]
}

export interface IPathSegment {
  path: number[][],
  bearing: number,
  style: 'solid' | 'dotted'
}

export interface IPathPolyline {
  path: IPathSegment[],
  bearing: number
}


export interface IFilter {
  query: Object,
  name: string,
  newSetQuery:  (any) => Object,
  nextSetQuery: (any) => Object,
  params: string,
  statusParam?: string,
  mapFilter?: (any) => boolean
}

export interface IRange {
  start: string,
  end: string,
  isToday?: boolean
}

export interface IPlace {
  id: string,
  address: string,
  location: GeoJson,
  name: string,
  locality: string,
  landmark: string,
  city: string,
  state: string,
  country: string,
  zip_code: string
}


export type ITimeAwarePoint = (number | string)[];

export type Partial<T> = {
  [P in keyof T]?: T[P];
  };

export type Page<T> = {
  count: number,
  next: string,
  previous: string,
  results: T[],
}

