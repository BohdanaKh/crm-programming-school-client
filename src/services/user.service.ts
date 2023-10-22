import {IRes} from '../types';
import {IUser} from '../interfaces';
import {axiosService} from './axios.service';
import {urls} from '../constants';

const userService = {
    getAll: (): IRes<IUser[]> => axiosService.get(urls.users.users),
    create: (user: IUser): IRes<IUser> => axiosService.post(urls.users.users, user),
    updateById: (id: number, user: IUser): IRes<IUser> => axiosService.put(urls.users.byId(id), user),
    deleteById: (id: number): IRes<void> => axiosService.delete(urls.users.byId(id))
}

export {
    userService
}