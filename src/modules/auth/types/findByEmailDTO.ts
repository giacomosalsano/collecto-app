import { User } from "../../../shared/types/user";

export interface FindByEmailRequest {
  email: string;
}

export interface FindByEmailResponse extends User {}
