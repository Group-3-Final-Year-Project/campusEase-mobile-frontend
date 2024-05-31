import axios, { AxiosPromise, AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const apiPost = async (
  url: string,
  data?: any,
  returnDataExpected: boolean = true,
  throwOnError: boolean = false
) => {
  try {
    const response = await axiosInstance.post(url, data);
    if (returnDataExpected) {
      console.log("From server: ", response);
      return {
        data: response.data.data,
        metadata: response.data.metadata || {},
        headers: response.headers || {},
      };
    }
    return { success: true };
  } catch (error) {
    if (throwOnError) throw error;
    return error;
    // will do a processError function to properly display error
    // return processErrorResponse(error)
  }
};

export const apiGet = () => {};
export const apiPut = () => {};
export const apiDelete = () => {};
