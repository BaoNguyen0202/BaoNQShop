export interface DataProduct {
  products: Product[];
  count: number;
  offset: number;
  limit: number;
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
  variants: Variant[];
  options: Option2[];
  images: Image[];
  tags: any[];
  collection: any;
  type: any;
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
  prices: Price[];
  options: Option[];
  original_price: any;
  calculated_price: any;
  original_price_incl_tax: any;
  calculated_price_incl_tax: any;
  original_tax: any;
  calculated_tax: any;
  tax_rates: any;
}

export interface Price {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  currency_code: string;
  amount: number;
  min_quantity: any;
  max_quantity: any;
  price_list_id: any;
  variant_id: string;
  region_id: any;
  price_list: any;
}

export interface Option {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  value: string;
  option_id: string;
  variant_id: string;
  metadata: any;
}

export interface Option2 {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  title: string;
  product_id: string;
  metadata: any;
  values: Value[];
}

export interface Value {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  value: string;
  option_id: string;
  variant_id: string;
  metadata: any;
}

export interface Image {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  url: string;
  metadata: any;
}
