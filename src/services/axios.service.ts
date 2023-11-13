import type { AxiosError } from "axios";
import axios from "axios";

// import {createBrowserHistory} from 'history';
import { baseURL, urls } from "../constants";
import { authService } from "./auth.service";

const axiosService = axios.create({ baseURL });
let isRefreshing = false;
const waitList: IWaitList[] = [];
// const history = createBrowserHistory({window});

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
          afterRefresh();
          return axiosService(originalRequest);
        } catch (e) {
          authService.deleteTokens();
          isRefreshing = false;
          // history.replace('/login?expSession=true')
          return Promise.reject(error);
        }
      }

      if (originalRequest.url === urls.auth.refresh) {
        return Promise.reject(error);
      }

      return new Promise((resolve) => {
        subscribeToWaitList(() => {
          resolve(axiosService(originalRequest));
        });
        // const myFunc = ()=>{
        //     resolve(axiosService(originalRequest))
        // }
        // subscribeToWaitList(myFunc)
      });
    }
    return Promise.reject(error);
  },
);

type IWaitList = () => void;
const subscribeToWaitList = (cb: IWaitList): void => {
  waitList.push(cb);
};

const afterRefresh = () => {
  while (waitList.length) {
    const cb = waitList.pop();
    cb();
  }
};

export {
  axiosService,
  // history
};
