export interface CartItem {
  items: ItemInCart[];
}

export interface ItemInCart {
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
  count: number;
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
