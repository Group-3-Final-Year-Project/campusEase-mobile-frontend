import { ApiRequestResult } from "~src/@types/types";
import { getSecureAxiosInstance } from "./authService";
import { processErrorResponse } from "./errorService";

export const apiPost = async <T, S>(
  url: string,
  data?: any,
  action?: string,
  returnDataExpected: boolean = true,
  throwOnError: boolean = false
): Promise<ApiRequestResult<T, S>> => {
  try {
    const axiosSecureInstance = getSecureAxiosInstance();
    const response = await axiosSecureInstance.post(url, data);
    if (returnDataExpected) {
      return {
        data: response.data.data,
        metadata: (response.data.metadata || {}) as S,
        headers: response.headers || {},
      };
    }
    return { success: true };
  } catch (error: any) {
    if (throwOnError) throw error;
    return processErrorResponse(error, action);
  }
};

export const apiGet = () => {};
export const apiPut = () => {};
export const apiDelete = () => {};
