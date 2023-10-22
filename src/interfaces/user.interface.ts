export interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
    last_login: Date,
    is_active: boolean,
    created_at: Date
}