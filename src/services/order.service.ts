import {IRes} from '../types';
import {IOrder, IPagination} from '../interfaces';
import {axiosService} from './axios.service';
import {urls} from '../constants';
// const params = {
//     page: '1',
//     sort: '',
//     name: '',
//     surname: '',
//     email: '',
//     phone: '',
//     age: '',
//     course: '',
//     course_format: '',
//     course_type: '',
//     status: '',
//     group: '',
// }
const orderService = {
    getAll: ({page, ...params}:any):  IRes<IPagination<IOrder[]>> => axiosService.get(urls.orders.orders, {params:{page, ...params}}),
    updateById: (id: number, order: IOrder): IRes<IOrder> => axiosService.put(urls.orders.byId(id), order),
    deleteById: (id: number): IRes<void> => axiosService.delete(urls.orders.byId(id))
}

export {
    orderService
}