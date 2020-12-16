import axios, { AxiosResponse } from "axios";
import router from "@/router";
import TokenService from "@/services/token.service";
import { SERVER_URL } from "@/helpers/constants";
import $store from "@/store";

export function getAuthHeader() {
  return JSON.parse(localStorage.getItem("credentials") ?? '{}')
}

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthHeader();
    if (accessToken) {
      config.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => error
);

api.interceptors.response.use((response) => {
  if (response.data?.statusCode > 300) {
    return Promise.reject(response);
  } else {
    return response;
  }
});

// do not merge first successfull callback, otherwise catch block won't be executed in case of rejecting promise
api.interceptors.response.use(
  undefined,
  (error) => {
    const { statusCode, message } = error.data;
    // trying to refresh token transparently
    if (statusCode === 403) {
      if (message === "Token error") {
        return TokenService.refreshToken().then((response) => {
          if (!response.data.accessToken || !response.data.user) {
            throw new Error("Access token data malformed");
          }

          localStorage.setItem("credentials", JSON.stringify(response.data));
          $store.commit('authSuccess', response.data);

          //re-requst with refreshed credentials
          const originalRequest = error.config;
          originalRequest.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
          originalRequest.transformResponse.push((response: AxiosResponse) => response.data);
          return axios(originalRequest);
        });
      } else {
        router.push({ name: "login" });
        return Promise.reject(error);
      }
    }

    if (!error.response || error.message === "Network Error") {
      $store.commit("offline");
    }

    // in case of other errors just propogate to client's code
    return Promise.reject(error);
  }
);

// sending only 'data' field to client's code, omitting service info
api.interceptors.response.use((response) => {
  return response.data
});

export default api;
