import { Partial } from "./common";

export interface IAccount {
  id: string;
  name: string;
  sub_accounts: ISubAccount[];
  members: IMember[];
  card: Card;
  owner_id: number;
  free_credits: number;
  billing_email?: string;
  tagline: string;
  tier: "free" | "test" | "paid";
  timezone: string;
  is_agreement_signed: boolean;
  ios_app_download_url: string | null,
  android_app_download_url: string | null,
  logo: string | null,
  ios_deeplink_url: string | null,
  android_deeplink_url: string | null
}

export type PartialAccount = Partial<IAccount>;

export interface IMember {
  user: { email: string; id: string; is_validated: boolean };
  read_token: string;
  status: string;
  role: string;
  account_id: string;
  id: string;
}

export interface ISubAccount {
  id: string;
  type: "test" | "production";
  tokens: IToken[];
}

export interface IToken {
  key: string;
  scope: "publishable" | "secret";
}

export interface Invoice {
  card?: Card;
  total: number;
  currency: string;
  start_date: string;
  end_date: string;
  due_date: string;
  stripe_charge_id: string;
  paid_on: string;
  is_paid: boolean;
  display_date: string;
}

export interface Card {
  stripe_card_id: string;
  name: string;
  brand: string;
  last4: string;
  expiry_date: string;
  country: string;
  fingerprint: string;
  billing_address: BillingAddress;
}

export interface BillingAddress {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface IWebhook {
  id: string;
  account: string;
  url: string;
  type: "web" | "slack";
  has_allowed_all: boolean;
  group_id: string;
  allowed_events: string[];
}

export interface IGroup {
  id: string;
  name: string;
  token: string;
  lookup_id: string;
}

export interface ITrackAccount {

    id: string,
    type: string,
    token: IToken,
    account: IAccount
}
