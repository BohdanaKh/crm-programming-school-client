export interface IError {
  detail?: string;
}
export interface IErrorAuth extends IError {
  email: string[];
}
