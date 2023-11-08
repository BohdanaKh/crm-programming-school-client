import {IRes} from '../types';
import {IComment} from '../interfaces';
import {axiosService} from './axios.service';
import {urls} from '../constants';

const commentService = {
    create: (orderId: number, comment: IComment): IRes<IComment> => axiosService.post(urls.comments.create(orderId),  comment),
}

export {
    commentService
}