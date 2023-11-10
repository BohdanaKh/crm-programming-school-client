import {AxiosResponse} from 'axios';

import {IAuth, ILoginRes, ITokens, IUser} from '../interfaces';
import {axiosService} from './axios.service';
import {urls} from '../constants';

class AuthService {
    private readonly accessKey = 'access'
    private readonly refreshKey = 'refresh'

    async login(user: IAuth): Promise<IUser> {
        const {data}: AxiosResponse<ILoginRes> = await axiosService.post(urls.auth.login, user);
        this.setTokens({accessToken: data.token.accessToken, refreshToken:data.token.refreshToken})
        return data.user
    }

    async logout(): Promise<void> {
       await axiosService.post(urls.auth.logout);
        this.deleteTokens();
    }

    async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error("Refresh token doesn't exist")
        }
        const {data}: AxiosResponse<ITokens> = await axiosService.post(urls.auth.refresh, {refreshToken});
        this.setTokens({accessToken: data.accessToken, refreshToken:data.refreshToken})
    }

    // me(): IRes<IUser> {
    //     return axiosService.get(urls.auth.me)
    // }

    private setTokens({accessToken, refreshToken}: ITokens): void {
        localStorage.setItem(this.accessKey, accessToken)
        localStorage.setItem(this.refreshKey, refreshToken)
    }

    getAccessToken() {
        return localStorage.getItem(this.accessKey)
    }

    private getRefreshToken(){
        return localStorage.getItem(this.refreshKey)
    }

    deleteTokens(): void {
        localStorage.removeItem(this.accessKey)
        localStorage.removeItem(this.refreshKey)
    }
}

export const authService = new AuthService()