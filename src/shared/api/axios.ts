import axios from 'axios'
import {API_URL} from "../consts.ts";
import i18next from "i18next";

export const apiInstance = axios.create({
    baseURL: API_URL,
});

apiInstance.interceptors.request.use(
    (config) => {
        config.headers['Accept-Language'] = i18next?.language ?? 'en';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);