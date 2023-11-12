import type { ITokens } from "./token.interface";
import type { IUser } from "./user.interface";

export interface ILoginRes {
  token: ITokens;
  user: IUser;
}
