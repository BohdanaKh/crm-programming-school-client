import {IRes} from '../types';
import {IComment} from '../interfaces';
import {axiosService} from './axios.service';
import {urls} from '../constants';

const commentService = {
    create: (comment: IComment): IRes<IComment> => axiosService.post(urls.comments.comments, comment),
}

export {
    commentService
}