import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpData } from "../../config/Config";

export interface MyHttpConfig extends AxiosRequestConfig {
  useToken?: boolean;
}

export default class NetworkController {
  private instance: AxiosInstance;

  constructor(private httpConfig: HttpData) {
    this.instance = axios.create({
      baseURL: this.httpConfig.baseUrl
    });
    this.instance.interceptors.request.use(
      (config) => this.configureRequest(config),
      (error) => Promise.reject(error)
    );
    this.instance.interceptors.response.use(
      (response) => response,
      (err) => this.handleResponse(err)
    );
  }

  private configureRequest(config: MyHttpConfig) {
    if (config.useToken === true)
      config.headers = { ...config.headers, daprsecret: `${localStorage.getItem("secret")}` };
    return config;
  }

  private async handleResponse(err: any) {
    if (err.response && err.response.status) {
      if (err.response.data.message && err.response.data.errorCode) {
        return Promise.reject({
          message: err.response.data.message,
          errorCode: err.response.data.errorCode
        });
      }
    }
    return Promise.reject(err);
  }

  public request<T>(config: MyHttpConfig): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(config);
  }
}
