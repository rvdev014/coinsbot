import axios from 'axios'
import {API_URL} from "../consts.ts";
import {useUserStore} from "../model/user/store.ts";

export const apiInstance = axios.create({
    baseURL: API_URL,
});

apiInstance.interceptors.request.use(
    (config) => {
        config.headers['Accept-Language'] = useUserStore.getState().language_code ?? 'ru';
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