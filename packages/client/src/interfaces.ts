
export const defaultListConfig: IListConfig = {
  isLive: false,
};

export interface IDateRange {
  start: string,
  end: string
}

export interface IListConfig {
  initialQuery?: object,
  isLive?: boolean
}

export interface AllData<T> {
  resultsEntity: {[id: string]: T},
  isFirst: boolean,
  timestamp?: string,
  count?: number,
  next?: string,
  previous?: string
}

export enum ApiType {
  index = 'index',
  analytics = 'analytics'
}

export interface QueryLabel {
  label: string,
  values: string[],
  value?: string,
  color?: string
}

