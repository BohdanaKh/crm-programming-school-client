import {IRes} from '../types';
import {IPagination, IUser} from '../interfaces';
import {axiosService} from './axios.service';
import {urls} from '../constants';

const userService = {
    getAll: ():  IRes<IPagination<IUser[]>> => axiosService.get(urls.users.users),
    create: (user: IUser): IRes<IUser> => axiosService.post(urls.users.users, user),
    updateById: (id: number, user: IUser): IRes<IUser> => axiosService.put(urls.users.byId(id), user),
    deleteById: (id: number): IRes<void> => axiosService.delete(urls.users.byId(id)),
    activateById: (id: number): IRes<void> => axiosService.post(urls.users.activate(id)),
    banById: (id: number): IRes<void> => axiosService.post(urls.users.ban(id)),
    unbanById: (id: number): IRes<void> => axiosService.post(urls.users.unban(id)),
}

export {
    userService
}