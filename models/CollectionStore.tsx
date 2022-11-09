export interface CollectionStore {
    collections: Collection[]
    count: number
    limit: number
    offset: number
  }
  
  export interface Collection {
    id: string
    created_at: string
    updated_at: string
    deleted_at: any
    title: string
    handle: string
    metadata: any
  }
  