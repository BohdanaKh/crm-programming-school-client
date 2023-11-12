import type { AxiosError } from "axios";
import axios from "axios";

import { baseURL, urls } from "../constants";
import { authService } from "./auth.service";

const axiosService = axios.create({ baseURL });
let isRefreshing = false;

axiosService.interceptors.request.use((config) => {
  const access = authService.getAccessToken();

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
});
axiosService.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await authService.refresh();
          isRefreshing = false;
          return await axiosService(originalRequest);
        } catch (e) {
          authService.deleteTokens();
          isRefreshing = false;
          throw error;
        }
      }

      if (originalRequest.url === urls.auth.refresh) {
        throw error;
      }
    }
    throw error;
  },
);

export { axiosService };
