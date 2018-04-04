export interface IInvoices {
  id: string,
  card_id: string,
  total: number,
  currency: string,
  start_date: string,
  end_date: string,
  due_date: string,
  paid_on: string | null
  is_paid: boolean
}
