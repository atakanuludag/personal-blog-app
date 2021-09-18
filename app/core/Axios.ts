import axios from 'axios';
//import { VARIABLES } from '../core/Constants';
export type { AxiosError } from 'axios';

console.log("process.env.SERVICE_URL", process.env.SERVICE_URL);

const defaultOptions = {
    baseURL: process.env.SERVICE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
};

let instance = axios.create(defaultOptions);

export const AxiosSetTokenInterceptor = (token: string) => {
    instance.interceptors.request.use((config) => {
        config.headers["Authorization"] = token ? `Bearer ${token}` : '';
        return config;
    });
}

export const AxiosRemoveTokenInterceptor = () => {
    instance.interceptors.request.use((config) => {
        delete config.headers["Authorization"];
        return config;
    });
}

export default instance;