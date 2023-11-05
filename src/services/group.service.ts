import {IRes} from "../types";
import {IGroup, IPagination} from "../interfaces";
import {axiosService} from "./axios.service";
import {urls} from "../constants";

const groupService = {
    getAll: ():  IRes<IGroup[]> => axiosService.get(urls.groups.groups),
    create(group: IGroup): IRes<IGroup> {
        return axiosService.post(urls.groups.groups, group)
    }
}

export {
    groupService
}