import { AxiosResponse } from "axios";

import { appConstants } from "../config/app-constants";
import InitApi from "./init";

class AuthApi {
    static _instance;

    static getInstance = () => {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new AuthApi();
        return this._instance;
    };

    _apiSvc;

    constructor() {
        this._apiSvc = InitApi.getInstance();
    }

    loginByPostVerificationToken = async (data) => {
        const response = await this._apiSvc.post(
            `${appConstants.apiUrl}/auth/login-by-token`,
            data
        );
        return response.data;
    };

    // used with or without token,
    // if deviToken is null then need to verify the user, otherwise
    // login-with-token will work without verification
    login = async (data) => {
        const response = await this._apiSvc.post(
            `${appConstants.apiUrl}/auth/login`,
            data
        );
        return response.data;
    };

    forgotPassword = async (data) => {
        return this._apiSvc.post(`${appConstants.apiUrl}/auth/send-otp`, data);
    };

    // register = async (data: IRegistrationForm): Promise<IRegisterResponse> => {
    // TODO: change it after descussion for payload
    register = async (data) => {
        const response = await this._apiSvc.post(
            `${appConstants.apiUrl}/auth/register`,
            data
        );
        return response.data;
    };

    resetPasswordByToken = async (data) => {
        return this._apiSvc.put(
            `${appConstants.apiUrl}/auth/reset-password-by-token`,
            data
        );
    };

    verifyEmail = async (data) => {
        const response = await this._apiSvc.post(
            `${appConstants.apiUrl}/auth/verify-email`,
            data
        );
        return response.data;
    };

    sendOTP = async (data) => {
        const response = await this._apiSvc.post(
            `${appConstants.apiUrl}/auth/send-otp`,
            data
        );
        return response.data;
    };

    // logout = async (): Promise<AxiosResponse> => {
    // 	return this._apiSvc.post(`${appConstants.apiUrl}/logout`, {});
    // };

    acceptTermsService = async () => {
        return this._apiSvc.put(`${appConstants.apiUrl}/terms-of-services/accept`);
    };

    getGlobalSettingByKey = async (key) => {
        return this._apiSvc.get(`${appConstants.apiUrl}/global-setting/key/${key}`);
    };

    getGlobalSettingPublicByKey = async (key) => {
        const response = await this._apiSvc.get(
            `${appConstants.apiUrl}/global-setting-public/key/${key}`
        );
        return response.data;
    };
}

export default AuthApi;
