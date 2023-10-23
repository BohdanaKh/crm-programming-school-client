import {IRes} from '../types';
import {IOrder, IPagination} from '../interfaces';
import {axiosService} from './axios.service';
import {urls} from '../constants';

const orderService = {
    getAll: ():  IRes<IPagination<IOrder[]>> => axiosService.get(urls.orders.orders),
    updateById: (id: number, order: IOrder): IRes<IOrder> => axiosService.put(urls.orders.byId(id), order),
    deleteById: (id: number): IRes<void> => axiosService.delete(urls.orders.byId(id))
}

export {
    orderService
}