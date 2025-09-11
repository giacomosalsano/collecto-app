export interface GetUserCollectionRequest {
  user_id: number;
}

export interface GetUserCollectionResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  owned_shares: number;
}
