export interface CardInfo {
  number: string | null,
  cvc: string | null,
  exp_month: number | null,
  exp_year: number,
  name?: string | null,
  address_line1?: string,
  address_line2?: string,
  address_city?: string,
  address_state?: string,
  address_zip?: string,
  address_country?: string,
}
