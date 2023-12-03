import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosInstance } from 'axios';

export const useHttpClient = (baseURL: string): AxiosInstance => {
    const { getAccessTokenSilently } = useAuth0();

    const axiosInstance = axios.create({ baseURL });

    axiosInstance.interceptors.request.use(async config => {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return axiosInstance;
};