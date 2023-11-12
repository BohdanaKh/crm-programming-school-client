import type { AxiosResponse } from "axios";

import { urls } from "../constants";
import type { IGroup } from "../interfaces";
import { axiosService } from "./axios.service";

const groupService = {
  getAll: async (): Promise<AxiosResponse<IGroup[]>> =>
    await axiosService.get(urls.groups.groups),
  create: async (group: IGroup): Promise<AxiosResponse<IGroup>> =>
    await axiosService.post(urls.groups.groups, group),
};

export { groupService };
