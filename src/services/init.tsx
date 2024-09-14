import axios, { Axios } from "axios";

import StorageService from "../services/StorageService";
import { UtilService } from "../services";

class InitApi {
    static _instance;

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = axios.create();

        this._instance.interceptors.request.use(
            async (config) => {
                config.headers = {
                    Accept: "application/json",
                };
                try {
                    const token = await StorageService.getApiToken();

                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (e) { }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );
        this._instance.interceptors.response.use(
            async (response) => {
                return response;
            },
            async (error) => {
                if (error?.response?.status === 401) {
                    if (UtilService?.handleLogoutOnUnauthorized) {
                        UtilService?.handleLogoutOnUnauthorized();
                    }
                }
                return Promise.reject(error);
            }
        );

        return this._instance;
    }
}

export default InitApi;
