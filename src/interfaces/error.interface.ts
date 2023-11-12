export interface IError {
  message?: string;
}
export interface IErrorAuth extends IError {
  email: string[];
}
