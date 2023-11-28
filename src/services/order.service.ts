import type { AxiosResponse } from "axios";

import { urls } from "../constants";
import type { IOrder, IPagination } from "../interfaces";
import { axiosService } from "./axios.service";

const orderService = {
  // getAllNotPaginated: async ({
  //   ...params
  // }: any): Promise<AxiosResponse<IOrder[]>> =>
  //   await axiosService.get(urls.orders.orders, { params: { ...params } }),
  getAll: async ({
    ...params
  }: any): Promise<AxiosResponse<IPagination<IOrder[]>>> =>
    await axiosService.get(urls.orders.orders, { params: { ...params } }),
  updateById: async (
    id: number,
    order: IOrder,
  ): Promise<AxiosResponse<IOrder>> =>
    await axiosService.put(urls.orders.byId(id), order),
  deleteById: async (id: number): Promise<AxiosResponse<void>> =>
    await axiosService.delete(urls.orders.byId(id)),
};

export { orderService };
