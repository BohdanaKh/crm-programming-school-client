import type { AxiosResponse } from "axios";

import { urls } from "../constants";
import type { IOrderStats } from "../interfaces";
import { axiosService } from "./axios.service";

const adminService = {
  getAdminPanel: async (): Promise<AxiosResponse<IOrderStats>> =>
    await axiosService.get(urls.adminPanel.adminPanel),
};

export { adminService };
