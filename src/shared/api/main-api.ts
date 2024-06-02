import {apiInstance} from "./axios.ts";
import {IUserData} from "../model/user/store-types.ts";

export const MainApi = {
    async userPerHour(userId: string | number) {
        const response = await apiInstance.post<{ data: IUserData }>(`/user/${userId}/per/hour`);
        return response.data?.data;
    },
    async statistics(step: string | number, userId: string | number) {
        const response = await apiInstance.post<{ data: IUserData }>(`/statistics?step=${step}&user_id=${userId}`);
        return response.data?.data;
    },
    async getUser(userId: string | number) {
        const response = await apiInstance.get<{ data: IUserData }>(`/users/${userId}`);
        return response.data?.data;
    },
}