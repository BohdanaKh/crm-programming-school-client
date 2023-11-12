export interface IStatusStats {
  status: string;
  _count: number;
}
export interface IOrderStats {
  totalOrdersCount: number;
  statusCounts: IStatusStats[];
}
