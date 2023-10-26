import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from "axios";
import { getApiBaseUrl } from "../config/config";

const headers: Partial<AxiosRequestHeaders> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": "true",
  "X-Requested-With": "XMLHttpRequest",
};

type ErrorData = {
  message: string;
  referenceCode: string;
};

export interface ApiError extends Error {
  message: string;
  status?: number;
  data?: ErrorData;
}
export class Http {
  private instance!: AxiosInstance;

  get client(): AxiosInstance {
    return this.instance || this.initHttp();
  }

  private static handleError(error: AxiosError): Promise<ApiError> {
    if (error.response?.data) {
      // Placeholder for actual observability tooling e.g. Sentry, or a dedicated server endpoint to capture data
      console.log(
        `We could send some information about the API error here instead of this console log. In this case the API has a status of ${
          error.response.status
        } and an error message of: ${JSON.stringify(error.response.data)}`
      );
      return Promise.reject({
        message: error.message,
        status: error.response.status,
        data: error.response.data,
      });
    }

    return Promise.reject({ message: error.message });
  }

  private initHttp() {
    const http = axios.create({
      baseURL: getApiBaseUrl(),
      headers,
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => Http.handleError(error)
    );

    this.instance = http;
    return http;
  }
}
export const http = new Http();
