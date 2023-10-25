import axios from "axios";

import {baseURL} from "../constants";
import {authService} from "./auth.service";

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use(config => {
    const access = authService.getAccessToken();

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }

    return config
})


export {
    axiosService
}