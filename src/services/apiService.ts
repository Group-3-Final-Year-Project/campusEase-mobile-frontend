import axios, { AxiosPromise, AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const apiPost = async (
  url: string,
  data?: any,
  returnDataExpected: boolean = false,
  throwOnError: boolean = false
) => {};

export const apiGet = () => {};
export const apiPut = () => {};
export const apiDelete = () => {};
