import type { AxiosResponse } from "axios";

import { urls } from "../constants";
import type { IComment } from "../interfaces";
import { axiosService } from "./axios.service";

const commentService = {
  create: async (
    orderId: number,
    comment: IComment,
  ): Promise<AxiosResponse<IComment>> =>
    await axiosService.post(urls.comments.create(orderId), comment),
};

export { commentService };
