import axios, {AxiosError} from "axios";

import {baseURL, urls} from "../constants";
import {authService} from "./auth.service";

const axiosService = axios.create({baseURL});
let isRefreshing = false


axiosService.interceptors.request.use(config => {
    const access = authService.getAccessToken();

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }

    return config
})
axiosService.interceptors.response.use(
    res => {

        return res
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true
                try {
                    await authService.refresh()
                    isRefreshing = false
                    return axiosService(originalRequest)
                } catch (e) {
                    authService.deleteTokens()
                    isRefreshing = false
                    return Promise.reject(error)
                }
            }

            if (originalRequest.url === urls.auth.refresh) {
                return Promise.reject(error)
            }

        }
        return Promise.reject(error)
    }
)

export {
    axiosService,
}