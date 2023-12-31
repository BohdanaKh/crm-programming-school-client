import type { AxiosResponse } from "axios";

import { urls } from "../constants";
import type { IPagination, IPass, IUser } from "../interfaces";
import { axiosService } from "./axios.service";

const userService = {
  getAll: async (page: number): Promise<AxiosResponse<IPagination<IUser[]>>> =>
    await axiosService.get(urls.users.users, { params: { page } }),
  create: async (user: IUser): Promise<AxiosResponse<IUser>> =>
    await axiosService.post(urls.users.users, user),
  updateById: async (id: number, user: IUser): Promise<AxiosResponse<IUser>> =>
    await axiosService.put(urls.users.byId(id), user),
  deleteById: async (id: number): Promise<AxiosResponse<void>> =>
    await axiosService.delete(urls.users.byId(id)),
  activateById: async (id: number): Promise<AxiosResponse<string>> =>
    await axiosService.post(urls.users.activate(id)),
  recoverPassById: async (id: number): Promise<AxiosResponse<string>> =>
    await axiosService.post(urls.users.recoverPass(id)),
  banById: async (id: number): Promise<AxiosResponse<void>> =>
    await axiosService.post(urls.users.ban(id)),
  unbanById: async (id: number): Promise<AxiosResponse<void>> =>
    await axiosService.post(urls.users.unban(id)),
  activate: async (
    activationToken: string,
    data: IPass,
  ): Promise<AxiosResponse<void>> =>
    await axiosService.put(urls.users.activateAccount(activationToken), data),
  recoveryByUser: async (
    recoveryToken: string,
    data: IPass,
  ): Promise<AxiosResponse<void>> =>
    await axiosService.put(urls.users.recoveryPassByUser(recoveryToken), data),
};

export { userService };
