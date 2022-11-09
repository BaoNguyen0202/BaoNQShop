export interface DataCollection {
    collections: Collection[]
    count: number
    offset: number
    limit: number
  }
  
  export interface Collection {
    id: string
    created_at: string
    updated_at: string
    title: string
    handle: string
    products: Product[]
  }
  
  export interface Product {
    id: string
    created_at: string
    updated_at: string
    deleted_at: any
    title: string
    subtitle: string
    description: string
    handle: string
    is_giftcard: boolean
    status: string
    thumbnail: string
    profile_id: string
    weight: any
    length: any
    height: any
    width: any
    hs_code: any
    origin_country: any
    mid_code: any
    material: any
    collection_id: string
    type_id: any
    discountable: boolean
    external_id: any
    metadata: any
  }
  