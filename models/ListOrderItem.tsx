export class ListOrderItem {
  items!: Item[];
  status!: string;
  email!: string;
  billing_address!: BillingAddress;
  region_id!: string;
  customer_id!: string;
  no_notification_order!: boolean;
  shipping_methods!: ShippingMethod[];
  metadata!: Metadata3;
}
export class Metadata2 {}

export interface ShippingMethod {
  option_id: string;
  data: Data;
  price: number;
}

export class Data {}

export class Metadata3 {}

export class BillingAddress {
  id!: string;
  customer_id!: string;
  customer!: Customer[];
  company!: string;
  first_name!: string;
  last_name!: string;
  address_1!: string;
  address_2!: string;
  city!: string;
  country_code!: string;
  country!: Country;
  province!: string;
  postal_code!: number;
  phone!: number;
  created_at!: string;
  updated_at!: string;
  deleted_at!: string;
  metadata!: Metadata;
}

export interface Customer {}

export interface Country {}

export interface Metadata {
  car: string;
}
export class Item {
  variant_id!: string;
  unit_price!: number;
  title!: string;
  quantity!: number;
  metadata!: Metadata;
}

export class Metadata {}
