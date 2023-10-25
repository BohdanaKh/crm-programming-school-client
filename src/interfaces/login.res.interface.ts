import {ITokens} from "./token.interface";
import {IUser} from "./user.interface";

export interface ILoginRes {
    token: ITokens,
    user: IUser,
}