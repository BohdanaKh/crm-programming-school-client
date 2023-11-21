import type { AxiosResponse } from "axios";

import { urls } from "../constants";
import type { IAuth, ILoginRes, ITokens, IUser } from "../interfaces";
import { axiosService } from "./axios.service";

class AuthService {
  private readonly accessKey = "access";
  private readonly refreshKey = "refresh";
  private readonly me = "me";

  async login(user: IAuth): Promise<IUser> {
    const { data }: AxiosResponse<ILoginRes> = await axiosService.post(
      urls.auth.login,
      user,
    );
    this.setTokens({
      accessToken: data.token.accessToken,
      refreshToken: data.token.refreshToken,
    });
    localStorage.setItem(this.me, JSON.stringify(data.user));
    return data.user;
  }

  async logout(): Promise<void> {
    await axiosService.post(urls.auth.logout);
    this.deleteTokens();
  }

  async refresh(): Promise<IUser> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("Refresh token doesn't exist");
    }
    const { data }: AxiosResponse<ILoginRes> = await axiosService.post(
      urls.auth.refresh,
      { refreshToken },
    );
    this.setTokens({
      accessToken: data.token.accessToken,
      refreshToken: data.token.refreshToken,
    });
    return data.user;
  }

  private setTokens({ accessToken, refreshToken }: ITokens): void {
    localStorage.setItem(this.accessKey, accessToken);
    localStorage.setItem(this.refreshKey, refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem(this.accessKey);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshKey);
  }

  deleteTokens(): void {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.me);
  }
}

export const authService = new AuthService();
