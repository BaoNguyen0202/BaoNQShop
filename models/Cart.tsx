export interface DataCart {
  cart: Cart;
}

export interface Cart {
  object: string;
  id: string;
  gift_cards: any[];
  region: Region;
  items: Item[];
  payment: any;
  shipping_address: any;
  billing_address: any;
  shipping_methods: any[];
  payment_sessions: any[];
  discounts: any[];
  created_at: string;
  updated_at: string;
  deleted_at: any;
  email: any;
  billing_address_id: any;
  shipping_address_id: any;
  region_id: string;
  customer_id: any;
  payment_id: any;
  type: string;
  completed_at: any;
  payment_authorized_at: any;
  idempotency_key: any;
  context: Context;
  metadata: any;
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  discount_total: number;
  gift_card_total: number;
  gift_card_tax_total: number;
  total: number;
}

export interface Region {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  name: string;
  currency_code: string;
  tax_rate: number;
  tax_code: any;
  gift_cards_taxable: boolean;
  automatic_taxes: boolean;
  tax_provider_id: any;
  metadata: any;
  countries: Country[];
  payment_providers: PaymentProvider[];
  tax_rates: any[];
  fulfillment_providers: FulfillmentProvider[];
}

export interface Country {
  id: number;
  iso_2: string;
  iso_3: string;
  num_code: number;
  name: string;
  display_name: string;
  region_id: string;
}

export interface PaymentProvider {
  id: string;
  is_installed: boolean;
}

export interface FulfillmentProvider {
  id: string;
  is_installed: boolean;
}

export interface Item {
  id: string;
  created_at: string;
  updated_at: string;
  cart_id: string;
  order_id: any;
  swap_id: any;
  claim_order_id: any;
  title: string;
  description: string;
  thumbnail: string;
  is_return: boolean;
  is_giftcard: boolean;
  should_merge: boolean;
  allow_discounts: boolean;
  has_shipping: boolean;
  unit_price: number;
  variant_id: string;
  quantity: number;
  fulfilled_quantity: any;
  returned_quantity: any;
  shipped_quantity: any;
  metadata: Metadata;
  adjustments: any[];
  tax_lines: TaxLine[];
  variant: Variant;
  subtotal: number;
  gift_card_total: number;
  discount_total: number;
  total: number;
  original_total: number;
  original_tax_total: number;
  tax_total: number;
}

export interface Metadata {}

export interface TaxLine {
  rate: number;
  name: string;
  code: string;
  item_id: string;
}

export interface Variant {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  title: string;
  product_id: string;
  sku: any;
  barcode: any;
  ean: any;
  upc: any;
  inventory_quantity: number;
  allow_backorder: boolean;
  manage_inventory: boolean;
  hs_code: any;
  origin_country: any;
  mid_code: any;
  material: any;
  weight: any;
  length: any;
  height: any;
  width: any;
  metadata: any;
  product: Product;
}

export interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  title: string;
  subtitle: any;
  description: string;
  handle: string;
  is_giftcard: boolean;
  status: string;
  thumbnail: string;
  profile_id: string;
  weight: number;
  length: any;
  height: any;
  width: any;
  hs_code: any;
  origin_country: any;
  mid_code: any;
  material: any;
  collection_id: any;
  type_id: any;
  discountable: boolean;
  external_id: any;
  metadata: any;
}

export interface Context {
  ip: string;
  user_agent: string;
}
