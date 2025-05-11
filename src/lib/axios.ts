import { ApiResponseInterface } from "@/interface";
import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 30000,
  timeoutErrorMessage: "Time out!",
});

async function post(route: string, body = {}, header = {}) {
  try {
    return await instance.post(`${route}`, body, header).then((response) => {
      return response.data as ApiResponseInterface;
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("An unknown error occurred");
  }
}

async function get(route: string, header = {}) {
  try {
    return await instance.get(`${route}`, header).then((response) => {
      return response.data as ApiResponseInterface;
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("An unknown error occurred");
  }
}

async function put(route: string, body = {}, header = {}) {
  try {
    return await instance.put(`${route}`, body, header).then((response) => {
      return response.data as ApiResponseInterface;
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("An unknown error occurred");
  }
}

async function del(route: string, header = {}) {
  try {
    return await instance.delete(`${route}`, header).then((response) => {
      return response.data as ApiResponseInterface;
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("An unknown error occurred");
  }
}

export { get, post, put, del };
