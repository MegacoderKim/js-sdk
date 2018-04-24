export interface TableFormat {
  label: string,
  selector: (data: any) => string | number,
  key: string,
  clickAction?: (data: any) => void
  isPic?: boolean,
  isDot?: boolean
}

