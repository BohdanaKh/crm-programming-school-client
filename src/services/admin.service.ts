
import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {IOrderStats} from "../interfaces";
import {IRes} from "../types";

const adminService = {
    getAdminPanel: ():IRes<IOrderStats> => axiosService.get(urls.adminPanel.adminPanel),
}

export {
    adminService
}