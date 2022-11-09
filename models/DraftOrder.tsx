export interface DataDraftOrder {
  draft_orders: DraftOrder[];
  count: number;
  offset: number;
  limit: number;
}

export interface DraftOrder {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  display_id: number;
  cart_id: string;
  order_id: any;
  canceled_at: any;
  no_notification_order: boolean;
  metadata: any;
  order: any;
  cart: Cart;
}

export interface Cart {
  object: string;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  email: string;
  billing_address_id: any;
  shipping_address_id: any;
  region_id: string;
  customer_id: string;
  payment_id: any;
  type: string;
  completed_at: any;
  payment_authorized_at: any;
  idempotency_key: any;
  context: Context;
  metadata: Metadata;
  items: Item[];
}

export interface Context {}

export interface Metadata {}

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
  metadata: Metadata2;
  adjustments: any[];
  variant: Variant;
}

export interface Metadata2 {}

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
