export interface GetUserCollectionByUserIdRequest {
  user_id: number;
}

export interface GetUserCollectionByUserIdResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  owned_shares: number;
}
[];
